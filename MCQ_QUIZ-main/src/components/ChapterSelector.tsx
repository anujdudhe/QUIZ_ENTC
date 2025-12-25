import { useState } from 'react';
import { Chapter } from '../types';
import './ChapterSelector.css';

interface ChapterSelectorProps {
  chapters: Chapter[];
  onSelectChapter: (chapterId: string) => void;
}

// Short unit titles shown on the chapter cards
const UNIT_TITLES: Record<string, string> = {
  'UNIT 1': 'Microcontroller Fundamentals',
  'UNIT 2': 'Embedded Systems and Advance Microcontrollers',
  'UNIT 3': 'Unit 3 Title',
  'UNIT 4': 'Unit 4 Title',
  'UNIT 5': 'Unit 5 Title',
};

// Unit descriptions to be shown in the modal
const UNIT_DESCRIPTIONS: Record<string, string> = {
  'UNIT 1': 'Unit 1 introduces the basics of microcomputers and microcontrollers, their architecture, differences, and the role of the 8051 microcontroller in embedded systems.',
  'UNIT 2': 'UNIT 2 introduces embedded systems and advanced microcontrollers, focusing on their architecture, components, and applications.',
  'UNIT 3': 'UNIT 3 focuses on Arduino as an open-source development board, covering Arduino basics, types of boards, and programming using the Arduino IDE. ',
  'UNIT 4': 'UNIT 4 focuses on interfacing basic electronic components with Arduino, including LEDs, switches, relays, seven-segment displays, and 16×2 LCDs.',
  'UNIT 5': 'UNIT 5 introduces the Internet of Things (IoT), covering IoT architecture, components, and communication modules.'
};

export const ChapterSelector = ({ chapters, onSelectChapter }: ChapterSelectorProps) => {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleUnitClick = (unit: string) => {
    setSelectedUnit(unit);
    setShowModal(true);
  };

  const handleStartQuiz = () => {
    if (selectedUnit) {
      onSelectChapter(selectedUnit);
    }
    setShowModal(false);
  };
  return (
    <div className="chapter-selector-container">
      <div className="chapter-header">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 drop-shadow-md">
          📚 ENTC Unit-wise MCQ Examination System
        </h1>
        <p className="text-indigo-100 text-sm sm:text-base">
          Designed for focused practice & self-evaluation
        </p>
      </div>

      <div className="chapters-grid">
        {['UNIT 1', 'UNIT 2', 'UNIT 3', 'UNIT 4', 'UNIT 5'].map((unit) => {
          const chapter = chapters.find(c => c.name === unit);
          return (
            <button
              key={unit}
              className="chapter-card hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleUnitClick(unit)}
            >
              <div className="chapter-number text-2xl font-bold">
                {unit}
              </div>
              {UNIT_TITLES[unit] && (
                <p className="chapter-title text-sm font-semibold text-gray-800 mt-1">
                  {UNIT_TITLES[unit]}
                </p>
              )}
              {chapter?.description && (
                <p className="chapter-description">{chapter.description}</p>
              )}
              {!chapter && (
                <p className="chapter-description">0 questions</p>
              )}
            </button>
          );
        })}
      </div>

      <section className="mt-8 bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-3">How This Quiz Works</h2>
        <ol className="space-y-2 text-gray-700 text-sm list-decimal list-inside">
          <li>Select a unit from the cards above.</li>
          <li>Answer multiple-choice questions one by one.</li>
          <li>Use the skip option to move ahead and revisit questions later.</li>
          <li>Submit and view your instant results & score at the end.</li>
        </ol>
      </section>

      <div className="mt-12 flex justify-center items-center gap-2 text-white/80">
        <span className="text-sm">Created by</span>

        <a
          href="https://github.com/anujdudhe"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-semibold text-white hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0.5C5.73 0.5.5 5.74.5 12.02c0 5.11 3.29 9.45 7.86 10.98.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.53-1.36-1.29-1.72-1.29-1.72-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.99 0 1.99.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.11 3.02.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.77 1.07.77 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56 4.56-1.53 7.85-5.87 7.85-10.98C23.5 5.74 18.27.5 12 .5z" />
          </svg>
          Anuj Dudhe
        </a>
      </div>


      {/* Unit Info Modal */}
      {showModal && selectedUnit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedUnit}</h2>
            <p className="text-gray-700 mb-6">
              {UNIT_DESCRIPTIONS[selectedUnit] || 'No description available for this unit.'}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStartQuiz}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
