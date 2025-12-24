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
      return 'bg-gradient-to-br from-blue-400 to-blue-600 text-white ring-2 ring-blue-300';
    }

    // Check if question was skipped
    if (state.status === 'skipped') {
      return 'bg-gradient-to-br from-amber-400 to-amber-500 text-white';
    }

    // Check answer status
    if (state.status === 'answered' && userAnswer) {
      return userAnswer.isCorrect 
        ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white' 
        : 'bg-gradient-to-br from-rose-500 to-rose-600 text-white';
    } else if (state.status === 'marked') {
      return 'bg-gradient-to-br from-violet-500 to-violet-600 text-white';
    } else {
      // Unanswered
      return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
    }
  };

  // Rest of the component remains the same...
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-5 mb-6 border border-gray-200/50">
      <h3 className="text-base font-semibold text-slate-800 mb-4">Question Navigator</h3>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-emerald-400 to-emerald-600"></div>
          <span className="text-slate-700">Correct</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-rose-500 to-rose-600"></div>
          <span className="text-slate-700">Wrong</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-amber-400 to-amber-500"></div>
          <span className="text-slate-700">Skipped</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200"></div>
          <span className="text-slate-700">Unanswered</span>
        </div>
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2 max-h-80 overflow-y-auto p-1">
        {questionStates.map((state, index) => (
          <button
            key={state.questionId}
            onClick={() => onNavigateToQuestion(index)}
            className={`
              w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-medium text-sm sm:text-base
              transition-all duration-200 flex items-center justify-center
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
              shadow-sm hover:shadow-md hover:-translate-y-0.5
              ${getStatusColor(state, index)}
            `}
            aria-label={`Go to question ${index + 1}, status: ${state.status}`}
            title={`Question ${index + 1} - ${state.status}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-4 pt-3 border-t border-gray-200/50 flex flex-wrap gap-4 text-sm text-slate-700">
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