import React, { useState } from 'react';

interface CostCategory {
  name: string;
  amount: number;
  percentage: number;
  benchmark: number;
  trend: 'up' | 'down' | 'stable';
  weeklyLoss?: number;
}

export default function SmartCostControl() {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');

  const weeklyRevenue = 18500;
  const monthlyRevenue = weeklyRevenue * 4.33;
  const revenue = period === 'weekly' ? weeklyRevenue : monthlyRevenue;

  const costs: CostCategory[] = [
    { name: 'Food & Beverage', amount: period === 'weekly' ? 6290 : 27235, percentage: 34, benchmark: 30, trend: 'up', weeklyLoss: 740 },
    { name: 'Labour', amount: period === 'weekly' ? 5180 : 22429, percentage: 28, benchmark: 28, trend: 'stable' },
    { name: 'Utilities', amount: period === 'weekly' ? 1295 : 5607, percentage: 7, benchmark: 5, trend: 'up', weeklyLoss: 370 },
    { name: 'Rent & Rates', amount: period === 'weekly' ? 2035 : 8812, percentage: 11, benchmark: 12, trend: 'stable' },
    { name: 'Marketing', amount: period === 'weekly' ? 370 : 1602, percentage: 2, benchmark: 3, trend: 'down' },
    { name: 'Supplies & Packaging', amount: period === 'weekly' ? 740 : 3204, percentage: 4, benchmark: 3, trend: 'up', weeklyLoss: 185 },
  ];

  const totalCostPct = costs.reduce((sum, c) => sum + c.percentage, 0);
  const totalWeeklyLoss = costs.reduce((sum, c) => sum + (c.weeklyLoss || 0), 0);
  const primeCost = costs.find(c => c.name === 'Food & Beverage')!.percentage + costs.find(c => c.name === 'Labour')!.percentage;

  const getStatusColor = (pct: number, benchmark: number) => {
    if (pct > benchmark + 3) return '#b91c1c';
    if (pct > benchmark) return '#d97706';
    return '#059669';
  };

  const getStatusLabel = (pct: number, benchmark: number) => {
    if (pct > benchmark + 3) return 'Above Target';
    if (pct > benchmark) return 'Watch';
    return 'On Target';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  const getTrendColor = (trend: string, pct: number, benchmark: number) => {
    if (trend === 'stable') return '#6b7280';
    if (trend === 'down') return '#10b981';
    return pct > benchmark ? '#ef4444' : '#10b981';
  };

  return (
    <>
      {/* Header */}
      <div className="rounded-2xl p-6 mb-8 text-white" style={{ background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #1a1a2e 100%)' }}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(16,185,129,0.2)' }}>
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Smart Cost Control Center</h1>
              <p className="text-emerald-200 text-sm mt-1">Real-time cost analysis vs UK hospitality benchmarks</p>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="text-center bg-white/10 rounded-xl px-5 py-3">
              <div className="text-2xl font-bold text-red-400">£{totalWeeklyLoss.toLocaleString()}</div>
              <div className="text-xs text-emerald-200">Weekly Overspend</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl px-5 py-3">
              <div className={`text-2xl font-bold ${primeCost <= 65 ? 'text-green-400' : 'text-red-400'}`}>{primeCost}%</div>
              <div className="text-xs text-emerald-200">Prime Cost (target ≤65%)</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl px-5 py-3">
              <div className="text-2xl font-bold text-white">{100 - totalCostPct}%</div>
              <div className="text-xs text-emerald-200">Net Profit Margin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Period Toggle */}
      <div className="flex gap-2 mb-6">
        {(['weekly', 'monthly'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className="px-5 py-2 rounded-xl font-medium text-sm transition-all capitalize"
            style={{
              backgroundColor: period === p ? '#059669' : 'var(--bg-secondary)',
              color: period === p ? 'white' : 'var(--text-muted)',
              border: '1px solid var(--border-color)',
            }}
          >
            {p === 'weekly' ? 'This Week' : 'This Month'}
          </button>
        ))}
      </div>

      {/* Alert Banner */}
      {totalWeeklyLoss > 0 && (
        <div className="rounded-2xl p-4 mb-6 border flex items-center gap-4" style={{ backgroundColor: '#1c0f0f', borderColor: '#4a1a1a' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#b91c1c30' }}>
            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-red-400">You are overspending by £{totalWeeklyLoss.toLocaleString()} this week</p>
            <p className="text-sm text-red-300/70">Food & Beverage and Utilities are above UK benchmarks. See breakdown below.</p>
          </div>
        </div>
      )}

      {/* Cost Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {costs.map((cost) => {
          const statusColor = getStatusColor(cost.percentage, cost.benchmark);
          const isOver = cost.percentage > cost.benchmark;
          return (
            <div
              key={cost.name}
              className="rounded-2xl p-5 border"
              style={{
                backgroundColor: isOver ? '#1c0f0f' : 'var(--bg-card)',
                borderColor: isOver ? '#4a1a1a' : 'var(--border-color)',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white">{cost.name}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    £{cost.amount.toLocaleString()} / {period === 'weekly' ? 'week' : 'month'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: statusColor }}>
                    {getStatusLabel(cost.percentage, cost.benchmark)}
                  </span>
                  <div className="mt-1 text-xs" style={{ color: getTrendColor(cost.trend, cost.percentage, cost.benchmark) }}>
                    {getTrendIcon(cost.trend)} {cost.trend}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white font-bold">{cost.percentage}% of revenue</span>
                  <span style={{ color: 'var(--text-muted)' }}>UK Benchmark: {cost.benchmark}%</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min((cost.percentage / 20) * 100, 100)}%`,
                      backgroundColor: statusColor,
                    }}
                  />
                </div>
                {/* Benchmark marker */}
                <div className="relative h-1 mt-1">
                  <div
                    className="absolute w-0.5 h-3 bg-white/40 -top-2"
                    style={{ left: `${Math.min((cost.benchmark / 20) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {cost.weeklyLoss && (
                <p className="text-xs mt-2 font-semibold" style={{ color: '#f87171' }}>
                  ⚠ Losing £{cost.weeklyLoss.toLocaleString()}/week above benchmark
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* UK Benchmarks Reference */}
      <div className="rounded-2xl p-6 border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <h3 className="font-bold text-white mb-4">UK Hospitality Benchmarks</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Food Cost', target: '28–35%', ideal: '30%' },
            { label: 'Labour Cost', target: '25–35%', ideal: '28%' },
            { label: 'Prime Cost', target: '≤65%', ideal: '58%' },
            { label: 'Net Profit', target: '10–15%', ideal: '12%' },
          ].map((b) => (
            <div key={b.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <div className="text-sm font-bold text-white mb-1">{b.label}</div>
              <div className="text-lg font-bold text-emerald-400">{b.ideal}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Target: {b.target}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}