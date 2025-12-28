import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBszM1xZWmnQwoMP2HNAKUuZlChNukiO9I",
  authDomain: "quiz-app-1970f.firebaseapp.com",
  projectId: "quiz-app-1970f",
  storageBucket: "quiz-app-1970f.firebasestorage.app",
  messagingSenderId: "137440929946",
  appId: "1:137440929946:web:9c5d1caf66843f8ca61723",
  measurementId: "G-GN0T5SQQNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics collection references
export const visitsCollection = collection(db, 'visits');
export const quizEventsCollection = collection(db, 'quiz_events');
