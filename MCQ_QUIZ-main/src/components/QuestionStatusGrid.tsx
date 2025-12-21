import { QuestionState, UserAnswer } from '../types';

interface QuestionStatusGridProps {
  questionStates: QuestionState[];
  currentQuestionIndex: number;
  onNavigateToQuestion: (index: number) => void;
  userAnswers: UserAnswer[]; // Add this prop to check answer status
}

/**
 * Grid component showing status of all questions
 * Green = Correct, Red = Wrong, Yellow = Skipped, Grey = Unanswered, Blue = Current
 */
export const QuestionStatusGrid = ({
  questionStates,
  currentQuestionIndex,
  onNavigateToQuestion,
  userAnswers,
}: QuestionStatusGridProps) => {
  const getStatusColor = (state: QuestionState, index: number) => {
    const isCurrentQuestion = index === currentQuestionIndex;
    const userAnswer = userAnswers.find(a => a.questionId === state.questionId);

    // Current question gets a blue ring
    if (isCurrentQuestion) {
      return 'ring-4 ring-blue-400';
    }

    // Check if question was skipped
    if (state.status === 'skipped') {
      return 'bg-yellow-400';
    }

    // Check answer status
    if (state.status === 'answered' && userAnswer) {
      return userAnswer.isCorrect ? 'bg-green-500' : 'bg-red-500';
    } else if (state.status === 'marked') {
      return 'bg-purple-500';
    } else {
      // Unanswered
      return 'bg-gray-300';
    }
  };

  // Rest of the component remains the same...
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Question Navigator</h3>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-600">Correct</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-600">Wrong</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
          <span className="text-gray-600">Skipped</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <span className="text-gray-600">Unanswered</span>
        </div>
       
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 gap-2 max-h-64 overflow-y-auto">
        {questionStates.map((state, index) => (
          <button
            key={state.questionId}
            onClick={() => onNavigateToQuestion(index)}
            className={`
              w-8 h-8 sm:w-9 sm:h-9 rounded font-semibold text-xs sm:text-sm
              transition-all duration-200 flex items-center justify-center
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              text-gray-700
              ${getStatusColor(state, index)}
              ${index === currentQuestionIndex ? 'ring-2 ring-blue-400' : ''}
            `}
            aria-label={`Go to question ${index + 1}, status: ${state.status}`}
            title={`Question ${index + 1} - ${state.status}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap gap-3 text-xs text-gray-600">
        <span>
          <strong>Total:</strong> {questionStates.length}
        </span>
        <span>
          <strong>Correct:</strong> {userAnswers.filter(a => a.isCorrect).length}
        </span>
        <span>
          <strong>Wrong:</strong> {userAnswers.filter(a => !a.isCorrect && !a.isSkipped).length}
        </span>
        <span>
          <strong>Skipped:</strong> {userAnswers.filter(a => a.isSkipped).length}
        </span>
      </div>
    </div>
  );
};