import { useState } from 'react';


interface RiskFactor {
  id: string;
  name: string;
  category: string;
  score: number; // 0-100, 100 is worst (highest risk)
  status: 'critical' | 'warning' | 'good';
  lastChecked: string;
  trend: 'up' | 'down' | 'stable';
  details: string;
}

interface ComplianceRecord {
  date: string;
  temperatureChecks: number;
  cleaningRecords: number;
  staffAttendance: number;
  incidentReports: number;
}

export default function AIRiskPredictor() {
  const [selectedPremise, setSelectedPremise] = useState<string>('all');
  const [analysisPeriod, setAnalysisPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  // Simulated compliance data for analysis
  const complianceRecords: ComplianceRecord[] = [
    { date: '2024-04-01', temperatureChecks: 2, cleaningRecords: 1, staffAttendance: 95, incidentReports: 0 },
    { date: '2024-04-02', temperatureChecks: 2, cleaningRecords: 1, staffAttendance: 90, incidentReports: 1 },
    { date: '2024-04-03', temperatureChecks: 1, cleaningRecords: 1, staffAttendance: 100, incidentReports: 0 },
    { date: '2024-04-04', temperatureChecks: 2, cleaningRecords: 0, staffAttendance: 85, incidentReports: 2 },
    { date: '2024-04-05', temperatureChecks: 2, cleaningRecords: 1, staffAttendance: 95, incidentReports: 0 },
    { date: '2024-04-06', temperatureChecks: 1, cleaningRecords: 1, staffAttendance: 90, incidentReports: 1 },
    { date: '2024-04-07', temperatureChecks: 2, cleaningRecords: 1, staffAttendance: 100, incidentReports: 0 },
  ];

  // Risk factors with simulated analysis
  const riskFactors: RiskFactor[] = [
    {
      id: '1',
      name: 'Temperature Log Compliance',
      category: 'Food Safety',
      score: 72,
      status: 'warning',
      lastChecked: '2 hours ago',
      trend: 'down',
      details: '2 instances of incomplete temperature logging in the past week. Fridge #3 showing inconsistent readings.'
    },
    {
      id: '2',
      name: 'Cleaning Schedule Adherence',
      category: 'Hygiene',
      score: 85,
      status: 'critical',
      lastChecked: '1 day ago',
      trend: 'up',
      details: 'Deep cleaning was skipped on April 4th. Sanitization records incomplete for prep area.'
    },
    {
      id: '3',
      name: 'Staff Training Status',
      category: 'HR',
      score: 45,
      status: 'good',
      lastChecked: '1 week ago',
      trend: 'stable',
      details: 'All food safety certifications up to date. 2 new staff need Level 2 training.'
    },
    {
      id: '4',
      name: 'Pest Control Records',
      category: 'Environmental',
      score: 60,
      status: 'warning',
      lastChecked: '2 weeks ago',
      trend: 'stable',
      details: 'Last pest control visit was 14 days ago. No signs of infestation detected.'
    },
    {
      id: '5',
      name: 'Allergen Information Updated',
      category: 'Customer Safety',
      score: 90,
      status: 'good',
      lastChecked: '3 days ago',
      trend: 'up',
      details: 'Allergen matrix reviewed and updated. 2 menu items changed ingredients.'
    },
    {
      id: '6',
      name: 'Staff Attendance Pattern',
      category: 'HR',
      score: 68,
      status: 'warning',
      lastChecked: 'Today',
      trend: 'down',
      details: 'High turnover rate this month. Understaffing risk during peak hours.'
    },
    {
      id: '7',
      name: 'Equipment Maintenance',
      category: 'Infrastructure',
      score: 55,
      status: 'warning',
      lastChecked: '1 month ago',
      trend: 'stable',
      details: 'Walk-in freezer compressor showing age. HVAC filter due for replacement.'
    },
    {
      id: '8',
      name: 'Waste Management',
      category: 'Environmental',
      score: 30,
      status: 'good',
      lastChecked: '1 week ago',
      trend: 'up',
      details: 'Excellent waste segregation. Cross-contamination protocols followed.'
    },
  ];

  // Calculate overall risk score
  const calculateOverallRisk = () => {
    const totalScore = riskFactors.reduce((sum, factor) => sum + factor.score, 0);
    return Math.round(totalScore / riskFactors.length);
  };

  const overallRisk = calculateOverallRisk();

  const getRiskLevel = (score: number) => {
    if (score >= 75) return { label: 'HIGH RISK', color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50' };
    if (score >= 50) return { label: 'MODERATE RISK', color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    return { label: 'LOW RISK', color: 'bg-green-500', textColor: 'text-green-600', bgColor: 'bg-green-50' };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'good': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-red-600';
      case 'down': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  // Generate AI prediction based on risk factors
  const generatePrediction = () => {
    if (overallRisk >= 75) {
      return {
        title: 'HIGH PROBABILITY OF INSPECTION FAILURE',
        percentage: Math.min(95, overallRisk + 15),
        message: 'Multiple critical risk factors detected. Immediate action recommended before next inspection.',
        priority: 'critical'
      };
    } else if (overallRisk >= 50) {
      return {
        title: 'MODERATE INSPECTION RISK',
        percentage: overallRisk + 10,
        message: 'Several areas need improvement. Focus on flagged risk factors to reduce inspection risk.',
        priority: 'warning'
      };
    } else {
      return {
        title: 'LOW INSPECTION RISK',
        percentage: Math.max(15, overallRisk - 5),
        message: 'Compliance status is good. Maintain current practices and address minor issues.',
        priority: 'good'
      };
    }
  };

  const prediction = generatePrediction();
  const riskLevel = getRiskLevel(overallRisk);

  // Get critical issues that need immediate attention
  const criticalIssues = riskFactors.filter(f => f.status === 'critical' || f.status === 'warning').slice(0, 3);

  return (
    <>
      {/* Overall Risk Assessment Banner */}
      <div className={`mb-8 rounded-2xl p-6 ${prediction.priority === 'critical' ? 'bg-gradient-to-r from-red-500 to-orange-500' : prediction.priority === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'} text-white`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.3)" strokeWidth="8" fill="none" />
                <circle
                  cx="48" cy="48" r="40"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(100 - overallRisk) * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold">{overallRisk}%</span>
                <span className="text-xs opacity-80">Risk Score</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">AI Risk Assessment</h2>
              <p className="text-white/80">Based on {riskFactors.length} compliance factors analyzed</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="text-5xl font-bold mb-2">{prediction.percentage}%</div>
            <div className="text-xl font-semibold mb-1">{prediction.title}</div>
            <p className="text-white/80 text-sm">{prediction.message}</p>
          </div>
        </div>
      </div>

      {/* Critical Issues Alert */}
      {criticalIssues.length > 0 && (
        <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-800 mb-2">Critical Risk Factors Requiring Immediate Attention</h3>
              <div className="space-y-3">
                {criticalIssues.map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)}`}>
                        {issue.status.toUpperCase()}
                      </span>
                      <span className="ml-2 font-medium text-gray-900">{issue.name}</span>
                    </div>
                    <span className={`text-sm font-semibold ${getTrendColor(issue.trend)}`}>
                      {getTrendIcon(issue.trend)} {issue.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Risk Factors Grid */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Risk Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskFactors.map((factor) => (
            <div key={factor.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(factor.status)}`}>
                    {factor.status.toUpperCase()}
                  </span>
                  <h4 className="font-semibold text-gray-900 mt-2">{factor.name}</h4>
                  <span className="text-xs text-gray-500">{factor.category}</span>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getTrendColor(factor.trend)}`}>
                    {factor.score}%
                  </div>
                  <span className={`text-xs ${getTrendColor(factor.trend)}`}>
                    {getTrendIcon(factor.trend)} Risk
                  </span>
                </div>
              </div>

              {/* Risk Score Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full ${factor.score >= 75 ? 'bg-red-500' : factor.score >= 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${factor.score}%` }}
                />
              </div>

              <p className="text-sm text-gray-600 mb-3">{factor.details}</p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Last checked: {factor.lastChecked}</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">AI Recommendations</h3>
              <p className="text-sm text-gray-600">Based on predictive analysis of your compliance data</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold">1</span>
                <h4 className="font-semibold text-gray-900">Complete Temperature Logs</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">2 temperature checks missed this week. This is a critical EHO violation indicator.</p>
              <button className="w-full py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                Fix Now
              </button>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 font-bold">2</span>
                <h4 className="font-semibold text-gray-900">Schedule Deep Cleaning</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Cleaning records incomplete for April 4th. Schedule deep clean before next inspection.</p>
              <button className="w-full py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors">
                Schedule
              </button>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">3</span>
                <h4 className="font-semibold text-gray-900">Staff Training</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">2 new staff need Level 2 Food Safety certification. Book training sessions.</p>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Book Training
              </button>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">4</span>
                <h4 className="font-semibold text-gray-900">Pest Control Visit</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Schedule routine pest control visit. Last visit was 14 days ago.</p>
              <button className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                Schedule Visit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Trend */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Risk Trend Analysis</h3>
            <p className="text-sm text-gray-500">Historical risk score over time</p>
          </div>
          <div className="flex gap-2">
            {(['week', 'month', 'quarter'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setAnalysisPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  analysisPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period === 'week' ? 'Week' : period === 'month' ? 'Month' : 'Quarter'}
              </button>
            ))}
          </div>
        </div>

        {/* Simple trend visualization */}
        <div className="flex items-end justify-between h-40 gap-2">
          {[
            { day: 'Mon', score: 45 },
            { day: 'Tue', score: 52 },
            { day: 'Wed', score: 48 },
            { day: 'Thu', score: 55 },
            { day: 'Fri', score: 62 },
            { day: 'Sat', score: 58 },
            { day: 'Sun', score: overallRisk },
          ].map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full rounded-t-lg ${
                  item.score >= 75 ? 'bg-red-500' : item.score >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ height: `${item.score}%` }}
              />
              <span className="text-xs text-gray-500 mt-2">{item.day}</span>
              <span className="text-xs font-medium text-gray-700">{item.score}%</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Low Risk (0-49%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-sm text-gray-600">Moderate (50-74%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">High Risk (75%+)</span>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full font-medium ${
            overallRisk >= 75 ? 'bg-red-100 text-red-700' : overallRisk >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
          }`}>
            Current: {overallRisk}% {overallRisk >= 75 ? '⚠️ HIGH RISK' : overallRisk >= 50 ? '⚡ MODERATE' : '✓ GOOD'}
          </div>
        </div>
      </div>
    </>
  );
}
