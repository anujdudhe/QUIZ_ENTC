import { motion } from "framer-motion";

interface ModalIntroProps {
  onContinue: () => void;
}

export default function ModalIntro({ onContinue }: ModalIntroProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center ring-1 ring-white/10">
              <span className="text-2xl">📘</span>
            </div>
          </div>

          <h2 id="modal-title" className="text-white text-2xl font-semibold">
            Assessment Portal
          </h2>

          <p className="text-white/90 text-sm mt-1">Focused practice</p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-5 text-center">
          <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
            Practice multiple-choice questions and review your understanding with clear, structured assessments.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mx-auto max-w-sm text-left">
            <p className="text-sm text-yellow-800 m-0">
              <strong>Disclaimer:</strong> This platform is intended for practice only.
            </p>
          </div>

          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 text-left mx-auto max-w-xs">
            <li className="flex items-start gap-2">
              <span>•</span> <span>Timed & untimed MCQ modules</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span> <span>Track your progress</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span> <span>Review results instantly</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span> <span>Improve accuracy over time</span>
            </li>
          </ul>

          <button
            onClick={onContinue}
            className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            aria-label="Continue to exam"
          >
            Continue
          </button>

          <div className="text-center text-xs text-gray-400 mt-2">
            Designed for focused learning —{" "}
            <span className="font-medium text-gray-700 dark:text-gray-200">ANUJ DUDHE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
