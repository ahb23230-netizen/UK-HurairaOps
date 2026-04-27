import { useState } from 'react';


interface Branch {
  id: string;
  name: string;
  location: string;
  complianceRate: number;
  totalChecks: number;
  failedChecks: number;
  avgResponseTime: number;
  trend: 'up' | 'down' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
  lastInspection: string;
}

export default function MultiBranch() {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  // Sample data for demonstration
  const branches: Branch[] = [
    {
      id: '1',
      name: 'Branch A - Central London',
      location: 'London',
      complianceRate: 94.5,
      totalChecks: 156,
      failedChecks: 8,
      avgResponseTime: 2.3,
      trend: 'up',
      riskLevel: 'low',
      lastInspection: '2024-03-15'
    },
    {
      id: '2',
      name: 'Branch B - Manchester',
      location: 'Manchester',
      complianceRate: 87.2,
      totalChecks: 134,
      failedChecks: 17,
      avgResponseTime: 4.1,
      trend: 'down',
      riskLevel: 'medium',
      lastInspection: '2024-03-14'
    },
    {
      id: '3',
      name: 'Branch C - Birmingham',
      location: 'Birmingham',
      complianceRate: 91.8,
      totalChecks: 142,
      failedChecks: 12,
      avgResponseTime: 3.2,
      trend: 'stable',
      riskLevel: 'low',
      lastInspection: '2024-03-13'
    },
    {
      id: '4',
      name: 'Branch D - Leeds',
      location: 'Leeds',
      complianceRate: 76.3,
      totalChecks: 98,
      failedChecks: 23,
      avgResponseTime: 5.8,
      trend: 'down',
      riskLevel: 'high',
      lastInspection: '2024-03-12'
    },
    {
      id: '5',
      name: 'Branch E - Glasgow',
      location: 'Glasgow',
      complianceRate: 89.4,
      totalChecks: 118,
      failedChecks: 13,
      avgResponseTime: 3.8,
      trend: 'up',
      riskLevel: 'medium',
      lastInspection: '2024-03-11'
    }
  ];

  // Calculate rankings
  const sortedByCompliance = [...branches].sort((a, b) => b.complianceRate - a.complianceRate);
  const bestBranch = sortedByCompliance[0];
  const worstBranch = sortedByCompliance[sortedByCompliance.length - 1];
  const avgComplianceRate = branches.reduce((sum, b) => sum + b.complianceRate, 0) / branches.length;

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        );
    }
  };

  const getRiskBadge = (risk: 'low' | 'medium' | 'high') => {
    const styles = {
      low: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-red-100 text-red-700'
    };
    const labels = { low: 'Low Risk', medium: 'Medium Risk', high: 'High Risk' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[risk]}`}>
        {labels[risk]}
      </span>
    );
  };

  const getComplianceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const selectedBranchData = branches.find(b => b.id === selectedBranch);

  return (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Best Branch */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="text-sm font-medium opacity-90">أفضل فرع</span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{bestBranch.name.split(' - ')[0]}</h3>
          <p className="text-sm opacity-80 mb-3">{bestBranch.location}</p>
          <div className="text-4xl font-bold">{bestBranch.complianceRate}%</div>
          <p className="text-xs opacity-80 mt-1">Compliance Rate</p>
        </div>

        {/* Worst Branch */}
        <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm font-medium opacity-90">أسوأ فرع</span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{worstBranch.name.split(' - ')[0]}</h3>
          <p className="text-sm opacity-80 mb-3">{worstBranch.location}</p>
          <div className="text-4xl font-bold">{worstBranch.complianceRate}%</div>
          <p className="text-xs opacity-80 mt-1">Compliance Rate</p>
        </div>

        {/* Total Branches */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">إجمالي الفروع</span>
          </div>
          <div className="text-4xl font-bold text-gray-900">{branches.length}</div>
          <p className="text-sm text-gray-500 mt-1">Active Branches</p>
        </div>

        {/* Average Compliance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">متوسط الالتزام</span>
          </div>
          <div className={`text-4xl font-bold ${getComplianceColor(avgComplianceRate)}`}>
            {avgComplianceRate.toFixed(1)}%
          </div>
          <p className="text-sm text-gray-500 mt-1">Across All Branches</p>
        </div>
      </div>

      {/* Performance Comparison Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">مقارنة الأداء بين الفروع</h3>
        <div className="space-y-4">
          {sortedByCompliance.map((branch, index) => (
            <div key={branch.id} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-green-500 text-white' :
                    index === sortedByCompliance.length - 1 ? 'bg-red-500 text-white' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{branch.name}</p>
                    <p className="text-sm text-gray-500">{branch.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getRiskBadge(branch.riskLevel)}
                  <div className="flex items-center gap-1">
                    {getTrendIcon(branch.trend)}
                    <span className="text-sm font-medium text-gray-700">{branch.complianceRate}%</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    branch.complianceRate >= 90 ? 'bg-green-500' :
                    branch.complianceRate >= 80 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${branch.complianceRate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Branch Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Performers */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">🏆 Top Performers</h3>
          </div>
          <div className="space-y-3">
            {sortedByCompliance.slice(0, 3).map((branch, index) => (
              <div key={branch.id} className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{branch.name.split(' - ')[0]}</p>
                    <p className="text-xs text-gray-500">{branch.totalChecks} checks</p>
                  </div>
                </div>
                <span className="text-green-600 font-bold">{branch.complianceRate}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Attention */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">⚠️ Needs Attention</h3>
          </div>
          <div className="space-y-3">
            {sortedByCompliance.slice(-2).reverse().map((branch, index) => (
              <div key={branch.id} className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {branches.length - 1 + index - 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{branch.name.split(' - ')[0]}</p>
                    <p className="text-xs text-gray-500">{branch.failedChecks} failed checks</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-red-600 font-bold">{branch.complianceRate}%</span>
                  <p className="text-xs text-gray-500">{branch.avgResponseTime}h avg response</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Branch Details Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">📊 Detailed Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Branch</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Compliance Rate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Checks</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Failed</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Avg Response</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Risk Level</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Trend</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Inspection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {branches.map((branch) => (
                <tr key={branch.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{branch.name.split(' - ')[0]}</p>
                      <p className="text-sm text-gray-500">{branch.location}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${getComplianceColor(branch.complianceRate)}`}>
                      {branch.complianceRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{branch.totalChecks}</td>
                  <td className="px-6 py-4">
                    <span className={branch.failedChecks > 15 ? 'text-red-600 font-medium' : 'text-gray-700'}>
                      {branch.failedChecks}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{branch.avgResponseTime}h</td>
                  <td className="px-6 py-4">{getRiskBadge(branch.riskLevel)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {getTrendIcon(branch.trend)}
                      <span className="text-sm text-gray-600 capitalize">{branch.trend}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{branch.lastInspection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
