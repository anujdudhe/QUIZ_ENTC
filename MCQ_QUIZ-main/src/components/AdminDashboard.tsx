import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, Timestamp, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';

interface VisitData {
  visitorId: string;
  firstVisit: Timestamp;
  trackedAt: Timestamp;
  userAgent: string;
  referrer: string;
  deviceInfo?: {
    deviceType: string;
    browser: string;
    os: string;
    deviceName: string;
    manufacturer: string;
    platform: string;
    vendor: string;
    screenResolution: string;
    colorDepth: number;
    pixelRatio: number;
    hardwareInfo: {
      cores: number | string;
      memory: number | string;
      connection: string;
    };
    timestamp: string;
  };
  location?: {
    country: string;
    city: string;
    ip: string;
  } | null;
}

interface QuizEventData {
  visitorId: string;
  eventType: 'quiz_start' | 'quiz_complete';
  unit: string;
  totalQuestions?: number;
  correctAnswers?: number;
  score?: number;
  percentage?: number;
  timestamp: Timestamp;
  sessionId?: string; // Made optional for backward compatibility
}

export const AdminDashboard = () => {
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [quizEvents, setQuizEvents] = useState<QuizEventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'visits' | 'quiz' | 'insights'>('overview');

  // Helper function to get relative time
  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2419200) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    if (diffInSeconds < 29030400) return `${Math.floor(diffInSeconds / 2419200)} months ago`;
    return `${Math.floor(diffInSeconds / 29030400)} years ago`;
  };

  // Helper function to extract device name from user agent
  const getDeviceName = (userAgent: string, deviceInfo?: any) => {
    // If deviceInfo has deviceName, use it
    if (deviceInfo?.deviceName && deviceInfo.deviceName !== 'Unknown device') {
      return deviceInfo.deviceName;
    }
    
    // Extract from user agent string
    const ua = userAgent.toLowerCase();
    
    // iPhone models
    if (ua.includes('iphone')) {
      if (ua.includes('iphone 15')) return 'iPhone 15';
      if (ua.includes('iphone 14')) return 'iPhone 14';
      if (ua.includes('iphone 13')) return 'iPhone 13';
      if (ua.includes('iphone 12')) return 'iPhone 12';
      if (ua.includes('iphone 11')) return 'iPhone 11';
      if (ua.includes('iphone x')) return 'iPhone X';
      return 'iPhone';
    }
    
    // iPad models
    if (ua.includes('ipad')) {
      if (ua.includes('ipad pro')) return 'iPad Pro';
      if (ua.includes('ipad air')) return 'iPad Air';
      if (ua.includes('ipad mini')) return 'iPad Mini';
      return 'iPad';
    }
    
    // Android devices
    if (ua.includes('android')) {
      // Samsung
      if (ua.includes('samsung') || ua.includes('galaxy')) {
        if (ua.includes('s23')) return 'Samsung Galaxy S23';
        if (ua.includes('s22')) return 'Samsung Galaxy S22';
        if (ua.includes('s21')) return 'Samsung Galaxy S21';
        if (ua.includes('s20')) return 'Samsung Galaxy S20';
        return 'Samsung Galaxy';
      }
      
      // Google Pixel
      if (ua.includes('pixel')) {
        if (ua.includes('pixel 8')) return 'Google Pixel 8';
        if (ua.includes('pixel 7')) return 'Google Pixel 7';
        if (ua.includes('pixel 6')) return 'Google Pixel 6';
        return 'Google Pixel';
      }
      
      // OnePlus
      if (ua.includes('oneplus')) {
        if (ua.includes('oneplus 11')) return 'OnePlus 11';
        if (ua.includes('oneplus 10')) return 'OnePlus 10';
        if (ua.includes('oneplus 9')) return 'OnePlus 9';
        return 'OnePlus';
      }
      
      // Xiaomi
      if (ua.includes('redmi')) return 'Xiaomi Redmi';
      if (ua.includes('poco')) return 'Xiaomi Poco';
      if (ua.includes('mi')) return 'Xiaomi Mi';
      
      // Oppo
      if (ua.includes('oppo')) return 'Oppo';
      
      // Vivo
      if (ua.includes('vivo')) return 'Vivo';
      
      return 'Android Device';
    }
    
    // Desktop/Laptop detection
    if (ua.includes('windows')) {
      if (ua.includes('dell')) return 'Dell Laptop/Desktop';
      if (ua.includes('hp')) return 'HP Laptop/Desktop';
      if (ua.includes('lenovo')) return 'Lenovo Laptop/Desktop';
      if (ua.includes('asus')) return 'ASUS Laptop/Desktop';
      if (ua.includes('acer')) return 'Acer Laptop/Desktop';
      return 'Windows PC';
    }
    
    if (ua.includes('mac')) {
      if (ua.includes('macbook')) return 'MacBook';
      if (ua.includes('imac')) return 'iMac';
      if (ua.includes('mac pro')) return 'Mac Pro';
      return 'Mac';
    }
    
    return 'Unknown Device';
  };

  // Helper function to get manufacturer
  const getManufacturer = (userAgent: string, deviceInfo?: any) => {
    if (deviceInfo?.vendor && deviceInfo.vendor !== 'Unknown') {
      return deviceInfo.vendor;
    }
    
    const ua = userAgent.toLowerCase();
    
    if (ua.includes('apple') || ua.includes('iphone') || ua.includes('ipad') || ua.includes('mac')) return 'Apple';
    if (ua.includes('samsung')) return 'Samsung';
    if (ua.includes('google') || ua.includes('pixel')) return 'Google';
    if (ua.includes('oneplus')) return 'OnePlus';
    if (ua.includes('xiaomi') || ua.includes('redmi') || ua.includes('poco') || ua.includes('mi')) return 'Xiaomi';
    if (ua.includes('oppo')) return 'Oppo';
    if (ua.includes('vivo')) return 'Vivo';
    if (ua.includes('dell')) return 'Dell';
    if (ua.includes('hp')) return 'HP';
    if (ua.includes('lenovo')) return 'Lenovo';
    if (ua.includes('asus')) return 'ASUS';
    if (ua.includes('acer')) return 'Acer';
    
    return 'Unknown';
  };

  // Helper function to calculate average score
  const calculateAverageScore = () => {
    const completedQuizzes = quizEvents?.filter(e => e.eventType === 'quiz_complete' && e.score) || [];
    return completedQuizzes.length > 0 
      ? Math.round(completedQuizzes.reduce((sum, q) => sum + q.score, 0) / completedQuizzes.length)
      : 0;
  };

  // Helper function to calculate success rate
  const calculateSuccessRate = () => {
    const started = quizEvents?.filter(e => e.eventType === 'quiz_start').length || 0;
    const completed = quizEvents?.filter(e => e.eventType === 'quiz_complete').length || 0;
    return started > 0 ? Math.round((completed / started) * 100) : 0;
  };

  // Helper function to get unit performance stats
  const getUnitPerformanceStats = () => {
    const unitStats = quizEvents
      ?.filter(e => e.eventType === 'quiz_complete' && e.score)
      ?.reduce((acc, event) => {
        if (!acc[event.unit]) {
          acc[event.unit] = { total: 0, count: 0, attempts: 0 };
        }
        acc[event.unit].total += event.score;
        acc[event.unit].count += 1;
        return acc;
      }, {} as Record<string, { total: number; count: number; attempts: number }>) || {};

    const startedByUnit = quizEvents
      ?.filter(e => e.eventType === 'quiz_start')
      ?.reduce((acc, event) => {
        if (!acc[event.unit]) acc[event.unit] = 0;
        acc[event.unit] += 1;
        return acc;
      }, {} as Record<string, number>) || {};

    Object.keys(startedByUnit).forEach(unit => {
      if (unitStats[unit]) {
        unitStats[unit].attempts = startedByUnit[unit];
      } else {
        unitStats[unit] = { total: 0, count: 0, attempts: startedByUnit[unit] };
      }
    });

    return Object.entries(unitStats)
      .sort((a, b) => b[1].attempts - a[1].attempts)
      .map(([unit, stats]) => ({
        unit,
        avgScore: stats.count > 0 ? Math.round(stats.total / stats.count) : 0,
        completionRate: stats.attempts > 0 ? Math.round((stats.count / stats.attempts) * 100) : 0,
        attempts: stats.attempts,
        completed: stats.count
      }));
  };

  // Function to clear all analytics data
  const clearAllAnalyticsData = async () => {
    if (!window.confirm('Are you sure you want to delete all analytics data? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      
      // Clear visits collection
      const visitsQuery = query(collection(db, 'visits'));
      const visitsSnapshot = await getDocs(visitsQuery);
      const visitsBatch = writeBatch(db);
      
      visitsSnapshot.docs.forEach((doc) => {
        visitsBatch.delete(doc.ref);
      });
      
      await visitsBatch.commit();
      
      // Clear quiz events collection
      const quizEventsQuery = query(collection(db, 'quiz_events'));
      const quizEventsSnapshot = await getDocs(quizEventsQuery);
      const quizEventsBatch = writeBatch(db);
      
      quizEventsSnapshot.docs.forEach((doc) => {
        quizEventsBatch.delete(doc.ref);
      });
      
      await quizEventsBatch.commit();
      
      // Clear local state
      setVisits([]);
      setQuizEvents([]);
      
      // Clear localStorage
      localStorage.removeItem('visitor_id');
      localStorage.removeItem('first_visit');
      localStorage.removeItem('has_tracked_visit');
      localStorage.removeItem('has_location_tracked');
      
      alert('All analytics data has been cleared successfully!');
      
    } catch (error) {
      console.error('Error clearing analytics data:', error);
      alert('Failed to clear analytics data. Please try again.');
    } finally {
      setLoading(false);
      // Refresh data
      fetchData();
    }
  };

  // Data fetching function
  const fetchData = async () => {
    try {
      // Fetch visits data
      const visitsQuery = query(
        collection(db, 'visits'),
        orderBy('trackedAt', 'desc'),
        limit(50)
      );
      const visitsSnapshot = await getDocs(visitsQuery);
      const visitsData = visitsSnapshot.docs.map((doc: any) => doc.data() as VisitData);
      setVisits(visitsData);

      // Fetch quiz events data
      const eventsQuery = query(
        collection(db, 'quiz_events'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );
      const eventsSnapshot = await getDocs(eventsQuery);
      const eventsData = eventsSnapshot.docs.map((doc: any) => {
        const data = doc.data() as QuizEventData;
        // Ensure sessionId exists for backward compatibility
        return {
          ...data,
          sessionId: data.sessionId || 'legacy-session'
        } as QuizEventData;
      });
      setQuizEvents(eventsData);

      // Process advanced analytics with processed events
      processAnalytics(visitsData, eventsData);

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch analytics data');
      setLoading(false);
      console.error('Error fetching analytics:', err);
    }
  };

  // Simplified analytics state
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    activeToday: 0,
    averageScore: 0,
    completionRate: 0,
    mostPopularUnit: '',
    deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 },
    topBrowsers: [] as {name: string, count: number}[]
  });

  // Simple password check (in production, use more secure authentication)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const ADMIN_PASSWORD = 'Carino16'; // Change this to a secure password

  // Process analytics data
  const processAnalytics = (visitsData: VisitData[], eventsData: QuizEventData[]) => {
    // Use the processed events (sessionId already ensured)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Calculate unique visitors
    const uniqueVisitors = new Set(visitsData.map(v => v.visitorId));
    const todayVisitors = visitsData.filter(v => v.trackedAt.toDate() >= today);
    
    // Quiz metrics
    const completedQuizzes = eventsData.filter(e => e.eventType === 'quiz_complete');
    const averageScore = completedQuizzes.length > 0
      ? Math.round(completedQuizzes.reduce((sum, q) => sum + (q.score || 0), 0) / completedQuizzes.length)
      : 0;
    
    // Device and browser detection
    const deviceBreakdown = { desktop: 0, mobile: 0, tablet: 0 };
    const browserCounts: Record<string, number> = {};
    
    visitsData.forEach(visit => {
      // More accurate device detection using deviceInfo when available
      if (visit.deviceInfo) {
        const deviceType = visit.deviceInfo.deviceType.toLowerCase();
        if (deviceType.includes('mobile')) deviceBreakdown.mobile++;
        else if (deviceType.includes('tablet')) deviceBreakdown.tablet++;
        else deviceBreakdown.desktop++;
        
        // Track browser usage
        const browser = visit.deviceInfo.browser || 'Unknown';
        browserCounts[browser] = (browserCounts[browser] || 0) + 1;
      } else {
        // Fallback to user agent parsing
        const ua = visit.userAgent.toLowerCase();
        if (ua.includes('mobi') || ua.includes('android') || ua.includes('iphone')) deviceBreakdown.mobile++;
        else if (ua.includes('tablet') || ua.includes('ipad')) deviceBreakdown.tablet++;
        else deviceBreakdown.desktop++;
        
        // Basic browser detection
        let browser = 'Other';
        if (ua.includes('chrome')) browser = 'Chrome';
        else if (ua.includes('firefox')) browser = 'Firefox';
        else if (ua.includes('safari')) browser = 'Safari';
        else if (ua.includes('edge')) browser = 'Edge';
        browserCounts[browser] = (browserCounts[browser] || 0) + 1;
      }
    });
    
    // Get top 3 browsers
    const topBrowsers = Object.entries(browserCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
    
    // Calculate completion rate
    const quizStarts = eventsData.filter(e => e.eventType === 'quiz_start').length;
    const completionRate = quizStarts > 0 
      ? Math.round((completedQuizzes.length / quizStarts) * 100) 
      : 0;
    
    // Find most popular unit
    const unitStats = eventsData
      .filter(e => e.eventType === 'quiz_complete')
      .reduce((acc, event) => {
        acc[event.unit] = (acc[event.unit] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    
    const mostPopularUnit = Object.entries(unitStats)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'None';
    
    setAnalytics({
      totalUsers: uniqueVisitors.size,
      activeToday: todayVisitors.length,
      averageScore,
      completionRate,
      mostPopularUnit,
      deviceBreakdown,
      topBrowsers
    });
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchData();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setError('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics (using processed analytics)
  const quizStarts = quizEvents?.filter(e => e.eventType === 'quiz_start').length || 0;
  const completedQuizzes = quizEvents?.filter(e => e.eventType === 'quiz_complete') || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <div className="flex gap-3">
              <button
                onClick={clearAllAnalyticsData}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                🗑️ Clear Data
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Users</h3>
                    <p className="text-4xl font-bold text-gray-900 mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{analytics.totalUsers}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Active today</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {analytics.activeToday}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Average Score</h3>
                    <p className="text-4xl font-bold text-gray-900 mt-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{analytics.averageScore}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-3 rounded-xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Completed quizzes</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {completedQuizzes.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Completion Rate</h3>
                    <p className="text-4xl font-bold text-gray-900 mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{analytics.completionRate}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Success ratio</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {completedQuizzes.length}/{quizStarts}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-5 rounded-xl border">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Devices</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Desktop</span>
                  <span className="font-medium">{analytics.deviceBreakdown.desktop}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Mobile</span>
                  <span className="font-medium">{analytics.deviceBreakdown.mobile}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tablet</span>
                  <span className="font-medium">{analytics.deviceBreakdown.tablet}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Unit</h3>
              <div className="flex items-center">
                <div className="bg-indigo-100 p-3 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{analytics.mostPopularUnit}</p>
                  <p className="text-xs text-gray-500">Most attempted unit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('visits')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'visits'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Visitor Data
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'quiz'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Quiz Events
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'insights'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Insights
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Device & Browser Breakdown */}
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">Device Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Desktop</span>
                      <span className="text-sm font-medium">{analytics.deviceBreakdown.desktop}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Mobile</span>
                      <span className="text-sm font-medium">{analytics.deviceBreakdown.mobile}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tablet</span>
                      <span className="text-sm font-medium">{analytics.deviceBreakdown.tablet}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">Browser Breakdown</h3>
                  <div className="space-y-2">
                    {analytics.topBrowsers.map((browser) => (
                      <div key={browser.name} className="flex justify-between">
                        <span className="text-sm text-gray-600">{browser.name}</span>
                        <span className="text-sm font-medium">{browser.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Users</span>
                    <span className="text-lg font-bold text-blue-600">{analytics.totalUsers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Today</span>
                    <span className="text-lg font-bold text-green-600">{analytics.activeToday}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Score</span>
                    <span className="text-lg font-bold text-purple-600">{analytics.averageScore}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completion Rate</span>
                    <span className="text-lg font-bold text-orange-600">{analytics.completionRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Device Usage Summary */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Device Usage Summary</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">Desktop</span>
                      <span className="text-sm font-semibold text-gray-800">{analytics.deviceBreakdown.desktop}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${analytics.totalUsers > 0 ? (analytics.deviceBreakdown.desktop / analytics.totalUsers) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      {analytics.totalUsers > 0 ? Math.round((analytics.deviceBreakdown.desktop / analytics.totalUsers) * 100) : 0}%
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">Mobile</span>
                      <span className="text-sm font-semibold text-gray-800">{analytics.deviceBreakdown.mobile}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${analytics.totalUsers > 0 ? (analytics.deviceBreakdown.mobile / analytics.totalUsers) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      {analytics.totalUsers > 0 ? Math.round((analytics.deviceBreakdown.mobile / analytics.totalUsers) * 100) : 0}%
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">Tablet</span>
                      <span className="text-sm font-semibold text-gray-800">{analytics.deviceBreakdown.tablet}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${analytics.totalUsers > 0 ? (analytics.deviceBreakdown.tablet / analytics.totalUsers) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      {analytics.totalUsers > 0 ? Math.round((analytics.deviceBreakdown.tablet / analytics.totalUsers) * 100) : 0}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Browser Usage Summary */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Browser Usage Summary</h3>
                <div className="space-y-4">
                  {analytics.topBrowsers.map((browser, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-600">{browser.name}</span>
                        <span className="text-sm font-semibold text-gray-800">{browser.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${analytics.totalUsers > 0 ? (browser.count / analytics.totalUsers) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 text-right">
                        {analytics.totalUsers > 0 ? Math.round((browser.count / analytics.totalUsers) * 100) : 0}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unit Performance */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Unit Performance</h3>
                <div className="space-y-3">
                  {(() => {
                    const unitStats = quizEvents
                      .filter(e => e.eventType === 'quiz_complete')
                      .reduce((acc, event) => {
                        if (!acc[event.unit]) {
                          acc[event.unit] = { count: 0, avgScore: 0, totalScore: 0 };
                        }
                        acc[event.unit].count++;
                        acc[event.unit].totalScore += event.score || 0;
                        acc[event.unit].avgScore = acc[event.unit].totalScore / acc[event.unit].count;
                        return acc;
                      }, {} as Record<string, { count: number; avgScore: number; totalScore: number }>);
                    
                    return Object.entries(unitStats).map(([unit, stats]) => (
                      <div key={unit} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">{unit}</div>
                          <div className="text-sm text-gray-500">{stats.count} attempts</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{stats.avgScore.toFixed(1)}%</div>
                          <div className="text-sm text-gray-500">avg score</div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visits' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Visitors & Quiz Stats</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visitor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Device & Browser
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quiz Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        When They First Visited
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {visits.map((visit, index) => {
                      // Get quiz events for this visitor
                      const visitorQuizEvents = quizEvents.filter(event => event.visitorId === visit.visitorId);
                      const startedQuizzes = visitorQuizEvents.filter(e => e.eventType === 'quiz_start').length;
                      const completedQuizzes = visitorQuizEvents.filter(e => e.eventType === 'quiz_complete');
                      const totalQuestionsSolved = completedQuizzes.reduce((sum, quiz) => sum + (quiz.totalQuestions || 0), 0);
                      const totalCorrectAnswers = completedQuizzes.reduce((sum, quiz) => sum + (quiz.correctAnswers || 0), 0);
                      const averageScore = completedQuizzes.length > 0 
                        ? Math.round(completedQuizzes.reduce((sum, quiz) => sum + (quiz.score || 0), 0) / completedQuizzes.length)
                        : 0;
                      
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold">{index + 1}</span>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  Visitor {index + 1}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ID: {visit.visitorId ? visit.visitorId.substring(0, 8) + '...' : 'N/A'}
                                </div>
                                {visit.location && (
                                  <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center text-blue-700">
                                      <span className="mr-1">📍</span>
                                      <span className="font-semibold text-sm">
                                        {visit.location.city || 'Unknown'}, {visit.location.country || 'Unknown'}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">
                                  {visit.deviceInfo?.deviceType?.toLowerCase() === 'mobile' ? '📱' :
                                   visit.deviceInfo?.deviceType?.toLowerCase() === 'tablet' ? '📱' :
                                   visit.deviceInfo?.deviceType?.toLowerCase() === 'desktop' ? '💻' : '🖥️'}
                                </span>
                                <div>
                                  <div className="font-bold text-lg text-gray-900">
                                    {getDeviceName(visit.userAgent, visit.deviceInfo)}
                                  </div>
                                  <div className="text-sm text-gray-600 font-medium">
                                    {getManufacturer(visit.userAgent, visit.deviceInfo)}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {visit.deviceInfo?.browser || 'Unknown Browser'} • {visit.deviceInfo?.os || 'Unknown OS'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {startedQuizzes} started
                                </span>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {completedQuizzes.length} completed
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {totalQuestionsSolved} questions solved
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {completedQuizzes.length > 0 ? (
                              <div className="text-sm">
                                <div className="flex items-center">
                                  <span className={`font-semibold ${
                                    averageScore >= 75 ? 'text-green-600' :
                                    averageScore >= 60 ? 'text-yellow-600' :
                                    averageScore >= 40 ? 'text-orange-600' : 'text-red-600'
                                  }`}>
                                    {averageScore}%
                                  </span>
                                  <span className="ml-2 text-xs text-gray-500">
                                    ({totalCorrectAnswers}/{totalQuestionsSolved})
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  avg score
                                </div>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500">
                                <div className="text-gray-400">No completed quizzes</div>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex flex-col">
                              <div className="font-medium text-gray-900">
                                {getRelativeTime(visit.firstVisit.toDate())}
                              </div>
                              <div className="text-xs text-gray-500">
                                {visit.firstVisit.toDate().toLocaleDateString()} at {visit.firstVisit.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">🎯 Quiz Activity Center</h2>
                
                {/* Live Quiz Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Total Quiz Attempts</p>
                        <p className="text-2xl font-bold">{quizEvents?.filter(e => e.eventType === 'quiz_start').length || 0}</p>
                      </div>
                      <div className="text-3xl opacity-80">🚀</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Completed Quizzes</p>
                        <p className="text-2xl font-bold">{quizEvents?.filter(e => e.eventType === 'quiz_complete').length || 0}</p>
                      </div>
                      <div className="text-3xl opacity-80">✅</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Average Score</p>
                        <p className="text-2xl font-bold">{calculateAverageScore()}%</p>
                      </div>
                      <div className="text-3xl opacity-80">📊</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">Success Rate</p>
                        <p className="text-2xl font-bold">{calculateSuccessRate()}%</p>
                      </div>
                      <div className="text-3xl opacity-80">🎯</div>
                    </div>
                  </div>
                </div>

                {/* Unit Performance Chart */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">📈 Unit Performance Analysis</h3>
                  <div className="space-y-3">
                    {getUnitPerformanceStats().map((stats) => {
                      const avgScore = stats.avgScore;
                      const completionRate = stats.completionRate;
                      
                      return (
                        <div key={stats.unit} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900">{stats.unit}</span>
                            <div className="flex space-x-2">
                              <span className="text-sm text-gray-600">{stats.attempts} attempts</span>
                              <span className="text-sm text-gray-600">{stats.completed} completed</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Avg Score</span>
                                <span className="font-medium">{avgScore}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    avgScore >= 75 ? 'bg-green-500' :
                                    avgScore >= 60 ? 'bg-yellow-500' :
                                    avgScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${avgScore}%` }}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Completion</span>
                                <span className="font-medium">{completionRate}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${completionRate}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Quiz Activity Feed */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4">🔥 Live Quiz Activity Feed</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {quizEvents?.slice(0, 20).map((event, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-shrink-0">
                          {event.eventType === 'quiz_start' ? (
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600">🚀</span>
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-green-600">✅</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {event.eventType === 'quiz_start' ? 'Started Quiz' : 'Completed Quiz'}
                            </p>
                            <span className="text-xs text-gray-500">
                              {getRelativeTime(event.timestamp.toDate())}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">{event.unit}</span>
                            {event.score && (
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                event.score >= 75 ? 'bg-green-100 text-green-800' :
                                event.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                event.score >= 40 ? 'bg-orange-100 text-orange-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {event.score}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
