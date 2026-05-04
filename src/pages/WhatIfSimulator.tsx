import { useState } from 'react';
import { Link } from 'react-router-dom';


interface SimulationResult {
  category: string;
  impact: 'positive' | 'negative' | 'neutral';
  percentage: number;
  description: string;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  effects: {
    profit: number;
    compliance: number;
    workload: number;
    revenue: number;
    costs: number;
  };
}

const presetScenarios: Scenario[] = [
  {
    id: '1',
    name: 'Increase Prices by 10%',
    description: 'Raise menu prices across all items',
    icon: '📈',
    effects: { profit: 15, compliance: 0, workload: 5, revenue: 10, costs: 0 }
  },
  {
    id: '2',
    name: 'Hire New Staff Member',
    description: 'Add one full-time employee',
    icon: '👨‍💼',
    effects: { profit: -8, compliance: 10, workload: -20, revenue: 5, costs: 15 }
  },
  {
    id: '3',
    name: 'Reduce Food Waste by 20%',
    description: 'Implement better inventory management',
    icon: '♻️',
    effects: { profit: 12, compliance: 5, workload: 10, revenue: 0, costs: -10 }
  },
  {
    id: '4',
    name: 'Extend Operating Hours',
    description: 'Open 2 more hours daily',
    icon: '⏰',
    effects: { profit: 8, compliance: -5, workload: 25, revenue: 15, costs: 10 }
  },
  {
    id: '5',
    name: 'Launch New Menu Items',
    description: 'Add 5 seasonal dishes',
    icon: '🍽️',
    effects: { profit: 10, compliance: -3, workload: 15, revenue: 12, costs: 8 }
  },
  {
    id: '6',
    name: 'Invest in Training',
    description: 'Comprehensive staff training program',
    icon: '📚',
    effects: { profit: 5, compliance: 20, workload: 5, revenue: 3, costs: 5 }
  },
];

