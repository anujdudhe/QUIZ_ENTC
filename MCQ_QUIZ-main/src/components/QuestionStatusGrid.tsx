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
      <div className="mt-6 pt-4 border-t border-gray-200/50">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 text-center group hover:shadow-md transition-all duration-200">
            <div className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
              {questionStates.length}
            </div>
            <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">Total</div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-3 text-center group hover:shadow-md transition-all duration-200">
            <div className="text-2xl font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
              {userAnswers.filter(a => a.isCorrect).length}
            </div>
            <div className="text-xs text-emerald-600 font-medium uppercase tracking-wide">Correct</div>
          </div>
          
          <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg p-3 text-center group hover:shadow-md transition-all duration-200">
            <div className="text-2xl font-bold text-rose-600 group-hover:text-rose-700 transition-colors">
              {userAnswers.filter(a => !a.isCorrect && !a.isSkipped).length}
            </div>
            <div className="text-xs text-rose-600 font-medium uppercase tracking-wide">Wrong</div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 text-center group hover:shadow-md transition-all duration-200">
            <div className="text-2xl font-bold text-amber-600 group-hover:text-amber-700 transition-colors">
              {userAnswers.filter(a => a.isSkipped).length}
            </div>
            <div className="text-xs text-amber-600 font-medium uppercase tracking-wide">Skipped</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Progress</span>
            <span className="font-medium">
              {Math.round((userAnswers.filter(a => a.isCorrect || !a.isSkipped).length / questionStates.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(userAnswers.filter(a => a.isCorrect || !a.isSkipped).length / questionStates.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};