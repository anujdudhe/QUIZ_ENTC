import { useState, useEffect } from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onSubmitAnswer: (selectedIndex: number, isCorrect: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  isAnswered: boolean;
  previousAnswer?: number | null;
  previousCorrect?: boolean | null;
}

/**
 * Card component displaying a single question with options
 * Handles answer selection, submission, and feedback display
 */
export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  onSubmitAnswer,
  onNext,
  onPrevious,
  onSkip,
  isAnswered,
  previousAnswer,
  previousCorrect,
}: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(previousAnswer || null);
  const [isSubmitted, setIsSubmitted] = useState(isAnswered);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(previousCorrect || null);

  // Reset state when question changes
  useEffect(() => {
    console.log('QuestionCard useEffect:', { questionId: question.id, isAnswered, previousAnswer, previousCorrect });
    
    if (isAnswered) {
      setIsSubmitted(true);
      setSelectedOption(previousAnswer || null);
      setIsCorrect(previousCorrect || null);
    } else {
      setSelectedOption(previousAnswer || null);
      setIsSubmitted(false);
      setIsCorrect(null);
    }
  }, [question.id, isAnswered, previousAnswer, previousCorrect]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitted) {
        if (e.key === 'Enter') {
          onNext();
        }
        return;
      }

      // Number keys 1-4 for option selection
      if (['1', '2', '3', '4'].includes(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        if (index < question.options.length) {
          setSelectedOption(index);
        }
      }

      // Arrow keys for navigation
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedOption(prev => {
          if (prev === null) return 0;
          if (e.key === 'ArrowDown') {
            return Math.min(prev + 1, question.options.length - 1);
          } else {
            return Math.max(prev - 1, 0);
          }
        });
      }

      // Enter to submit if an option is selected
      if (e.key === 'Enter' && selectedOption !== null) {
        handleSubmit();
      }

      // 's' key to skip the question
      if (e.key === 's' || e.key === 'S') {
        onSkip();
      }

      // Left/Right arrows for navigation between questions (optional)
      if (e.key === 'ArrowLeft') {
        // go to previous question
        onPrevious();
      }
      if (e.key === 'ArrowRight') {
        // go to next question only if submitted
        if (isSubmitted) onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption, isSubmitted, question.options.length, onNext, onPrevious, onSkip]);

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;

    const correct = selectedOption === question.answerIndex;
    setIsCorrect(correct);
    setIsSubmitted(true);
    onSubmitAnswer(selectedOption, correct);
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md overflow-hidden relative flex flex-col min-h-[calc(100vh-200px)] sm:min-h-0">
      {!question ? (
        <div className="text-center py-20">
          <p className="text-2xl font-bold text-gray-800 mb-4">Question not found</p>
          <p className="text-gray-600">The requested question could not be loaded.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Question {questionNumber} of {totalQuestions || 0}
            </h2>
        <div className="text-sm text-gray-500">
          {isSubmitted && (
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          )}
        </div>
      </div>

      <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">{question.question}</h3>

      {/* Options */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-1">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrectOption = index === question.answerIndex;

          let optionClass = 'w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 ';

          if (!isSubmitted) {
            optionClass += isSelected
              ? 'border-blue-500 bg-blue-50 text-blue-900'
              : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50';
          } else {
            if (isCorrectOption) {
              optionClass += 'border-green-500 bg-green-50 text-green-900';
            } else if (isSelected && !isCorrect) {
              optionClass += 'border-red-500 bg-red-50 text-red-900';
            } else {
              optionClass += 'border-gray-300 bg-gray-50 text-gray-600';
            }
          }

          return (
            <button
              key={index}
              onClick={() => !isSubmitted && setSelectedOption(index)}
              disabled={isSubmitted}
              className={optionClass}
              aria-label={`Option ${index + 1}: ${option}`}
              aria-pressed={isSelected}
            >
              <div className="flex items-start gap-3">
                <span className="font-bold text-base sm:text-lg flex-shrink-0">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="flex-1 text-left text-sm sm:text-base">{option}</span>
                {isSubmitted && isCorrectOption && (
                  <span className="text-green-600 font-bold" aria-label="Correct answer">✓</span>
                )}
                {isSubmitted && isSelected && !isCorrect && (
                  <span className="text-red-600 font-bold" aria-label="Wrong answer">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback message - No spacing on mobile */}
      {isSubmitted && (
        <div
          className={`mb-0 sm:mb-6 p-3 sm:p-4 rounded-lg ${
            isCorrect ? 'bg-green-100 border border-green-400 text-green-800' : 'bg-red-100 border border-red-400 text-red-800'
          }`}
          role="alert"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-base sm:text-lg">{isCorrect ? '✓ Correct!' : '✗ Wrong!'}</span>
          </div>
          {!isCorrect && (
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm">
              The correct answer is: <strong>{question.options[question.answerIndex]}</strong>
            </p>
          )}
        </div>
      )}

      {/* Action buttons - Sticky on mobile */}
      <div className="flex justify-between gap-2 sm:gap-3 mt-auto pt-2 border-t border-gray-100 sm:border-0 sm:pt-0">
        {/* Previous button (disabled on first question) */}
        <button
          onClick={onPrevious}
          disabled={questionNumber <= 1}
          className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base ${
            questionNumber <= 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300'
          }`}
          aria-label="Previous question"
        >
          ← Previous
        </button>

        <div className="flex gap-2 sm:gap-3">
          {/* Skip button (only show when not submitted and no option selected) */}
          {!isSubmitted && (
            <button
              onClick={onSkip}
              className="px-3 sm:px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 text-sm sm:text-base"
              aria-label="Skip question"
            >
              Skip
            </button>
          )}

          {/* Submit button (only show when an option is selected and not submitted) */}
          {!isSubmitted && selectedOption !== null && (
            <button
              onClick={handleSubmit}
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base"
              aria-label="Submit answer"
            >
              Submit
            </button>
          )}

          {/* Next button (only show after submission) */}
          {isSubmitted && (
            <button
              onClick={onNext}
              className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base"
              aria-label={questionNumber === totalQuestions ? 'Finish quiz' : 'Next question'}
            >
              {questionNumber === totalQuestions ? 'Finish' : 'Next'}
            </button>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
};