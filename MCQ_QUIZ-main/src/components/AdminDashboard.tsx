import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, Timestamp } from 'firebase/firestore';
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
    platform: string;
    vendor: string;
    screenResolution: string;
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
  sessionId: string;
}

export const AdminDashboard = () => {
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [quizEvents, setQuizEvents] = useState<QuizEventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'visits' | 'quiz' | 'insights'>('overview');

  // Advanced analytics state
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    newUsersToday: 0,
    returningUsers: 0,
    averageScore: 0,
    totalQuizTime: 0,
    peakUsageHour: 0,
    completionRate: 0,
    mostPopularUnit: '',
    averageQuestionsPerSession: 0,
    deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 },
    browserBreakdown: {} as Record<string, number>,
    locationBreakdown: {} as Record<string, number>,
    dailyActivity: [] as { date: string; visits: number; quizzes: number }[],
    hourlyActivity: [] as { hour: number; activity: number }[]
  });

  // Simple password check (in production, use more secure authentication)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const ADMIN_PASSWORD = 'Carino16'; // Change this to a secure password

  // Advanced analytics processing function
  const processAnalytics = (visitsData: VisitData[], eventsData: QuizEventData[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const uniqueVisitors = new Set(visitsData.map(v => v.visitorId));
    const todayVisitors = new Set(
      visitsData
        .filter(v => v.firstVisit.toDate() >= today)
        .map(v => v.visitorId)
    );
    
    const completedQuizzes = eventsData.filter(e => e.eventType === 'quiz_complete');
    const averageScore = completedQuizzes.length > 0
      ? completedQuizzes.reduce((sum, q) => sum + (q.score || 0), 0) / completedQuizzes.length
      : 0;
    
    // Device detection
    const deviceBreakdown = { desktop: 0, mobile: 0, tablet: 0 };
    const browserBreakdown: Record<string, number> = {};
    const locationBreakdown: Record<string, number> = {};
    
    visitsData.forEach(visit => {
      const ua = visit.userAgent.toLowerCase();
      if (ua.includes('mobile')) deviceBreakdown.mobile++;
      else if (ua.includes('tablet')) deviceBreakdown.tablet++;
      else deviceBreakdown.desktop++;
      
      // Browser detection
      if (ua.includes('chrome')) browserBreakdown.Chrome = (browserBreakdown.Chrome || 0) + 1;
      else if (ua.includes('firefox')) browserBreakdown.Firefox = (browserBreakdown.Firefox || 0) + 1;
      else if (ua.includes('safari')) browserBreakdown.Safari = (browserBreakdown.Safari || 0) + 1;
      else if (ua.includes('edge')) browserBreakdown.Edge = (browserBreakdown.Edge || 0) + 1;
      
      // Location breakdown
      if (visit.location && visit.location.country) {
        const locationKey = visit.location.city ? `${visit.location.city}, ${visit.location.country}` : visit.location.country;
        locationBreakdown[locationKey] = (locationBreakdown[locationKey] || 0) + 1;
      } else {
        locationBreakdown['Unknown'] = (locationBreakdown['Unknown'] || 0) + 1;
      }
    });
    
    // Hourly activity analysis
    const hourlyActivity = Array.from({ length: 24 }, (_, i) => ({ hour: i, activity: 0 }));
    eventsData.forEach(event => {
      const hour = event.timestamp.toDate().getHours();
      hourlyActivity[hour].activity++;
    });
    
    const peakUsageHour = hourlyActivity.reduce((max, curr) => 
      curr.activity > max.activity ? curr : max
    ).hour;
    
    // Daily activity (last 7 days)
    const dailyActivity = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const dayVisits = visitsData.filter(v => 
        v.firstVisit.toDate() >= date && v.firstVisit.toDate() < nextDate
      ).length;
      
      const dayQuizzes = eventsData.filter(e => 
        e.timestamp.toDate() >= date && e.timestamp.toDate() < nextDate
      ).length;
      
      return {
        date: date.toLocaleDateString(),
        visits: dayVisits,
        quizzes: dayQuizzes
      };
    }).reverse();
    
    // Unit popularity
    const unitStats = eventsData
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
    
    const mostPopularUnit = Object.entries(unitStats)
      .sort(([, a], [, b]) => b.count - a.count)[0]?.[0] || '';
    
    const completionRate = eventsData.length > 0
      ? (completedQuizzes.length / eventsData.filter(e => e.eventType === 'quiz_start').length) * 100
      : 0;
    
    setAnalytics({
      totalUsers: uniqueVisitors.size,
      newUsersToday: todayVisitors.size,
      returningUsers: uniqueVisitors.size - todayVisitors.size,
      averageScore: Math.round(averageScore),
      totalQuizTime: 0, // Would need session duration tracking
      peakUsageHour,
      completionRate: Math.round(completionRate),
      mostPopularUnit,
      averageQuestionsPerSession: completedQuizzes.length > 0
        ? completedQuizzes.reduce((sum, q) => sum + (q.totalQuestions || 0), 0) / completedQuizzes.length
        : 0,
      deviceBreakdown,
      browserBreakdown,
      locationBreakdown,
      dailyActivity,
      hourlyActivity
    });
  };

  useEffect(() => {
    if (!isAuthenticated) return;

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
        const eventsData = eventsSnapshot.docs.map((doc: any) => doc.data() as QuizEventData);
        setQuizEvents(eventsData);

        // Process advanced analytics
        processAnalytics(visitsData, eventsData);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch analytics data');
        setLoading(false);
        console.error('Error fetching analytics:', err);
      }
    };

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
  const quizCompletions = quizEvents.filter(e => e.eventType === 'quiz_complete').length;
  
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-600">Total Users</h3>
              <p className="text-2xl font-bold text-blue-900">{analytics.totalUsers}</p>
              <p className="text-xs text-blue-500 mt-1">+{analytics.newUsersToday} today</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-600">Avg Score</h3>
              <p className="text-2xl font-bold text-green-900">{analytics.averageScore}%</p>
              <p className="text-xs text-green-500 mt-1">Across all units</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-600">Completion Rate</h3>
              <p className="text-2xl font-bold text-purple-900">{analytics.completionRate}%</p>
              <p className="text-xs text-purple-500 mt-1">{quizCompletions} completed</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-orange-600">Peak Hour</h3>
              <p className="text-2xl font-bold text-orange-900">{analytics.peakUsageHour}:00</p>
              <p className="text-xs text-orange-500 mt-1">Most active time</p>
            </div>
          </div>

          {/* Additional Insights Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-indigo-600">Most Popular Unit</h3>
              <p className="text-xl font-bold text-indigo-900">{analytics.mostPopularUnit || 'N/A'}</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-teal-600">Returning Users</h3>
              <p className="text-xl font-bold text-teal-900">{analytics.returningUsers}</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-pink-600">Avg Questions/Session</h3>
              <p className="text-xl font-bold text-pink-900">{Math.round(analytics.averageQuestionsPerSession)}</p>
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
              {/* Daily Activity Chart */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Daily Activity (Last 7 Days)</h3>
                <div className="space-y-2">
                  {analytics.dailyActivity.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{day.date}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">{day.visits} visits</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">{day.quizzes} quizzes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
                    {Object.entries(analytics.browserBreakdown).map(([browser, count]) => (
                      <div key={browser} className="flex justify-between">
                        <span className="text-sm text-gray-600">{browser}</span>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Peak Usage Hours */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Peak Usage Hours</h3>
                <div className="grid grid-cols-6 gap-2">
                  {analytics.hourlyActivity.map((hour) => (
                    <div
                      key={hour.hour}
                      className="text-center"
                      title={`${hour.hour}:00 - ${hour.activity} activities`}
                    >
                      <div
                        className="h-16 bg-blue-500 rounded-t"
                        style={{
                          height: `${Math.max(16, (hour.activity / Math.max(...analytics.hourlyActivity.map(h => h.activity))) * 64)}px`
                        }}
                      ></div>
                      <div className="text-xs text-gray-500 mt-1">{hour.hour}h</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Breakdown */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">User Location Breakdown</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.locationBreakdown)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 10)
                    .map(([location, count]) => (
                      <div key={location} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">{location}</div>
                          <div className="text-sm text-gray-500">{count} visitors</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{Math.round((count / analytics.totalUsers) * 100)}%</div>
                          <div className="text-sm text-gray-500">of total</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Unit Performance */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Unit Performance</h3>
                <div className="space-y-3">
                  {Object.entries(unitStats).map(([unit, stats]) => (
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
                  ))}
                </div>
              </div>

              {/* User Engagement Metrics */}
              <div className="bg-white p-6 rounded-lg border lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4">User Engagement Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">{analytics.newUsersToday}</div>
                    <div className="text-sm text-blue-500">New Users Today</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">{analytics.returningUsers}</div>
                    <div className="text-sm text-green-500">Returning Users</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded">
                    <div className="text-2xl font-bold text-purple-600">{Math.round(analytics.averageQuestionsPerSession)}</div>
                    <div className="text-sm text-purple-500">Avg Questions/Session</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visits' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Visitors</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visitor ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Device
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Browser & OS
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Screen
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        First Visit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {visits.map((visit, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {visit.visitorId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <div className="font-medium capitalize">{visit.deviceInfo?.deviceType || 'Unknown'}</div>
                            <div className="text-xs text-gray-400">{visit.deviceInfo?.deviceName || 'Unknown Device'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <div className="font-medium">{visit.deviceInfo?.browser || 'Unknown'}</div>
                            <div className="text-xs text-gray-400">{visit.deviceInfo?.os || 'Unknown OS'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {visit.deviceInfo?.screenResolution || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {visit.location ? 
                            `${visit.location.city}, ${visit.location.country}` : 
                            'Unknown'
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {visit.location?.ip || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {visit.firstVisit.toDate().toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Quiz Statistics by Unit</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {Object.entries(unitStats).map(([unit, stats]) => (
                  <div key={unit} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{unit}</h3>
                    <p className="text-sm text-gray-600">Completions: {stats.count}</p>
                    <p className="text-sm text-gray-600">Avg Score: {stats.avgScore.toFixed(1)}%</p>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-semibold mb-4">Recent Quiz Events</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quizEvents.map((event, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            event.eventType === 'quiz_start'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {event.eventType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.score ? `${event.score}%` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.timestamp.toDate().toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
