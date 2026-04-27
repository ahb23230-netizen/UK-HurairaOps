import { useState } from 'react';


interface LeakItem {
  id: string;
  category: 'waste' | 'overstaffing' | 'weak-products' | 'energy' | 'inventory';
  title: string;
  description: string;
  potentialLoss: number;
  monthlyData: number[];
  priority: 'high' | 'medium' | 'low';
  recommendation: string;
}

export default function ProfitLeakDetector() {
  const [activeTab, setActiveTab] = useState<'overview' | 'waste' | 'staffing' | 'products' | 'energy'>('overview');

  const leakItems: LeakItem[] = [
    {
      id: '1',
      category: 'waste',
      title: 'Food Waste in Kitchen',
      description: 'Average 12% food waste per week, valued at £340',
      potentialLoss: 4080,
      monthlyData: [280, 310, 295, 340, 325, 340],
      priority: 'high',
      recommendation: 'Implement daily waste tracking and portion control training for kitchen staff'
    },
    {
      id: '2',
      category: 'waste',
      title: 'Overproduction',
      description: '15% of prepared items are thrown away daily',
      potentialLoss: 2160,
      monthlyData: [180, 195, 200, 180, 175, 180],
      priority: 'high',
      recommendation: 'Use demand forecasting to match production with expected orders'
    },
    {
      id: '3',
      category: 'overstaffing',
      title: 'Excess Staff Hours',
      description: '23 extra hours per week during slow periods',
      potentialLoss: 2640,
      monthlyData: [220, 240, 230, 220, 215, 220],
      priority: 'medium',
      recommendation: 'Implement flexible scheduling based on historical sales patterns'
    },
    {
      id: '4',
      category: 'weak-products',
      title: 'Low-Performing Menu Items',
      description: '7 menu items generate less than 2% of revenue',
      potentialLoss: 1440,
      monthlyData: [120, 130, 125, 120, 115, 120],
      priority: 'medium',
      recommendation: 'Consider removing or redesigning items with lowest contribution margin'
    },
    {
      id: '5',
      category: 'energy',
      title: 'High Energy Consumption',
      description: 'Energy costs 18% above industry average',
      potentialLoss: 1920,
      monthlyData: [160, 165, 170, 165, 160, 165],
      priority: 'medium',
      recommendation: 'Install smart thermostats and LED lighting with motion sensors'
    },
    {
      id: '6',
      category: 'inventory',
      title: 'Spoilage & Expiry',
      description: '£320 worth of ingredients expired last month',
      potentialLoss: 960,
      monthlyData: [80, 90, 85, 80, 75, 80],
      priority: 'medium',
      recommendation: 'Implement FIFO system and better storage organization'
    },
  ];

  const totalLeak = leakItems.reduce((sum, item) => sum + item.potentialLoss, 0);

  const categoryStats = {
    waste: { amount: 6240, count: 2, icon: '🗑️' },
    overstaffing: { amount: 2640, count: 1, icon: '👥' },
    'weak-products': { amount: 1440, count: 1, icon: '📉' },
    energy: { amount: 1920, count: 1, icon: '⚡' },
    inventory: { amount: 960, count: 1, icon: '📦' },
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'waste': return 'from-amber-500 to-orange-500';
      case 'overstaffing': return 'from-blue-500 to-cyan-500';
      case 'weak-products': return 'from-purple-500 to-pink-500';
      case 'energy': return 'from-yellow-500 to-green-500';
      case 'inventory': return 'from-teal-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredItems = activeTab === 'overview'
    ? leakItems
    : leakItems.filter(item => item.category === activeTab);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-3xl p-8 mb-8 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
              <div>
                <p className="text-red-100 text-sm font-medium">Annual Potential Loss</p>
                <p className="text-4xl font-bold">£{totalLeak.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-red-100 text-lg">
              We've identified {leakItems.length} areas where you could be losing money
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-white text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors">
              📊 Generate Report
            </button>
            <button className="px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors">
              🎯 Fix Now
            </button>
          </div>
        </div>
      </div>

      {/* Category Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {Object.entries(categoryStats).map(([category, stats]) => (
          <button
            key={category}
            onClick={() => setActiveTab(category as any)}
            className={`p-6 bg-white rounded-2xl shadow-sm border-2 transition-all hover:shadow-md ${
              activeTab === category
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <div className="text-3xl mb-3">{stats.icon}</div>
            <p className="text-gray-500 text-sm capitalize mb-1">{category.replace('-', ' ')}</p>
            <p className="text-2xl font-bold text-gray-900">£{stats.amount.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">{stats.count} issues found</p>
          </button>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8 flex overflow-x-auto">
        {['overview', 'waste', 'staffing', 'products', 'energy'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab === 'overview' ? '📋 All Leaks' :
             tab === 'waste' ? '🗑️ Waste' :
             tab === 'staffing' ? '👥 Staffing' :
             tab === 'products' ? '📉 Products' :
             '⚡ Energy'}
          </button>
        ))}
      </div>

      {/* Leak Items List */}
      <div className="space-y-6">
        {filteredItems.map((leak) => (
          <div key={leak.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left: Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-semibold px-3 py-1 rounded-full border ${getPriorityColor(leak.priority)}`}>
                      {leak.priority === 'high' ? '🔴 High' : leak.priority === 'medium' ? '🟡 Medium' : '🟢 Low'}
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600 capitalize">{leak.category.replace('-', ' ')}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Annual Loss</p>
                    <p className="text-3xl font-bold text-red-600">£{leak.potentialLoss.toLocaleString()}</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{leak.title}</h3>
                <p className="text-gray-600 mb-4">{leak.description}</p>

                {/* Recommendation Box */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <p className="text-sm font-semibold text-blue-700 mb-1">Recommendation</p>
                      <p className="text-blue-900">{leak.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Mini Chart */}
              <div className="lg:w-64">
                <p className="text-sm text-gray-500 mb-3">Monthly Trend (6 months)</p>
                <div className="flex items-end gap-2 h-24">
                  {leak.monthlyData.map((value, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className={`w-full bg-gradient-to-t ${getCategoryColor(leak.category)} rounded-t-sm`}
                        style={{ height: `${(value / Math.max(...leak.monthlyData)) * 80}px` }}
                      />
                      <span className="text-xs text-gray-400">£{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
              <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                🚀 Implement Fix
              </button>
              <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                📝 Add Notes
              </button>
              <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                ✅ Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold mb-1">Potential Annual Savings</h3>
            <p className="text-gray-400">If all issues are addressed</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-4xl font-bold text-green-400">£{totalLeak.toLocaleString()}</p>
            <p className="text-sm text-gray-400 mt-1">≈ £{Math.round(totalLeak / 12).toLocaleString()}/month</p>
          </div>
          <button className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors">
            🏆 Start Saving Now
          </button>
        </div>
      </div>
    </>
  );
}