import { useState } from 'react';
import { Chapter } from '../types';
import './ChapterSelector.css';

interface ChapterSelectorProps {
  chapters: Chapter[];
  onSelectChapter: (chapterId: string) => void;
}

// Unit descriptions to be shown in the modal
const UNIT_DESCRIPTIONS: Record<string, string> = {
  'UNIT 1': 'Unit 1 introduces the basics of microcomputers and microcontrollers, their architecture, differences, and the role of the 8051 microcontroller in embedded systems.',
  'UNIT 2': 'Dive deeper into React hooks, state management, and component lifecycle methods.',
  'UNIT 3': 'Advanced React patterns, context API, and performance optimization techniques.',
  'UNIT 4': 'State management solutions including Redux and React Query for complex applications.',
  'UNIT 5': 'Advanced topics like server-side rendering, testing, and deployment strategies.'
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 Select a Unit</h1>
        <p className="text-gray-600">Click on a unit to see details and start the quiz</p>
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
