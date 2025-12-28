import { visitsCollection, quizEventsCollection } from '../firebase';
import { addDoc, serverTimestamp } from 'firebase/firestore';

// Storage keys for localStorage
const STORAGE_KEYS = {
  VISITOR_ID: 'visitor_id',
  FIRST_VISIT: 'first_visit',
  HAS_TRACKED_VISIT: 'has_tracked_visit'
};

// Generate or retrieve visitor ID
export const getVisitorId = (): string => {
  let visitorId = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
  
  if (!visitorId) {
    // Generate new visitor ID
    visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(STORAGE_KEYS.VISITOR_ID, visitorId);
    localStorage.setItem(STORAGE_KEYS.FIRST_VISIT, new Date().toISOString());
  }
  
  return visitorId;
};

// Check if first-time visitor
export const isFirstTimeVisitor = (): boolean => {
  return !localStorage.getItem(STORAGE_KEYS.HAS_TRACKED_VISIT);
};

// Mark visitor as tracked
export const markVisitorAsTracked = (): void => {
  localStorage.setItem(STORAGE_KEYS.HAS_TRACKED_VISIT, 'true');
};

// Track visitor (only once per visitor)
export const trackVisitor = async (): Promise<void> => {
  if (!isFirstTimeVisitor()) return;
  
  try {
    const visitorId = getVisitorId();
    const firstVisit = localStorage.getItem(STORAGE_KEYS.FIRST_VISIT);
    
    await addDoc(visitsCollection, {
      visitorId,
      firstVisit: firstVisit ? new Date(firstVisit) : serverTimestamp(),
      trackedAt: serverTimestamp(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      timestamp: serverTimestamp()
    });
    
    markVisitorAsTracked();
    console.log('Visitor tracked successfully');
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
};

// Track quiz start event
export const trackQuizStart = async (unit: string): Promise<void> => {
  try {
    const visitorId = getVisitorId();
    
    await addDoc(quizEventsCollection, {
      visitorId,
      eventType: 'quiz_start',
      unit,
      timestamp: serverTimestamp(),
      sessionId: getSessionId()
    });
    
    console.log('Quiz start tracked:', unit);
  } catch (error) {
    console.error('Error tracking quiz start:', error);
  }
};

// Track quiz completion event
export const trackQuizCompletion = async (
  unit: string,
  totalQuestions: number,
  correctAnswers: number,
  score: number
): Promise<void> => {
  try {
    const visitorId = getVisitorId();
    
    await addDoc(quizEventsCollection, {
      visitorId,
      eventType: 'quiz_complete',
      unit,
      totalQuestions,
      correctAnswers,
      score,
      percentage: Math.round((correctAnswers / totalQuestions) * 100),
      timestamp: serverTimestamp(),
      sessionId: getSessionId()
    });
    
    console.log('Quiz completion tracked:', { unit, score });
  } catch (error) {
    console.error('Error tracking quiz completion:', error);
  }
};

// Generate session ID for tracking quiz sessions
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('quiz_session_id');
  
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('quiz_session_id', sessionId);
  }
  
  return sessionId;
};

// Initialize analytics on app load
export const initializeAnalytics = async (): Promise<void> => {
  // Track visitor if first time
  await trackVisitor();
};
