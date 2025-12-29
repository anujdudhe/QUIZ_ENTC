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

// Check if location has been tracked
export const hasLocationTracked = (): boolean => {
  return localStorage.getItem('has_location_tracked') === 'true';
};

// Mark visitor as tracked
export const markVisitorAsTracked = (): void => {
  localStorage.setItem(STORAGE_KEYS.HAS_TRACKED_VISIT, 'true');
};

// Mark location as tracked
export const markLocationAsTracked = (): void => {
  localStorage.setItem('has_location_tracked', 'true');
};

// Get detailed device information
export const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const vendor = navigator.vendor || '';
  
  console.log('User Agent:', ua);
  console.log('Platform:', platform);
  
  // Device type detection
  let deviceType = 'desktop';
  if (/mobile|android|iphone|ipad|phone/i.test(ua)) {
    deviceType = 'mobile';
  } else if (/tablet|ipad/i.test(ua)) {
    deviceType = 'tablet';
  }
  
  // Browser detection
  let browser = 'Unknown';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';
  else if (ua.includes('Opera')) browser = 'Opera';
  
  // OS detection
  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  
  // Specific device detection (limited)
  let deviceName = 'Unknown';
  if (ua.includes('iPhone')) {
    const match = ua.match(/iPhone OS (\d+_\d+)/);
    if (match) deviceName = `iPhone (iOS ${match[1].replace('_', '.')})`;
  } else if (ua.includes('iPad')) {
    const match = ua.match(/iPad OS (\d+_\d+)/);
    if (match) deviceName = `iPad (iOS ${match[1].replace('_', '.')})`;
  } else if (ua.includes('Android')) {
    const match = ua.match(/Android (\d+\.\d+)/);
    if (match) deviceName = `Android Device (${match[1]})`;
  } else if (ua.includes('Windows')) {
    const match = ua.match(/Windows NT (\d+\.\d+)/);
    if (match) deviceName = `Windows (${match[1]})`;
  }
  
  // Screen resolution
  const screenResolution = `${screen.width}x${screen.height}`;
  
  const deviceInfo = {
    deviceType,
    browser,
    os,
    deviceName,
    platform,
    vendor,
    screenResolution,
    userAgent: ua
  };
  
  console.log('Device Info:', deviceInfo);
  return deviceInfo;
};
export const getUserLocation = async (): Promise<{country: string, city: string, ip: string} | null> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) return null;
    
    const data = await response.json();
    return {
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown',
      ip: data.ip || 'Unknown'
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};

// Track visitor (only once per visitor)
export const trackVisitor = async (): Promise<void> => {
  const visitorId = getVisitorId();
  const firstVisit = localStorage.getItem(STORAGE_KEYS.FIRST_VISIT);
  const location = await getUserLocation();
  const deviceInfo = getDeviceInfo();
  
  // Always track for testing device info
  try {
    await addDoc(visitsCollection, {
      visitorId,
      firstVisit: firstVisit ? new Date(firstVisit) : serverTimestamp(),
      trackedAt: serverTimestamp(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      deviceInfo,
      location: location || null,
      timestamp: serverTimestamp()
    });
    
    if (isFirstTimeVisitor()) {
      markVisitorAsTracked();
    }
    markLocationAsTracked();
    console.log('Visitor tracked with device info and location:', { deviceInfo, location });
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
