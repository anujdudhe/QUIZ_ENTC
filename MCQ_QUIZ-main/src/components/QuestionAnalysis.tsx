import { Question, UserAnswer } from '../types';

interface Props {
  questions: Question[];
  answers: UserAnswer[];
  onBack: () => void;
}

export const QuestionAnalysis = ({ questions, answers, onBack }: Props) => {
  const answeredMap = new Map<number, UserAnswer | undefined>();
  answers.forEach(a => answeredMap.set(a.questionId, a));

  const correctList = questions.filter(q => {
    const a = answeredMap.get(q.id);
    return a ? a.isCorrect : false;
  });

  const incorrectList = questions.filter(q => {
    const a = answeredMap.get(q.id);
    return a ? !a.isCorrect : false;
  });

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-6xl min-h-[80vh]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Full Question Analysis</h1>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ← Back to Results
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold text-emerald-700 mb-2">Correct Questions ({correctList.length})</h2>
            <ul className="space-y-2 max-h-96 overflow-auto">
              {correctList.map((q, i) => (
                <li key={`${q.chapter}-${q.id}`} className="p-3 border rounded">
                  <div className="font-medium">{i + 1}. {q.question}</div>
                  <div className="text-sm text-gray-600 mt-1">Correct answer: {String.fromCharCode(65 + q.answerIndex)}. {q.options[q.answerIndex]}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold text-rose-600 mb-2">Incorrect Questions ({incorrectList.length})</h2>
            <ul className="space-y-2 max-h-96 overflow-auto">
              {incorrectList.map((q, i) => {
                const a = answeredMap.get(q.id);
                return (
                  <li key={`${q.chapter}-${q.id}`} className="p-3 border rounded">
                    <div className="font-medium">{i + 1}. {q.question}</div>
                    <div className="text-sm text-gray-600 mt-1">Your answer: {a ? String.fromCharCode(65 + a.selectedIndex) + '. ' + (q.options[a.selectedIndex] ?? '—') : 'Unanswered'}</div>
                    <div className="text-sm text-gray-600 mt-1">Correct answer: {String.fromCharCode(65 + q.answerIndex)}. {q.options[q.answerIndex]}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionAnalysis;