export default function WhatIfSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [customPriceChange, setCustomPriceChange] = useState(0);
  const [customStaffChange, setCustomStaffChange] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Current business metrics (simulated)
  const currentMetrics = {
    monthlyProfit: 8500,
    complianceScore: 78,
    workloadScore: 65,
    monthlyRevenue: 45000,
    monthlyCosts: 36500,
  };

  const runSimulation = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setIsSimulating(true);
    setShowResults(false);

    setTimeout(() => {
      setShowResults(true);
      setIsSimulating(false);
    }, 1500);
  };

  const runCustomSimulation = () => {
    setIsSimulating(true);
    setShowResults(false);

    setTimeout(() => {
      setShowResults(true);
      setIsSimulating(false);
    }, 2000);
  };

  const calculateImpact = (scenario: Scenario) => {
    const results: SimulationResult[] = [
      {
        category: 'Monthly Profit',
        impact: scenario.effects.profit > 0 ? 'positive' : scenario.effects.profit < 0 ? 'negative' : 'neutral',
        percentage: scenario.effects.profit,
        description: `Estimated ${Math.abs(scenario.effects.profit)}% ${scenario.effects.profit > 0 ? 'increase' : 'decrease'} in monthly profit`
      },
      {
        category: 'Compliance Score',
        impact: scenario.effects.compliance > 0 ? 'positive' : scenario.effects.compliance < 0 ? 'negative' : 'neutral',
        percentage: scenario.effects.compliance,
        description: `Expected ${Math.abs(scenario.effects.compliance)}% ${scenario.effects.compliance > 0 ? 'improvement' : 'decrease'} in compliance`
      },
      {
        category: 'Workload',
        impact: scenario.effects.workload > 0 ? 'negative' : scenario.effects.workload < 0 ? 'positive' : 'neutral',
        percentage: scenario.effects.workload,
        description: `Staff workload ${scenario.effects.workload > 0 ? 'increases' : 'decreases'} by ${Math.abs(scenario.effects.workload)}%`
      },
      {
        category: 'Monthly Revenue',
        impact: scenario.effects.revenue > 0 ? 'positive' : scenario.effects.revenue < 0 ? 'negative' : 'neutral',
        percentage: scenario.effects.revenue,
        description: `Projected ${Math.abs(scenario.effects.revenue)}% ${scenario.effects.revenue > 0 ? 'growth' : 'decline'} in revenue`
      },
      {
        category: 'Operating Costs',
        impact: scenario.effects.costs > 0 ? 'negative' : scenario.effects.costs < 0 ? 'positive' : 'neutral',
        percentage: scenario.effects.costs,
        description: `Costs ${scenario.effects.costs > 0 ? 'increase' : 'decrease'} by ${Math.abs(scenario.effects.costs)}%`
      },
    ];
    return results;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'negative': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return '📈';
      case 'negative': return '📉';
      default: return '➡️';
    }
  };

  const calculateNewValue = (current: number, percentage: number) => {
    return current * (1 + percentage / 100);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">What If Simulator</h1>
              <p className="text-gray-600">Test business decisions before implementing them</p>
            </div>
          </div>
        </div>

        {/* Current Metrics */}
      <div className="rounded-2xl p-6 mb-8 border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Your Current Business Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-gray-900">£{currentMetrics.monthlyProfit.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Monthly Profit</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-emerald-600">{currentMetrics.complianceScore}%</p>
              <p className="text-sm text-gray-500">Compliance Score</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-amber-600">{currentMetrics.workloadScore}%</p>
              <p className="text-sm text-gray-500">Workload Level</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-blue-600">£{currentMetrics.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Monthly Revenue</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-red-600">£{currentMetrics.monthlyCosts.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Operating Costs</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Scenarios */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Scenarios</h2>
              <p className="text-sm text-gray-500 mb-4">Select a common business decision to simulate</p>

              <div className="space-y-3">
                {presetScenarios.map(scenario => (
                  <button
                    key={scenario.id}
                    onClick={() => runSimulation(scenario)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedScenario?.id === scenario.id
                        ? 'border-purple-400 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{scenario.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{scenario.name}</p>
                        <p className="text-sm text-gray-500">{scenario.description}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Simulation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Custom Simulation</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Change (%)
                  </label>
                  <input
                    type="range"
                    min="-20"
                    max="30"
                    value={customPriceChange}
                    onChange={(e) => setCustomStaffChange(0)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>-20%</span>
                    <span className="font-semibold text-purple-600">{customPriceChange > 0 ? '+' : ''}{customPriceChange}%</span>
                    <span>+30%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Staff Change (+/- employees)
                  </label>
                  <input
                    type="range"
                    min="-5"
                    max="10"
                    value={customStaffChange}
                    onChange={(e) => setCustomPriceChange(0)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>-5</span>
                    <span className="font-semibold text-purple-600">{customStaffChange > 0 ? '+' : ''}{customStaffChange}</span>
                    <span>+10</span>
                  </div>
                </div>

                <button
                  onClick={runCustomSimulation}
                  disabled={customPriceChange === 0 && customStaffChange === 0}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSimulating ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Run Custom Simulation
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Simulation Results</h2>
                {selectedScenario && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {selectedScenario.icon} {selectedScenario.name}
                  </span>
                )}
              </div>

              {!showResults ? (
                <div className="text-center py-16 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <p className="font-medium text-gray-900 mb-1">Ready to Simulate</p>
                  <p className="text-sm">Select a scenario or create a custom simulation to see projected outcomes</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedScenario && calculateImpact(selectedScenario).map((result, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border-2 ${getImpactColor(result.impact)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getImpactIcon(result.impact)}</span>
                          <span className="font-semibold">{result.category}</span>
                        </div>
                        <span className={`text-lg font-bold ${
                          result.impact === 'positive' ? 'text-emerald-600' :
                          result.impact === 'negative' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {result.percentage > 0 ? '+' : ''}{result.percentage}%
                        </span>
                      </div>
                      <p className="text-sm opacity-80">{result.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Projected Metrics */}
            {showResults && selectedScenario && (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 mt-4 border border-purple-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Projected New Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Monthly Profit</span>
                    <span className="font-bold text-gray-900">
                      £{calculateNewValue(currentMetrics.monthlyProfit, selectedScenario.effects.profit).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Compliance Score</span>
                    <span className="font-bold text-gray-900">
                      {Math.min(100, Math.max(0, currentMetrics.complianceScore + selectedScenario.effects.compliance))}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Workload Level</span>
                    <span className="font-bold text-gray-900">
                      {Math.min(100, Math.max(0, currentMetrics.workloadScore + selectedScenario.effects.workload))}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Monthly Revenue</span>
                    <span className="font-bold text-gray-900">
                      £{calculateNewValue(currentMetrics.monthlyRevenue, selectedScenario.effects.revenue).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Operating Costs</span>
                    <span className="font-bold text-gray-900">
                      £{calculateNewValue(currentMetrics.monthlyCosts, selectedScenario.effects.costs).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
              <div className="flex gap-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-amber-800">Simulation Note</p>
                  <p className="text-sm text-amber-700 mt-1">
                    These projections are estimates based on industry averages. Actual results may vary depending on your specific circumstances and market conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
