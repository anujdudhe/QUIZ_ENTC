import { useEffect, useState } from 'react';
import { useNotifications } from '../hooks/useNotifications';

interface WelcomeModalProps {
  onStart: () => void;
}

export const WelcomeModal = ({ onStart }: WelcomeModalProps) => {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { showNotification } = useNotifications();

  useEffect(() => {
    // Show modal every time the component mounts
    setShow(true);
    // Small delay for animation
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-opacity duration-300">
      <div
        className={`bg-white rounded-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
      >
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to ENTC MCQ Practice</h2>
            <p className="text-gray-600">
              Master your Electronics concepts with our comprehensive MCQ practice platform.
            </p>
          </div>

          <div className="space-y-4 mb-6 text-left">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <p className="text-gray-700">
                Practice with topic-wise questions
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <p className="text-gray-700">
                Track your progress and improve
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <p className="text-gray-700">
                Perfect for exam preparation
              </p>
              
            </div>
          </div>


          <div className="mt-8 mb-6 text-center">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-gray-50 dark:bg-gray-800/100 rounded-full">
              <span className="text-sm text-gray-600 dark:text-gray-300">Created by</span>
              <a
                href="https://github.com/anujdudhe"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="inline-block"
                >
                  <path d="M12 0.5C5.73 0.5.5 5.74.5 12.02c0 5.11 3.29 9.45 7.86 10.98.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.53-1.36-1.29-1.72-1.29-1.72-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.99 0 1.99.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.11 3.02.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.77 1.07.77 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56 4.56-1.53 7.85-5.87 7.85-10.98C23.5 5.74 18.27.5 12 .5z" />
                </svg>
                Anuj Dudhe
              </a>
            </div>
          </div>

          <button
            onClick={async () => {
              setIsVisible(false);
              // Show welcome notification
              await showNotification('Welcome to ENTC MCQ Practice!', {
                body: 'Get ready to test your knowledge!',
                icon: '/logo192.png'
              });
              setTimeout(() => {
                setShow(false);
                onStart();
              }, 300);
            }}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Practicing
          </button>
        </div>
      </div>
    </div>
  );
};
