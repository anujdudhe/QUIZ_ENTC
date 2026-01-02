import { ExamResults } from '../types';

interface ResultProps {
  results: ExamResults;
  onRestart: () => void;
  onShowAnalysis: () => void;
}

/**
 * Final results screen showing score and download options
 */
export const Result = ({ results, onRestart, onShowAnalysis }: ResultProps) => {
  const { totalQuestions, correctAnswers, wrongAnswers, percentage } = results;

  // Download removed — analysis opens on a separate page now.

  // Determine performance level
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: 'Excellent! 🎉', color: 'text-green-600' };
    if (percentage >= 75) return { text: 'Great Job! 👏', color: 'text-blue-600' };
    if (percentage >= 60) return { text: 'Good Effort! 👍', color: 'text-yellow-600' };
    if (percentage >= 40) return { text: 'Keep Practicing! 📚', color: 'text-orange-600' };
    return { text: 'Need More Practice 💪', color: 'text-red-600' };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-6 md:p-10 w-full max-w-6xl min-h-[70vh]">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Exam Completed!
        </h1>
        <p className={`text-lg sm:text-xl md:text-2xl font-semibold ${performance.color}`}>
          {performance.text}
        </p>
      </div>

      {/* Score display - Compact on mobile */}
      <div className="relative mb-4 sm:mb-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl blur opacity-25"></div>
        <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl border border-white/50 backdrop-blur-sm">
          <div className="text-center mb-4 sm:mb-8">
            <div className="relative inline-block">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-lg sm:blur-xl opacity-30 animate-pulse"></div>
              <div className="relative text-4xl sm:text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {percentage.toFixed(1)}%
              </div>
            </div>
            <div className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mt-2 sm:mt-4 uppercase tracking-wide">Your Score</div>
          </div>

          {/* Statistics grid - Responsive */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            <div className="group relative">
              <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 md:p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
                <div className="text-xl sm:text-3xl md:text-4xl font-black text-gray-800 group-hover:text-gray-900 transition-colors">
                  {totalQuestions}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 font-medium uppercase tracking-wide">Total</div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-emerald-400 to-green-600 rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 md:p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
                <div className="text-xl sm:text-3xl md:text-4xl font-black text-emerald-600 group-hover:text-emerald-700 transition-colors">
                  {correctAnswers}
                </div>
                <div className="text-xs sm:text-sm text-emerald-600 mt-1 sm:mt-2 font-medium uppercase tracking-wide">Correct</div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-rose-400 to-red-600 rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 md:p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
                <div className="text-xl sm:text-3xl md:text-4xl font-black text-rose-600 group-hover:text-rose-700 transition-colors">
                  {wrongAnswers}
                </div>
                <div className="text-xs sm:text-sm text-rose-600 mt-1 sm:mt-2 font-medium uppercase tracking-wide">Wrong</div>
              </div>
            </div>
          </div>
          
          {/* Performance indicator - Compact */}
          <div className="mt-4 sm:mt-8 text-center">
            <div className="inline-flex items-center px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-white/50">
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3 animate-pulse ${
                percentage >= 75 ? 'bg-emerald-500' : 
                percentage >= 60 ? 'bg-amber-500' : 
                percentage >= 40 ? 'bg-orange-500' : 'bg-red-500'
              }`}></div>
              <span className={`text-sm sm:text-base font-semibold ${
                percentage >= 75 ? 'text-emerald-700' : 
                percentage >= 60 ? 'text-amber-700' : 
                percentage >= 40 ? 'text-orange-700' : 'text-red-700'
              }`}>
                {performance.text}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Completion time - Compact */}
      <div className="text-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-6">
        Completed on: {new Date(results.completedAt).toLocaleString()}
      </div>

      {/* Action buttons - Compact on mobile */}
      <div className="space-y-2 sm:space-y-3">
        <button
          onClick={onRestart}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Restart the exam"
        >
          🔄 Restart Exam
        </button>

        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={onShowAnalysis}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Show question analysis"
          >
            🔍 Ques Analysis
          </button>
        </div>
      </div>
      {/* Analysis now opens on a separate page */}

      {/* Footer note - Compact */}
      <div className="mt-3 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
        Made with ❤️ by <span className="font-semibold">ANUJ DUDHE</span>
      </div>
    </div>
  );
};
