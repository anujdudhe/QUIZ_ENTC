import { useState, useEffect } from "react";
import {
  Question,
  UserAnswer,
  AppState,
  ExamResults,
  QuestionState,
  Chapter,
} from "./types";
import { allQuestions } from "./data";
import { ChapterSelector } from "./components/ChapterSelector";
import { QuestionCard } from "./components/QuestionCard";
import { ProgressBar } from "./components/ProgressBar";
import { Result } from "./components/Result";
import { ConfirmQuit } from "./components/ConfirmQuit";
import { QuestionStatusGrid } from "./components/QuestionStatusGrid";
import { WelcomeModal } from "./components/WelcomeModal";
import { AdminDashboard } from "./components/AdminDashboard";
import {
  initializeAnalytics,
  trackQuizStart,
  trackQuizCompletion,
} from "./services/analytics";
import QuestionAnalysis from "./components/QuestionAnalysis";

/**
 * Main App Component
 * Manages the entire exam flow and state
 */
function App() {
  const [appState, setAppState] = useState<AppState>({
    stage: "chapterSelect",
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  // Load questions from data files
  useEffect(() => {
    try {
      // Import questions from our data files
      const data = allQuestions;

      // Validate questions
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No questions found");
      }

      setQuestions(data);

      // Extract unique chapters and count questions
      const chapterMap = new Map<string, number>();
      data.forEach((q) => {
        chapterMap.set(q.chapter, (chapterMap.get(q.chapter) || 0) + 1);
      });

      const extractedChapters: Chapter[] = Array.from(chapterMap.entries()).map(
        ([name]) => ({
          id: name,
          name,
          description: `${chapterMap.get(name)} questions`,
        })
      );

      setChapters(extractedChapters);

      // Initialize question states
      const initialStates: QuestionState[] = data.map((q) => ({
        questionId: q.id,
        status: "unanswered" as const,
      }));

      setQuestionStates(initialStates);
      console.log("Loaded chapters:", extractedChapters);
      console.log("Loaded questions:", data);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load questions");
      setIsLoading(false);
    }
  }, []);

  // Initialize analytics on app load
  useEffect(() => {
    initializeAnalytics().catch(console.error);
  }, []);

  // Keyboard shortcut for admin dashboard (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        setShowAdmin((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleSelectChapter = (chapterId: string) => {
    console.log("Selected chapter:", chapterId);

    // Filter questions for the selected chapter
    const chapterQuestions = questions.filter((q) => q.chapter === chapterId);

    if (chapterQuestions.length === 0) {
      // If no questions found for the chapter, show an alert
      alert(`No questions found for ${chapterId}. Please try another chapter.`);
      return;
    }

    // Reset user answers and question states for the new quiz
    setUserAnswers([]);

    // Initialize question states for the selected chapter
    const initialQuestionStates = questions.map((q) => ({
      questionId: q.id,
      status:
        q.chapter === chapterId
          ? ("unanswered" as const)
          : ("unanswered" as const),
    }));

    setQuestionStates(initialQuestionStates);

    // If questions exist, proceed to the exam
    console.log(`Found ${chapterQuestions.length} questions for ${chapterId}`);

    // Track quiz start
    trackQuizStart(chapterId).catch(console.error);

    setAppState({
      stage: "exam",
      chapter: chapterId,
      currentQuestionIndex: 0,
    });
  };

  const handleSubmitAnswer = (selectedIndex: number, isCorrect: boolean) => {
    if (appState.stage !== "exam") return;

    const filteredQuestions = questions.filter(
      (q) => q.chapter === appState.chapter
    );
    const currentQuestion = filteredQuestions[appState.currentQuestionIndex];
    const answer = {
      questionId: currentQuestion.id,
      selectedIndex,
      isCorrect,
      correctIndex: currentQuestion.answerIndex,
      chapter: currentQuestion.chapter, // store chapter to avoid ambiguity for duplicate ids
    } as UserAnswer;

    // Update answers and question states
    const newUserAnswers = [...userAnswers, answer];
    setUserAnswers(newUserAnswers);

    // Update question state to mark as answered
    setQuestionStates((prev) => {
      const updated = [...prev];
      // Match by both id and chapter to avoid collisions across different banks/units
      const questionIndex = questions.findIndex(
        (q) =>
          q.id === currentQuestion.id && q.chapter === currentQuestion.chapter
      );
      if (questionIndex !== -1) {
        updated[questionIndex] = {
          ...updated[questionIndex],
          status: "answered" as const,
        };
      }
      return updated;
    });

    // Only move to results if it's the last question and user clicks next
    const isLastQuestion =
      appState.currentQuestionIndex === filteredQuestions.length - 1;
    if (isLastQuestion) {
      const correctAnswers = newUserAnswers.filter(
        (a) => a.isCorrect && (a as any).chapter === appState.chapter
      ).length;
      const totalQuestions = filteredQuestions.length;
      const answersForChapter = newUserAnswers.filter(
        (a) => (a as any).chapter === appState.chapter
      );
      const results: ExamResults = {
        totalQuestions,
        correctAnswers,
        wrongAnswers: totalQuestions - correctAnswers,
        score: Math.round((correctAnswers / totalQuestions) * 100),
        chapter: appState.chapter,
        percentage: Math.round((correctAnswers / totalQuestions) * 100),
        completedAt: Date.now(),
        answers: answersForChapter,
      };

      // Track quiz completion
      trackQuizCompletion(
        appState.chapter,
        totalQuestions,
        correctAnswers,
        Math.round((correctAnswers / totalQuestions) * 100)
      ).catch(console.error);

      setAppState({ stage: "result", results });
      // Don't automatically show results, wait for next click
    }
  };

  const handleSkip = () => {
    if (appState.stage !== "exam") return;

    const filteredQuestions = questions.filter(
      (q) => q.chapter === appState.chapter
    );
    const currentQuestion = filteredQuestions[appState.currentQuestionIndex];

    // Mark the current question as skipped
    setQuestionStates((prev) => {
      const updated = [...prev];
      // Match by both id and chapter to avoid collisions across different banks/units
      const questionIndex = questions.findIndex(
        (q) =>
          q.id === currentQuestion.id && q.chapter === currentQuestion.chapter
      );
      if (questionIndex !== -1) {
        updated[questionIndex] = {
          ...updated[questionIndex],
          status: "skipped" as const,
        };
      }
      return updated;
    });

    const nextIndex = appState.currentQuestionIndex + 1;

    if (nextIndex < filteredQuestions.length) {
      // Move to next question
      setAppState({
        ...appState,
        currentQuestionIndex: nextIndex,
      });
    }
  };

  const handlePrevious = () => {
    if (appState.stage !== "exam" || appState.currentQuestionIndex <= 0) return;
    setAppState({
      ...appState,
      currentQuestionIndex: appState.currentQuestionIndex - 1,
    });
  };
  const handleNext = () => {
    if (appState.stage !== "exam") return;

    const filteredQuestions = questions.filter(
      (q) => q.chapter === appState.chapter
    );
    const nextIndex = appState.currentQuestionIndex + 1;

    if (nextIndex < filteredQuestions.length) {
      setAppState({
        ...appState,
        currentQuestionIndex: nextIndex,
      });
    }
  };

  const handleQuit = () => {
    setShowQuitModal(true);
  };

  const confirmQuit = () => {
    setShowQuitModal(false);
    if (appState.stage === "exam") {
      const examState = appState;
      const filteredQuestions = questions.filter(
        (q) => q.chapter === examState.chapter
      );
      const filteredAnswers = userAnswers.filter(
        (a) => a.chapter === examState.chapter
      );
      const correctAnswers = filteredAnswers.filter((a) => a.isCorrect).length;
      const totalQuestions = filteredQuestions.length;
      const results: ExamResults = {
        totalQuestions,
        correctAnswers,
        wrongAnswers: totalQuestions - correctAnswers,
        score: Math.round((correctAnswers / totalQuestions) * 100),
        chapter: examState.chapter,
        percentage: Math.round((correctAnswers / totalQuestions) * 100),
        completedAt: Date.now(),
        answers: filteredAnswers,
      };

      // Track quiz completion
      trackQuizCompletion(
        examState.chapter,
        totalQuestions,
        correctAnswers,
        Math.round((correctAnswers / totalQuestions) * 100)
      ).catch(console.error);

      setAppState({ stage: "result", results });
    }
  };

  const cancelQuit = () => {
    setShowQuitModal(false);
  };

  const handleRestart = () => {
    setUserAnswers([]);
    setQuestionStates(
      questions.map((q) => ({
        questionId: q.id,
        status: "unanswered" as const,
      }))
    );
    setAppState({ stage: "chapterSelect" });
  };

  const getFilteredQuestions = (): Question[] => {
    if (appState.stage === "chapterSelect") return [];
    if (appState.stage !== "exam" && appState.stage !== "result") return [];
    const chapter = (appState as any).chapter;
    const filtered = questions.filter((q) => q.chapter === chapter);
    console.log("Chapter:", chapter);
    console.log("Total questions:", questions.length);
    console.log("Filtered questions:", filtered.length);
    return filtered;
  };

  const getResults = (): ExamResults => {
    const chapter =
      appState.stage === "exam" || appState.stage === "result"
        ? (appState as any).chapter
        : "";
    const filteredAnswers = chapter
      ? userAnswers.filter((a) => (a as any).chapter === chapter)
      : userAnswers;

    const correctAnswers = filteredAnswers.filter((a) => a.isCorrect).length;
    const totalQuestions = chapter
      ? questions.filter((q) => q.chapter === chapter).length
      : filteredAnswers.length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;

    const answers = filteredAnswers;
    return {
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      score: percentage,
      chapter: chapter || "",
      percentage,
      completedAt: Date.now(),
      answers,
    };
  };

  const computeResultsForChapter = (chapter: string): ExamResults => {
    const filteredAnswers = userAnswers.filter(
      (a) => (a as any).chapter === chapter
    );
    const correctAnswers = filteredAnswers.filter((a) => a.isCorrect).length;
    const totalQuestions = questions.filter(
      (q) => q.chapter === chapter
    ).length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;
    return {
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      score: percentage,
      chapter,
      percentage,
      completedAt: Date.now(),
      answers: filteredAnswers,
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Error Loading Exam
          </h2>
          <p className="text-gray-600 mb-6 text-center">{error}</p>
          <p className="text-sm text-gray-500 text-center">
            Please ensure{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              questions.json
            </code>{" "}
            exists in the public folder.
          </p>
        </div>
      </div>
    );
  }

  const correctCount = userAnswers.filter(
    (a) => a.isCorrect && (a as any).chapter === (appState as any).chapter
  ).length;
  const wrongCount = userAnswers.filter(
    (a) => !a.isCorrect && (a as any).chapter === (appState as any).chapter
  ).length;
  const filteredQuestions = getFilteredQuestions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {showWelcome && <WelcomeModal onStart={() => setShowWelcome(false)} />}

      {showAdmin ? (
        <AdminDashboard />
      ) : (
        <>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 text-white px-4 py-2 rounded-lg z-50"
          >
            Skip to main content
          </a>

          {appState.stage === "chapterSelect" && (
            <ChapterSelector
              chapters={chapters}
              onSelectChapter={handleSelectChapter}
            />
          )}

          {appState.stage === "exam" && (
            <div className="min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
              <div className="w-full max-w-3xl mx-auto mb-4 flex justify-between items-center">
                <button
                  onClick={() => setAppState({ stage: "chapterSelect" })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  aria-label="Back to chapters"
                >
                  ← Back
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                  {(appState as any).chapter}
                </h2>
                <button
                  onClick={handleQuit}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label="Quit exam"
                >
                  Quit Exam
                </button>
              </div>

              <main
                id="main-content"
                className="flex-1 flex flex-col items-center"
              >
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
                          setAppState((prev) => ({
                            ...prev,
                            currentQuestionIndex: index,
                          }));
                        }}
                        userAnswers={userAnswers.filter(
                          (answer) =>
                            (answer as any).chapter === appState.chapter
                        )}
                      />

                      {(() => {
                        const currentQuestion =
                          filteredQuestions[appState.currentQuestionIndex];
                        const foundAnswer = userAnswers.find(
                          (a) =>
                            a.questionId === currentQuestion?.id &&
                            (a as any).chapter === currentQuestion?.chapter
                        );
                        const previousAnswer =
                          foundAnswer?.selectedIndex ?? null;
                        const previousCorrect = foundAnswer?.isCorrect ?? null;
                        const isAnswered = userAnswers.some(
                          (a) =>
                            a.questionId === currentQuestion?.id &&
                            (a as any).chapter === currentQuestion?.chapter
                        );

                        console.log("App.tsx QuestionCard props:", {
                          questionId: currentQuestion?.id,
                          isAnswered,
                          previousAnswer,
                          previousCorrect,
                          foundAnswer,
                          userAnswers: userAnswers.length,
                          allUserAnswers: userAnswers.map((a) => ({
                            questionId: a.questionId,
                            selectedIndex: a.selectedIndex,
                          })),
                        });

                        return (
                          <QuestionCard
                            question={currentQuestion}
                            questionNumber={appState.currentQuestionIndex + 1}
                            totalQuestions={filteredQuestions.length}
                            onSubmitAnswer={handleSubmitAnswer}
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                            onSkip={handleSkip}
                            isAnswered={isAnswered}
                            previousAnswer={previousAnswer}
                            previousCorrect={previousCorrect}
                          />
                        );
                      })()}
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-2xl font-bold text-gray-800 mb-4">
                        No questions available
                      </p>
                      <p className="text-gray-600 mb-6">
                        No questions found for {(appState as any).chapter}
                      </p>
                      <button
                        onClick={() => setAppState({ stage: "chapterSelect" })}
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

          {appState.stage === "result" && (
            <div className="min-h-screen flex items-center justify-center p-4">
              <main id="main-content">
                {(() => {
                  const resultsObj = (appState as any).results || getResults();
                  const chapter = (resultsObj as any).chapter || "";
                  return (
                    <Result
                      results={resultsObj}
                      onRestart={handleRestart}
                      onShowAnalysis={() =>
                        setAppState({ stage: "analysis", chapter })
                      }
                    />
                  );
                })()}
              </main>
            </div>
          )}

          {appState.stage === "analysis" && (
            <div className="min-h-screen">
              {(() => {
                const chapter = (appState as any).chapter || "";
                const resultsObj =
                  (appState as any).results ||
                  computeResultsForChapter(chapter);
                const answersForChapter =
                  (resultsObj as any).answers ||
                  userAnswers.filter((a) => (a as any).chapter === chapter);
                const questionsForChapter = questions.filter(
                  (q) => q.chapter === chapter
                );
                return (
                  <QuestionAnalysis
                    questions={questionsForChapter}
                    answers={answersForChapter}
                    onBack={() =>
                      setAppState({
                        stage: "result",
                        results: computeResultsForChapter(chapter),
                      })
                    }
                  />
                );
              })()}
            </div>
          )}

          {showQuitModal && (
            <ConfirmQuit onConfirm={confirmQuit} onCancel={cancelQuit} />
          )}
        </>
      )}

      {/* Floating Admin Button - Only visible on chapter selector */}
      {!showAdmin && appState.stage === "chapterSelect" && (
        <button
          onClick={() => setShowAdmin(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-50"
          title="Admin Dashboard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
