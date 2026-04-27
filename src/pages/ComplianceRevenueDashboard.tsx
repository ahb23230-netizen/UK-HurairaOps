import { useState } from 'react';


export default function ComplianceRevenueDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'6m' | '12m' | '24m'>('12m');

  // Demo data showing correlation between compliance and revenue
  const complianceRevenueData = [
    { month: 'Jan', complianceScore: 72, revenue: 42500, profitMargin: 12.5 },
    { month: 'Feb', complianceScore: 75, revenue: 44800, profitMargin: 13.2 },
    { month: 'Mar', complianceScore: 78, revenue: 46200, profitMargin: 14.1 },
    { month: 'Apr', complianceScore: 82, revenue: 48900, profitMargin: 15.3 },
    { month: 'May', complianceScore: 85, revenue: 51200, profitMargin: 16.5 },
    { month: 'Jun', complianceScore: 88, revenue: 53800, profitMargin: 17.8 },
    { month: 'Jul', complianceScore: 90, revenue: 55100, profitMargin: 18.9 },
    { month: 'Aug', complianceScore: 91, revenue: 56300, profitMargin: 19.2 },
    { month: 'Sep', complianceScore: 89, revenue: 54900, profitMargin: 18.5 },
    { month: 'Oct', complianceScore: 92, revenue: 57800, profitMargin: 19.8 },
    { month: 'Nov', complianceScore: 93, revenue: 59200, profitMargin: 20.3 },
    { month: 'Dec', complianceScore: 94, revenue: 61500, profitMargin: 21.2 },
  ];

  const complianceTiers = [
    { tier: 'High Compliance (90%+)', count: 245, avgRevenue: 58420, avgMargin: 19.8, color: 'from-emerald-500 to-green-500' },
    { tier: 'Medium Compliance (70-89%)', count: 389, avgRevenue: 48200, avgMargin: 15.2, color: 'from-blue-500 to-cyan-500' },
    { tier: 'Low Compliance (<70%)', count: 166, avgRevenue: 41200, avgMargin: 11.8, color: 'from-red-500 to-orange-500' },
  ];

  const insights = [
    {
      icon: '📈',
      title: 'Revenue Correlation',
      value: '+24%',
      description: 'Average revenue increase for every 10% compliance improvement',
      positive: true
    },
    {
      icon: '💰',
      title: 'Profit Margin Boost',
      value: '+4.2%',
      description: 'Average margin increase when reaching 90% compliance',
      positive: true
    },
    {
      icon: '⏱️',
      title: 'ROI on Compliance',
      value: '1:3.8',
      description: 'For every £100 spent on compliance, save/lose £380',
      positive: true
    },
    {
      icon: '🎯',
      title: 'Break-Even Point',
      value: '78%',
      description: 'Compliance score where compliance starts paying for itself',
      positive: true
    },
  ];

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    return 'text-red-600 bg-red-100';
  };

  const maxRevenue = Math.max(...complianceRevenueData.map(d => d.revenue));
  const maxScore = Math.max(...complianceRevenueData.map(d => d.complianceScore));

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 mb-8 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-4xl">💎</span>
              </div>
              <div>
                <p className="text-purple-200 text-sm font-medium">Key Insight</p>
                <p className="text-4xl font-bold">Compliance Pays Off</p>
              </div>
            </div>
            <p className="text-purple-100 text-lg max-w-xl">
              Our data shows businesses with 90%+ compliance score earn <span className="font-bold text-white">42% more revenue</span> than those below 70%
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 bg-white/10 rounded-2xl p-6">
            <p className="text-purple-200 text-sm">Average Revenue Difference</p>
            <p className="text-5xl font-bold">£17,220</p>
            <p className="text-sm text-purple-200">per year per establishment</p>
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex justify-end mb-6">
        <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-100 flex gap-1">
          {(['6m', '12m', '24m'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-5 py-2 rounded-lg font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {period === '6m' ? '6 Months' : period === '12m' ? '12 Months' : '24 Months'}
            </button>
          ))}
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {insights.map((insight, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{insight.icon}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                insight.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {insight.positive ? '↑ Positive' : '↓ Warning'}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{insight.value}</p>
            <p className="text-sm font-semibold text-gray-700 mb-1">{insight.title}</p>
            <p className="text-sm text-gray-500">{insight.description}</p>
          </div>
        ))}
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Dual Axis Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Compliance Score vs Revenue Trend</h3>
          <div className="relative h-64">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400">
              <span>£62k</span>
              <span>£50k</span>
              <span>£40k</span>
            </div>

            {/* Chart area */}
            <div className="ml-10 h-full relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-b border-gray-100 w-full"></div>
                ))}
              </div>

              {/* Bars for revenue */}
              <div className="absolute bottom-0 left-0 right-0 h-3/4 flex items-end gap-1">
                {complianceRevenueData.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-sm transition-all hover:opacity-80 cursor-pointer"
                      style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                      title={`Revenue: £${data.revenue.toLocaleString()}`}
                    />
                    <div className="w-full bg-gradient-to-t from-pink-500 to-rose-500 rounded-t-sm opacity-50"
                      style={{ height: `${(data.complianceScore / 100) * 50}%` }}
                    />
                  </div>
                ))}
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 pt-2">
                {complianceRevenueData.map((data, idx) => (
                  <span key={idx} className="flex-1 text-center">{data.month}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-indigo-500 to-purple-500 rounded"></div>
              <span className="text-sm text-gray-600">Revenue (£)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-pink-500 to-rose-500 rounded opacity-50"></div>
              <span className="text-sm text-gray-600">Compliance %</span>
            </div>
          </div>
        </div>

        {/* Correlation Scatter Plot */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Compliance-Revenue Correlation</h3>
          <div className="relative h-64">
            {/* Y-axis label */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-400">
              Revenue (£)
            </div>

            <div className="absolute inset-0 flex">
              {/* Y-axis */}
              <div className="w-8 flex flex-col justify-between text-xs text-gray-400 pr-2">
                <span>£62k</span>
                <span>£50k</span>
                <span>£40k</span>
                <span>£40k</span>
              </div>

              {/* Plot area */}
              <div className="flex-1 relative border-l border-b border-gray-200">
                {/* Grid */}
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="border-r border-t border-gray-50"></div>
                  ))}
                </div>

                {/* Scatter points */}
                {complianceRevenueData.map((data, idx) => (
                  <div
                    key={idx}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-150 ${
                      data.complianceScore >= 90
                        ? 'bg-emerald-500 ring-2 ring-emerald-200'
                        : data.complianceScore >= 70
                        ? 'bg-blue-500 ring-2 ring-blue-200'
                        : 'bg-red-500 ring-2 ring-red-200'
                    }`}
                    style={{
                      left: `${((data.complianceScore - 70) / 30) * 100}%`,
                      bottom: `${((data.revenue - 40000) / 22000) * 100}%`
                    }}
                    title={`${data.month}: ${data.complianceScore}% compliance → £${data.revenue.toLocaleString()}`}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                      {data.month}: {data.complianceScore}% → £{data.revenue.toLocaleString()}
                    </div>
                  </div>
                ))}

                {/* Trend line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 opacity-50"
                  style={{ transform: 'rotate(-5deg)', transformOrigin: 'left bottom' }}
                />
              </div>
            </div>

            {/* X-axis */}
            <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-400">
              <span>70%</span>
              <span>80%</span>
              <span>90%</span>
              <span>100%</span>
            </div>
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-400">Compliance Score</p>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-sm text-gray-600">High (90%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Medium (70-89%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Low (&lt;70%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Tier Comparison */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue by Compliance Tier</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {complianceTiers.map((tier, idx) => (
            <div key={idx} className={`p-6 rounded-2xl bg-gradient-to-br ${tier.color} text-white`}>
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold">{tier.tier}</p>
                <span className="text-2xl">{
                  tier.tier.includes('High') ? '🏆' :
                  tier.tier.includes('Medium') ? '⭐' : '⚠️'
                }</span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-white/70">Number of Establishments</p>
                  <p className="text-2xl font-bold">{tier.count}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Average Annual Revenue</p>
                  <p className="text-3xl font-bold">£{tier.avgRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Average Profit Margin</p>
                  <p className="text-2xl font-bold">{tier.avgMargin}%</p>
                </div>
              </div>
              {idx === 0 && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm">✨ Best performing tier with highest margins</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">💰 Compliance ROI Calculator</h3>
            <p className="text-gray-400 mb-4">
              See how much your compliance investment pays back
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-1">Monthly Compliance Spend</p>
                <p className="text-2xl font-bold">£250</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-1">Annual Compliance Spend</p>
                <p className="text-2xl font-bold">£3,000</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-4">
                <p className="text-sm text-green-100 mb-1">Expected Annual Return</p>
                <p className="text-2xl font-bold">£11,400</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-4 mx-auto">
              <div>
                <p className="text-4xl font-bold">3.8x</p>
              </div>
            </div>
            <p className="text-lg font-semibold">Return on Investment</p>
            <p className="text-sm text-gray-400">For every £1 spent, get £3.80 back</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Ready to see how compliance can transform your business?
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
            📊 Generate Full Report
          </button>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors">
            🎯 Improve My Compliance
          </button>
        </div>
      </div>
    </>
  );
}