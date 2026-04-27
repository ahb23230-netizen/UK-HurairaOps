import { useState } from 'react';

import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Shield, Users, FileText } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  riskScore: number;
  trend: 'up' | 'down' | 'stable';
  complianceRate: number;
  lastIncident: string | null;
  totalTasks: number;
  completedTasks: number;
  cleaningScore: number;
  trainingDays: number;
  incidents: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

export default function StaffBehavior() {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [filter, setFilter] = useState<'all' | 'high-risk' | 'medium' | 'low'>('all');

  // Sample staff data
  const staffData: StaffMember[] = [
    {
      id: '1',
      name: 'Ahmed Hassan',
      role: 'Head Chef',
      avatar: 'AH',
      riskScore: 85,
      trend: 'up',
      complianceRate: 95,
      lastIncident: null,
      totalTasks: 120,
      completedTasks: 114,
      cleaningScore: 92,
      trainingDays: 15,
      incidents: 0,
      status: 'excellent'
    },
    {
      id: '2',
      name: 'Mohamed Ali',
      role: 'Kitchen Assistant',
      avatar: 'MA',
      riskScore: 72,
      trend: 'stable',
      complianceRate: 82,
      lastIncident: '2024-01-15',
      totalTasks: 85,
      completedTasks: 70,
      cleaningScore: 78,
      trainingDays: 8,
      incidents: 2,
      status: 'good'
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      role: 'Floor Manager',
      avatar: 'SJ',
      riskScore: 45,
      trend: 'down',
      complianceRate: 68,
      lastIncident: '2024-01-18',
      totalTasks: 95,
      completedTasks: 65,
      cleaningScore: 65,
      trainingDays: 5,
      incidents: 4,
      status: 'warning'
    },
    {
      id: '4',
      name: 'James Wilson',
      role: 'Sous Chef',
      avatar: 'JW',
      riskScore: 25,
      trend: 'down',
      complianceRate: 45,
      lastIncident: '2024-01-20',
      totalTasks: 100,
      completedTasks: 45,
      cleaningScore: 40,
      trainingDays: 3,
      incidents: 7,
      status: 'critical'
    },
    {
      id: '5',
      name: 'Fatima Ahmed',
      role: 'Server',
      avatar: 'FA',
      riskScore: 90,
      trend: 'up',
      complianceRate: 98,
      lastIncident: null,
      totalTasks: 150,
      completedTasks: 147,
      cleaningScore: 95,
      trainingDays: 12,
      incidents: 0,
      status: 'excellent'
    },
    {
      id: '6',
      name: 'Omar Khalid',
      role: 'Dishwasher',
      avatar: 'OK',
      riskScore: 55,
      trend: 'stable',
      complianceRate: 72,
      lastIncident: '2024-01-17',
      totalTasks: 80,
      completedTasks: 58,
      cleaningScore: 68,
      trainingDays: 6,
      incidents: 3,
      status: 'warning'
    }
  ];

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Excellent</span>;
      case 'good':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Good</span>;
      case 'warning':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Warning</span>;
      case 'critical':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Critical</span>;
      default:
        return null;
    }
  };

  const filteredStaff = staffData.filter(staff => {
    if (filter === 'all') return true;
    if (filter === 'high-risk') return staff.riskScore >= 70;
    if (filter === 'medium') return staff.riskScore >= 40 && staff.riskScore < 70;
    if (filter === 'low') return staff.riskScore < 40;
    return true;
  });

  const avgRiskScore = Math.round(staffData.reduce((acc, s) => acc + s.riskScore, 0) / staffData.length);
  const highRiskCount = staffData.filter(s => s.riskScore < 50).length;
  const avgCompliance = Math.round(staffData.reduce((acc, s) => acc + s.complianceRate, 0) / staffData.length);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <span className="w-4 h-4 text-gray-400">-</span>;
  };

  return (
    <>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Risk Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{avgRiskScore}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Team compliance health</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Staff</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{staffData.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Active team members</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">High Risk Staff</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{highRiskCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Requires attention</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg Compliance Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{avgCompliance}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Overall team performance</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Staff ({staffData.length})
        </button>
        <button
          onClick={() => setFilter('high-risk')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'high-risk' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          High Risk ({staffData.filter(s => s.riskScore >= 70).length})
        </button>
        <button
          onClick={() => setFilter('medium')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'medium' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Medium ({staffData.filter(s => s.riskScore >= 40 && s.riskScore < 70).length})
        </button>
        <button
          onClick={() => setFilter('low')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'low' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Low Risk ({staffData.filter(s => s.riskScore < 40).length})
        </button>
      </div>

      {/* Staff List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Staff Performance Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Monitor compliance and identify training needs</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cleaning</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incidents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                        {staff.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{staff.name}</p>
                        <p className="text-sm text-gray-500">{staff.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-lg font-bold text-sm ${getRiskColor(staff.riskScore)}`}>
                        {staff.riskScore}%
                      </span>
                      {getTrendIcon(staff.trend)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            staff.complianceRate >= 80 ? 'bg-green-500' :
                            staff.complianceRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${staff.complianceRate}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{staff.complianceRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            staff.cleaningScore >= 80 ? 'bg-green-500' :
                            staff.cleaningScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${staff.cleaningScore}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{staff.cleaningScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      staff.incidents === 0 ? 'bg-green-100 text-green-700' :
                      staff.incidents <= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {staff.incidents} incidents
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(staff.status)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedStaff(staff)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
                  {selectedStaff.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedStaff.name}</h3>
                  <p className="text-gray-500">{selectedStaff.role}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStaff(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {/* Risk Score Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Risk Score</h4>
                  {getStatusBadge(selectedStaff.status)}
                </div>
                <div className="flex items-end gap-4">
                  <span className={`text-5xl font-bold ${getRiskColor(selectedStaff.riskScore).split(' ')[0]}`}>
                    {selectedStaff.riskScore}%
                  </span>
                  <div className="flex items-center gap-1 mb-2">
                    {getTrendIcon(selectedStaff.trend)}
                    <span className="text-sm text-gray-500">
                      {selectedStaff.trend === 'up' ? 'Improving' :
                       selectedStaff.trend === 'down' ? 'Declining' : 'Stable'}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Based on {selectedStaff.totalTasks} assigned tasks, {selectedStaff.trainingDays} training days completed
                </p>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Compliance Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedStaff.complianceRate}%</p>
                  <p className="text-xs text-gray-500">{selectedStaff.completedTasks}/{selectedStaff.totalTasks} tasks completed</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Cleaning Score</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedStaff.cleaningScore}%</p>
                  <p className="text-xs text-gray-500">Based on cleaning tasks</p>
                </div>
              </div>

              {/* Incident History */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-gray-700">Incident History</span>
                </div>
                {selectedStaff.incidents === 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>No incidents recorded</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedStaff.lastIncident && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Last incident: {selectedStaff.lastIncident}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-gray-600">Total incidents: {selectedStaff.incidents}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Recommendations</span>
                </div>
                {selectedStaff.status === 'excellent' || selectedStaff.status === 'good' ? (
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Continue current performance - on track with compliance goals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Consider for leadership training opportunities</span>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span>Schedule immediate compliance training session</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span>Increase supervision during peak hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span>Review cleaning protocols with supervisor</span>
                    </li>
                  </ul>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors">
                  Generate Report
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-colors">
                  Schedule Training
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
