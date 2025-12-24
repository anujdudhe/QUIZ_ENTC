import { useState, useEffect } from 'react';
import { Question, UserAnswer, AppState, ExamResults, QuestionState, Chapter } from './types';
import { allQuestions } from './data';
import { ChapterSelector } from './components/ChapterSelector';
import { QuestionCard } from './components/QuestionCard';
import { ProgressBar } from './components/ProgressBar';
import { Result } from './components/Result';
import { ConfirmQuit } from './components/ConfirmQuit';
import { QuestionStatusGrid } from './components/QuestionStatusGrid';
import { WelcomeModal } from './components/WelcomeModal';

/**
 * Main App Component
 * Manages the entire exam flow and state
 */
function App() {
  const [appState, setAppState] = useState<AppState>({ stage: 'chapterSelect' });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  // Load questions from data files
  useEffect(() => {
    try {
      // Import questions from our data files
      const data = allQuestions;
      
      // Validate questions
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No questions found');
      }
      
      setQuestions(data);
      
      // Extract unique chapters and count questions
      const chapterMap = new Map<string, number>();
      data.forEach(q => {
        chapterMap.set(q.chapter, (chapterMap.get(q.chapter) || 0) + 1);
      });
      
      const extractedChapters: Chapter[] = Array.from(chapterMap.entries()).map(([name]) => ({
        id: name,
        name,
        description: `${chapterMap.get(name)} questions`,
      }));
      
      setChapters(extractedChapters);
      
      // Initialize question states
      const initialStates: QuestionState[] = data.map(q => ({
        questionId: q.id,
        status: 'unanswered' as const,
      }));
      
      setQuestionStates(initialStates);
      console.log('Loaded chapters:', extractedChapters);
      console.log('Loaded questions:', data);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
      setIsLoading(false);
    }
  }, []);

  const handleSelectChapter = (chapterId: string) => {
    console.log('Selected chapter:', chapterId);
    
    // Filter questions for the selected chapter
    const chapterQuestions = questions.filter(q => q.chapter === chapterId);
    
    if (chapterQuestions.length === 0) {
      // If no questions found for the chapter, show an alert
      alert(`No questions found for ${chapterId}. Please try another chapter.`);
      return;
    }
    
    // Reset user answers and question states for the new quiz
    setUserAnswers([]);
    
    // Initialize question states for the selected chapter
    const initialQuestionStates = questions.map(q => ({
      questionId: q.id,
      status: q.chapter === chapterId ? 'unanswered' as const : 'unanswered' as const
    }));
    
    setQuestionStates(initialQuestionStates);
    
    // If questions exist, proceed to the exam
    console.log(`Found ${chapterQuestions.length} questions for ${chapterId}`);
    setAppState({ 
      stage: 'exam', 
      chapter: chapterId, 
      currentQuestionIndex: 0 
    });
  };

  const handleSubmitAnswer = (selectedIndex: number, isCorrect: boolean) => {
    if (appState.stage !== 'exam') return;

    const filteredQuestions = questions.filter(q => q.chapter === appState.chapter);
    const currentQuestion = filteredQuestions[appState.currentQuestionIndex];
    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedIndex,
      isCorrect,
      correctIndex: currentQuestion.answerIndex,
    };

    // Update answers and question state
    setUserAnswers(prev => [...prev, answer]);
    
    setQuestionStates(prev => {
      const updated = [...prev];
      const questionIndex = questions.findIndex(q => q.id === currentQuestion.id);
      if (questionIndex !== -1) {
        updated[questionIndex] = {
          questionId: currentQuestion.id,
          status: 'answered',
        };
      }
      return updated;
    });

    // Only move to results if it's the last question and user clicks next
    const isLastQuestion = appState.currentQuestionIndex === filteredQuestions.length - 1;
    if (isLastQuestion) {
      const correctAnswers = [...userAnswers, answer].filter(a => a.isCorrect).length;
      const totalQuestions = filteredQuestions.length;
      const results: ExamResults = {
        totalQuestions,
        correctAnswers,
        wrongAnswers: totalQuestions - correctAnswers,
        score: Math.round((correctAnswers / totalQuestions) * 100),
        chapter: appState.chapter,
        percentage: Math.round((correctAnswers / totalQuestions) * 100),
        completedAt: Date.now()
      };
      setAppState({ stage: 'result', results });
      // Don't automatically show results, wait for next click
    }
  };

  const handleSkip = () => {
    if (appState.stage !== 'exam') return;

    const filteredQuestions = questions.filter(q => q.chapter === appState.chapter);
    const currentQuestion = filteredQuestions[appState.currentQuestionIndex];
    const isLastQuestion = appState.currentQuestionIndex === filteredQuestions.length - 1;

    // Update question state to mark as skipped
    setQuestionStates(prev => {
      const updated = [...prev];
      const questionIndex = questions.findIndex(q => q.id === currentQuestion.id);
      if (questionIndex !== -1) {
        updated[questionIndex] = {
          questionId: currentQuestion.id,
          status: 'skipped',
          isMarked: updated[questionIndex]?.isMarked || false,
        };
      }
      return updated;
    });

    // Move to next question or show results if it's the last question
    if (isLastQuestion) {
      const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
      const totalQuestions = filteredQuestions.length;
      const results: ExamResults = {
        totalQuestions,
        correctAnswers,
        wrongAnswers: totalQuestions - correctAnswers,
        score: Math.round((correctAnswers / totalQuestions) * 100),
        chapter: appState.chapter,
        percentage: Math.round((correctAnswers / totalQuestions) * 100),
        completedAt: Date.now()
      };
      setAppState({ 
        stage: 'result', 
        results 
      });
    } else {
      // Move to next question
      setAppState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const handlePrevious = () => {
    if (appState.stage !== 'exam' || appState.currentQuestionIndex <= 0) return;
    setAppState({
      ...appState,
      currentQuestionIndex: appState.currentQuestionIndex - 1
    });
  };

  const handleNext = () => {
    if (appState.stage !== 'exam') return;
    
    const filteredQuestions = questions.filter(q => q.chapter === appState.chapter);
    const nextIndex = appState.currentQuestionIndex + 1;
    
    if (nextIndex < filteredQuestions.length) {
      setAppState({
        ...appState,
        currentQuestionIndex: nextIndex
      });
    }
  };

  const handleQuit = () => {
    setShowQuitModal(true);
  };

  const confirmQuit = () => {
    setShowQuitModal(false);
    if (appState.stage === 'exam') {
      const examState = appState;
      const filteredQuestions = questions.filter(q => q.chapter === examState.chapter);
      const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
      const totalQuestions = filteredQuestions.length;
      const results: ExamResults = {
        totalQuestions,
        correctAnswers,
        wrongAnswers: totalQuestions - correctAnswers,
        score: Math.round((correctAnswers / totalQuestions) * 100),
        chapter: examState.chapter,
        percentage: Math.round((correctAnswers / totalQuestions) * 100),
        completedAt: Date.now()
      };
      setAppState({ stage: 'result', results });
    }
  };

  const cancelQuit = () => {
    setShowQuitModal(false);
  };

  const handleRestart = () => {
    setUserAnswers([]);
    setQuestionStates(questions.map(q => ({
      questionId: q.id,
      status: 'unanswered' as const,
    })));
    setAppState({ stage: 'chapterSelect' });
  };

  const getFilteredQuestions = (): Question[] => {
    if (appState.stage === 'chapterSelect') return [];
    if (appState.stage !== 'exam' && appState.stage !== 'result') return [];
    const chapter = (appState as any).chapter;
    const filtered = questions.filter(q => q.chapter === chapter);
    console.log('Chapter:', chapter);
    console.log('Total questions:', questions.length);
    console.log('Filtered questions:', filtered.length);
    return filtered;
  };

  const getResults = (): ExamResults => {
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const totalQuestions = userAnswers.length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    return {
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      score: percentage,
      chapter: appState.stage === 'exam' ? (appState as any).chapter : '',
      percentage,
      completedAt: Date.now()
    };
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-red-600 text-5xl mb-4 text-center">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Error Loading Exam</h2>
          <p className="text-gray-600 mb-6 text-center">{error}</p>
          <p className="text-sm text-gray-500 text-center">
            Please ensure <code className="bg-gray-100 px-2 py-1 rounded">questions.json</code> exists in the public folder.
          </p>
        </div>
      </div>
    );
  }

  const correctCount = userAnswers.filter(a => a.isCorrect).length;
  const wrongCount = userAnswers.filter(a => !a.isCorrect).length;
  const filteredQuestions = getFilteredQuestions();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {showWelcome && <WelcomeModal onStart={() => setShowWelcome(false)} />}

      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {appState.stage === 'chapterSelect' && (
        <ChapterSelector chapters={chapters} onSelectChapter={handleSelectChapter} />
      )}

      {appState.stage === 'exam' && (
        <div className="min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-3xl mx-auto mb-4 flex justify-between items-center">
            <button
              onClick={() => setAppState({ stage: 'chapterSelect' })}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              aria-label="Back to chapters"
            >
              ← Back
            </button>
            <h2 className="text-xl font-bold text-gray-800">{(appState as any).chapter}</h2>
            <button
              onClick={handleQuit}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Quit exam"
            >
              Quit Exam
            </button>
          </div>

          <main id="main-content" className="flex-1 flex flex-col items-center">
            <div className="w-full max-w-3xl">
              {filteredQuestions.length > 0 ? (
                <>
                  <ProgressBar
                    current={appState.currentQuestionIndex + 1}
                    total={filteredQuestions.length}
                    correct={correctCount}
                    wrong={wrongCount}
                  />

                  <QuestionStatusGrid
                    questionStates={questionStates.filter((_, index) => {
                      const question = questions[index];
                      return question.chapter === appState.chapter;
                    })}
                    currentQuestionIndex={appState.currentQuestionIndex}
                    onNavigateToQuestion={(index) => {
                      // Update the current question index directly
                      setAppState(prev => ({
                        ...prev,
                        currentQuestionIndex: index
                      }));
                    }}
                    userAnswers={userAnswers.filter(answer => {
                      const question = questions.find(q => q.id === answer.questionId);
                      return question?.chapter === appState.chapter;
                    })}
                  />

                  <QuestionCard
                    question={filteredQuestions[appState.currentQuestionIndex]}
                    questionNumber={appState.currentQuestionIndex + 1}
                    totalQuestions={filteredQuestions.length}
                    onSubmitAnswer={handleSubmitAnswer}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onSkip={handleSkip}
                    isAnswered={questionStates[appState.currentQuestionIndex]?.status === 'answered'}
                  />
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-2xl font-bold text-gray-800 mb-4">No questions available</p>
                  <p className="text-gray-600 mb-6">No questions found for {(appState as any).chapter}</p>
                  <button
                    onClick={() => setAppState({ stage: 'chapterSelect' })}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Return to Chapters
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      {appState.stage === 'result' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <main id="main-content">
            <Result results={getResults()} onRestart={handleRestart} />
          </main>
        </div>
      )}

      {showQuitModal && (
        <ConfirmQuit onConfirm={confirmQuit} onCancel={cancelQuit} />
      )}
    </div>
  );
}

export default App;
