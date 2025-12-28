import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

// Your Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics collection references
export const analyticsCollection = collection(db, 'analytics');
export const visitsCollection = collection(db, 'visits');
export const quizEventsCollection = collection(db, 'quiz_events');
