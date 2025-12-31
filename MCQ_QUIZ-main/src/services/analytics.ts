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

// Enhanced device information with detailed mobile model detection
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
  let browserVersion = '';
  
  if (ua.includes('Chrome')) {
    browser = 'Chrome';
    const match = ua.match(/Chrome\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes('Firefox')) {
    browser = 'Firefox';
    const match = ua.match(/Firefox\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browser = 'Safari';
    const match = ua.match(/Version\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes('Edge')) {
    browser = 'Edge';
    const match = ua.match(/Edge\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes('Opera')) {
    browser = 'Opera';
    const match = ua.match(/Opera\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  }
  
  // OS detection with version
  let os = 'Unknown';
  let osVersion = '';
  
  if (ua.includes('Windows')) {
    os = 'Windows';
    const match = ua.match(/Windows NT (\d+\.\d+)/);
    if (match) osVersion = match[1];
  } else if (ua.includes('Mac')) {
    os = 'macOS';
    const match = ua.match(/Mac OS X (\d+[._]\d+)/);
    if (match) osVersion = match[1].replace('_', '.');
  } else if (ua.includes('Linux')) {
    os = 'Linux';
  } else if (ua.includes('Android')) {
    os = 'Android';
    const match = ua.match(/Android (\d+\.\d+)/);
    if (match) osVersion = match[1];
  } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
    os = 'iOS';
    const match = ua.match(/OS (\d+[._]\d+)/);
    if (match) osVersion = match[1].replace('_', '.');
  }
  
  // Enhanced device detection for specific models
  let deviceName = 'Unknown';
  let manufacturer = 'Unknown';
  
  // Enhanced iPhone detection - more precise
  if (ua.includes('iPhone')) {
    manufacturer = 'Apple';
    
    // iPhone 15 series
    if (ua.includes('iPhone15,5') || ua.includes('iPhone15,4') || ua.includes('iPhone15,3') || ua.includes('iPhone15,2') || ua.includes('iPhone15,1')) {
      deviceName = 'iPhone 15';
    } else if (ua.includes('iPhone15,5')) deviceName = 'iPhone 15 Pro Max';
    else if (ua.includes('iPhone15,4')) deviceName = 'iPhone 15 Plus';
    else if (ua.includes('iPhone15,3')) deviceName = 'iPhone 15 Pro';
    else if (ua.includes('iPhone15,2')) deviceName = 'iPhone 15 Plus';
    else if (ua.includes('iPhone15,1')) deviceName = 'iPhone 15';
    
    // iPhone 14 series
    else if (ua.includes('iPhone14,8')) deviceName = 'iPhone 14 Plus';
    else if (ua.includes('iPhone14,7')) deviceName = 'iPhone 14';
    else if (ua.includes('iPhone14,6')) deviceName = 'iPhone SE (3rd generation)';
    else if (ua.includes('iPhone14,5')) deviceName = 'iPhone 13';
    else if (ua.includes('iPhone14,4')) deviceName = 'iPhone 13 mini';
    else if (ua.includes('iPhone14,3')) deviceName = 'iPhone 13 Pro Max';
    else if (ua.includes('iPhone14,2')) deviceName = 'iPhone 13 Pro';
    else if (ua.includes('iPhone14,1')) deviceName = 'iPhone 13 mini';
    
    // iPhone 13 series
    else if (ua.includes('iPhone13,4')) deviceName = 'iPhone 13 Pro Max';
    else if (ua.includes('iPhone13,3')) deviceName = 'iPhone 13 Pro';
    else if (ua.includes('iPhone13,2')) deviceName = 'iPhone 13';
    else if (ua.includes('iPhone13,1')) deviceName = 'iPhone 13 mini';
    
    // iPhone 12 series
    else if (ua.includes('iPhone12,8')) deviceName = 'iPhone SE (2nd generation)';
    else if (ua.includes('iPhone12,5')) deviceName = 'iPhone 12 Pro Max';
    else if (ua.includes('iPhone12,3')) deviceName = 'iPhone 12 Pro';
    else if (ua.includes('iPhone12,1')) deviceName = 'iPhone 12';
    else if (ua.includes('iPhone12,8')) deviceName = 'iPhone 12 mini';
    
    // iPhone 11 series
    else if (ua.includes('iPhone11,8')) deviceName = 'iPhone XR';
    else if (ua.includes('iPhone11,2')) deviceName = 'iPhone XS';
    else if (ua.includes('iPhone11,4') || ua.includes('iPhone11,6')) deviceName = 'iPhone XS Max';
    else if (ua.includes('iPhone11,3')) deviceName = 'iPhone XS Max';
    else if (ua.includes('iPhone11,1')) deviceName = 'iPhone X';
    
    // Older models
    else if (ua.includes('iPhone10,6') || ua.includes('iPhone10,3')) deviceName = 'iPhone X';
    else if (ua.includes('iPhone10,2') || ua.includes('iPhone10,5')) deviceName = 'iPhone 8 Plus';
    else if (ua.includes('iPhone10,1') || ua.includes('iPhone10,4')) deviceName = 'iPhone 8';
    else if (ua.includes('iPhone9,4') || ua.includes('iPhone9,3')) deviceName = 'iPhone 7 Plus';
    else if (ua.includes('iPhone9,2') || ua.includes('iPhone9,1')) deviceName = 'iPhone 7';
    else if (ua.includes('iPhone8,4')) deviceName = 'iPhone SE (1st generation)';
    else if (ua.includes('iPhone8,2')) deviceName = 'iPhone 6s Plus';
    else if (ua.includes('iPhone8,1')) deviceName = 'iPhone 6s';
    else if (ua.includes('iPhone7,2')) deviceName = 'iPhone 6';
    else if (ua.includes('iPhone7,1')) deviceName = 'iPhone 6 Plus';
    else if (ua.includes('iPhone6,2')) deviceName = 'iPhone 5s';
    else if (ua.includes('iPhone6,1')) deviceName = 'iPhone 5s';
    else if (ua.includes('iPhone5,4')) deviceName = 'iPhone 5c';
    else if (ua.includes('iPhone5,3')) deviceName = 'iPhone 5c';
    else if (ua.includes('iPhone5,2')) deviceName = 'iPhone 5';
    else if (ua.includes('iPhone5,1')) deviceName = 'iPhone 5';
    
    else deviceName = 'iPhone';
  }
  
  // iPad models
  else if (ua.includes('iPad')) {
    manufacturer = 'Apple';
    if (ua.includes('iPad13,') || ua.includes('iPad Pro')) deviceName = 'iPad Pro';
    else if (ua.includes('iPad12,') || ua.includes('iPad Air')) deviceName = 'iPad Air';
    else if (ua.includes('iPad11,') || ua.includes('iPad Mini')) deviceName = 'iPad Mini';
    else deviceName = 'iPad';
  }
  
  // Enhanced Samsung Android detection - exact models
  else if (ua.includes('Samsung') || ua.includes('SM-')) {
    manufacturer = 'Samsung';
    
    // Galaxy S series (2024)
    if (ua.includes('SM-S928B') || ua.includes('SM-S928U') || ua.includes('SM-S928N') || ua.includes('SM-S928W')) deviceName = 'Samsung Galaxy S24 Ultra';
    else if (ua.includes('SM-S926B') || ua.includes('SM-S926U') || ua.includes('SM-S926N') || ua.includes('SM-S926W')) deviceName = 'Samsung Galaxy S24+';
    else if (ua.includes('SM-S921B') || ua.includes('SM-S921U') || ua.includes('SM-S921N') || ua.includes('SM-S921W')) deviceName = 'Samsung Galaxy S24';
    else if (ua.includes('SM-S918B') || ua.includes('SM-S918U') || ua.includes('SM-S918N') || ua.includes('SM-S918W')) deviceName = 'Samsung Galaxy S23 Ultra';
    else if (ua.includes('SM-S916B') || ua.includes('SM-S916U') || ua.includes('SM-S916N') || ua.includes('SM-S916W')) deviceName = 'Samsung Galaxy S23+';
    else if (ua.includes('SM-S911B') || ua.includes('SM-S911U') || ua.includes('SM-S911N') || ua.includes('SM-S911W')) deviceName = 'Samsung Galaxy S23';
    
    // Galaxy S22 series
    else if (ua.includes('SM-S908N') || ua.includes('SM-S908U') || ua.includes('SM-S908B') || ua.includes('SM-S908W')) deviceName = 'Samsung Galaxy S22 Ultra';
    else if (ua.includes('SM-S906N') || ua.includes('SM-S906U') || ua.includes('SM-S906B') || ua.includes('SM-S906W')) deviceName = 'Samsung Galaxy S22+';
    else if (ua.includes('SM-S901N') || ua.includes('SM-S901U') || ua.includes('SM-S901B') || ua.includes('SM-S901W')) deviceName = 'Samsung Galaxy S22';
    
    // Galaxy S21 series
    else if (ua.includes('SM-G998B') || ua.includes('SM-G998U') || ua.includes('SM-G998N') || ua.includes('SM-G998W')) deviceName = 'Samsung Galaxy S21 Ultra';
    else if (ua.includes('SM-G996B') || ua.includes('SM-G996U') || ua.includes('SM-G996N') || ua.includes('SM-G996W')) deviceName = 'Samsung Galaxy S21+';
    else if (ua.includes('SM-G991B') || ua.includes('SM-G991U') || ua.includes('SM-G991N') || ua.includes('SM-G991W')) deviceName = 'Samsung Galaxy S21';
    
    // Galaxy S20 series
    else if (ua.includes('SM-G988B') || ua.includes('SM-G988U') || ua.includes('SM-G988N')) deviceName = 'Samsung Galaxy S20 Ultra';
    else if (ua.includes('SM-G986B') || ua.includes('SM-G986U') || ua.includes('SM-G986N')) deviceName = 'Samsung Galaxy S20+';
    else if (ua.includes('SM-G981B') || ua.includes('SM-G981U') || ua.includes('SM-G981N')) deviceName = 'Samsung Galaxy S20';
    
    // Galaxy S10 series
    else if (ua.includes('SM-G973F') || ua.includes('SM-G973U') || ua.includes('SM-G973N')) deviceName = 'Samsung Galaxy S10';
    else if (ua.includes('SM-G975F') || ua.includes('SM-G975U') || ua.includes('SM-G975N')) deviceName = 'Samsung Galaxy S10+';
    else if (ua.includes('SM-G970F') || ua.includes('SM-G970U') || ua.includes('SM-G970N')) deviceName = 'Samsung Galaxy S10e';
    else if (ua.includes('SM-G973F')) deviceName = 'Samsung Galaxy S10';
    
    // Galaxy S9 series
    else if (ua.includes('SM-G960F') || ua.includes('SM-G960U') || ua.includes('SM-G960N')) deviceName = 'Samsung Galaxy S9';
    else if (ua.includes('SM-G965F') || ua.includes('SM-G965U') || ua.includes('SM-G965N')) deviceName = 'Samsung Galaxy S9+';
    
    // Galaxy S8 series
    else if (ua.includes('SM-G950F') || ua.includes('SM-G950U') || ua.includes('SM-G950N')) deviceName = 'Samsung Galaxy S8';
    else if (ua.includes('SM-G955F') || ua.includes('SM-G955U') || ua.includes('SM-G955N')) deviceName = 'Samsung Galaxy S8+';
    
    // Galaxy A series (popular budget models)
    else if (ua.includes('SM-A546B') || ua.includes('SM-A546U') || ua.includes('SM-A546N')) deviceName = 'Samsung Galaxy A54';
    else if (ua.includes('SM-A536B') || ua.includes('SM-A536U') || ua.includes('SM-A536N')) deviceName = 'Samsung Galaxy A53';
    else if (ua.includes('SM-A525F') || ua.includes('SM-A525U') || ua.includes('SM-A525N')) deviceName = 'Samsung Galaxy A52';
    else if (ua.includes('SM-A515F') || ua.includes('SM-A515U') || ua.includes('SM-A515N')) deviceName = 'Samsung Galaxy A51';
    else if (ua.includes('SM-A505F') || ua.includes('SM-A505U') || ua.includes('SM-A505N')) deviceName = 'Samsung Galaxy A50';
    
    // Galaxy Note series
    else if (ua.includes('SM-N976N') || ua.includes('SM-N976U') || ua.includes('SM-N976B')) deviceName = 'Samsung Galaxy Note 10+';
    else if (ua.includes('SM-N970F') || ua.includes('SM-N970U') || ua.includes('SM-N970N')) deviceName = 'Samsung Galaxy Note 10';
    else if (ua.includes('SM-N960F') || ua.includes('SM-N960U') || ua.includes('SM-N960N')) deviceName = 'Samsung Galaxy Note 9';
    else if (ua.includes('SM-N950F') || ua.includes('SM-N950U') || ua.includes('SM-N950N')) deviceName = 'Samsung Galaxy Note 8';
    
    // Fold series
    else if (ua.includes('SM-F946B') || ua.includes('SM-F946U') || ua.includes('SM-F946N')) deviceName = 'Samsung Galaxy Z Fold 5';
    else if (ua.includes('SM-F936B') || ua.includes('SM-F936U') || ua.includes('SM-F936N')) deviceName = 'Samsung Galaxy Z Fold 4';
    else if (ua.includes('SM-F926B') || ua.includes('SM-F926U') || ua.includes('SM-F926N')) deviceName = 'Samsung Galaxy Z Fold 3';
    
    // Flip series
    else if (ua.includes('SM-F731B') || ua.includes('SM-F731U') || ua.includes('SM-F731N')) deviceName = 'Samsung Galaxy Z Flip 5';
    else if (ua.includes('SM-F721B') || ua.includes('SM-F721U') || ua.includes('SM-F721N')) deviceName = 'Samsung Galaxy Z Flip 4';
    else if (ua.includes('SM-F711B') || ua.includes('SM-F711U') || ua.includes('SM-F711N')) deviceName = 'Samsung Galaxy Z Flip 3';
    
    else deviceName = 'Samsung Galaxy';
  }
  
  // Google Pixel
  else if (ua.includes('Pixel')) {
    manufacturer = 'Google';
    if (ua.includes('Pixel 8') || ua.includes('Pixel8')) deviceName = 'Google Pixel 8';
    else if (ua.includes('Pixel 7') || ua.includes('Pixel7')) deviceName = 'Google Pixel 7';
    else if (ua.includes('Pixel 6') || ua.includes('Pixel6')) deviceName = 'Google Pixel 6';
    else if (ua.includes('Pixel 5') || ua.includes('Pixel5')) deviceName = 'Google Pixel 5';
    else deviceName = 'Google Pixel';
  }
  
  // OnePlus
  else if (ua.includes('OnePlus') || ua.includes('ONEPLUS')) {
    manufacturer = 'OnePlus';
    if (ua.includes('OnePlus 11') || ua.includes('KB2005')) deviceName = 'OnePlus 11';
    else if (ua.includes('OnePlus 10') || ua.includes('CPH2413')) deviceName = 'OnePlus 10';
    else if (ua.includes('OnePlus 9') || ua.includes('LE2123')) deviceName = 'OnePlus 9';
    else if (ua.includes('OnePlus 8') || ua.includes('IN2023')) deviceName = 'OnePlus 8';
    else deviceName = 'OnePlus';
  }
  
  // Xiaomi
  else if (ua.includes('Xiaomi') || ua.includes('Redmi') || ua.includes('POCO') || ua.includes('Mi')) {
    manufacturer = 'Xiaomi';
    if (ua.includes('Redmi Note')) deviceName = 'Xiaomi Redmi Note';
    else if (ua.includes('POCO')) deviceName = 'Xiaomi Poco';
    else if (ua.includes('Mi')) deviceName = 'Xiaomi Mi';
    else deviceName = 'Xiaomi';
  }
  
  // Oppo
  else if (ua.includes('Oppo') || ua.includes('OPPO')) {
    manufacturer = 'Oppo';
    if (ua.includes('Find')) deviceName = 'Oppo Find';
    else if (ua.includes('Reno')) deviceName = 'Oppo Reno';
    else if (ua.includes('A-series')) deviceName = 'Oppo A Series';
    else deviceName = 'Oppo';
  }
  
  // Vivo
  else if (ua.includes('Vivo') || ua.includes('VIVO')) {
    manufacturer = 'Vivo';
    if (ua.includes('X-series')) deviceName = 'Vivo X Series';
    else if (ua.includes('Y-series')) deviceName = 'Vivo Y Series';
    else if (ua.includes('V-series')) deviceName = 'Vivo V Series';
    else deviceName = 'Vivo';
  }
  
  // Desktop/Laptop detection
  else if (ua.includes('Windows')) {
    if (ua.includes('Dell')) {
      manufacturer = 'Dell';
      if (ua.includes('XPS')) deviceName = 'Dell XPS';
      else if (ua.includes('Inspiron')) deviceName = 'Dell Inspiron';
      else if (ua.includes('Latitude')) deviceName = 'Dell Latitude';
      else deviceName = 'Dell Laptop/Desktop';
    } else if (ua.includes('HP')) {
      manufacturer = 'HP';
      if (ua.includes('Pavilion')) deviceName = 'HP Pavilion';
      else if (ua.includes('EliteBook')) deviceName = 'HP EliteBook';
      else if (ua.includes('ProBook')) deviceName = 'HP ProBook';
      else deviceName = 'HP Laptop/Desktop';
    } else if (ua.includes('Lenovo')) {
      manufacturer = 'Lenovo';
      if (ua.includes('ThinkPad')) deviceName = 'Lenovo ThinkPad';
      else if (ua.includes('IdeaPad')) deviceName = 'Lenovo IdeaPad';
      else deviceName = 'Lenovo Laptop/Desktop';
    } else if (ua.includes('ASUS')) {
      manufacturer = 'ASUS';
      if (ua.includes('ROG')) deviceName = 'ASUS ROG';
      else if (ua.includes('ZenBook')) deviceName = 'ASUS ZenBook';
      else deviceName = 'ASUS Laptop/Desktop';
    } else if (ua.includes('Acer')) {
      manufacturer = 'Acer';
      if (ua.includes('Aspire')) deviceName = 'Acer Aspire';
      else if (ua.includes('Predator')) deviceName = 'Acer Predator';
      else deviceName = 'Acer Laptop/Desktop';
    } else {
      deviceName = 'Windows PC';
    }
  }
  
  // Mac detection
  else if (ua.includes('Mac')) {
    manufacturer = 'Apple';
    if (ua.includes('MacBook')) deviceName = 'MacBook';
    else if (ua.includes('iMac')) deviceName = 'iMac';
    else if (ua.includes('Mac Pro')) deviceName = 'Mac Pro';
    else deviceName = 'Mac';
  }
  
  // Screen resolution and additional info
  const screenResolution = `${screen.width}x${screen.height}`;
  const colorDepth = screen.colorDepth;
  const pixelRatio = window.devicePixelRatio || 1;
  
  // Hardware info
  const hardwareInfo = {
    cores: navigator.hardwareConcurrency || 'Unknown',
    memory: (navigator as any).deviceMemory || 'Unknown',
    connection: (navigator as any).connection?.effectiveType || 'Unknown'
  };
  
  const deviceInfo = {
    deviceType,
    browser: browser + (browserVersion ? ` ${browserVersion}` : ''),
    os: os + (osVersion ? ` ${osVersion}` : ''),
    deviceName,
    manufacturer,
    platform,
    vendor,
    screenResolution,
    colorDepth,
    pixelRatio,
    hardwareInfo,
    userAgent: ua,
    timestamp: new Date().toISOString()
  };
  
  console.log('Enhanced Device Info:', deviceInfo);
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
