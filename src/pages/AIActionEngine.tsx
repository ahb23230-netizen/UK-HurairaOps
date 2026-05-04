import React, { useState } from 'react';

interface Action {
  id: string;
  category: 'pricing' | 'supplier' | 'staff' | 'compliance';
  priority: 'critical' | 'high' | 'medium';
  title: string;
  description: string;
  impact: string;
  impactValue: number;
  impactType: 'gain' | 'save';
  timeframe: string;
  applied: boolean;
}

export default function AIActionEngine() {
  const [filter, setFilter] = useState<'all' | 'pricing' | 'supplier' | 'staff' | 'compliance'>('all');
  const [actions, setActions] = useState<Action[]>([
    { id: '1', category: 'pricing', priority: 'critical', title: 'Raise Chicken Wrap price by £0.70', description: 'Your Chicken Wrap is priced £0.70 below market average. 847 units sold last month — you are leaving money on the table.', impact: '+£592', impactValue: 592, impactType: 'gain', timeframe: 'per month', applied: false },
    { id: '2', category: 'supplier', priority: 'critical', title: 'Switch beef supplier — 23% above market', description: 'Fresh Foods Ltd charges £4.20/kg for beef mince vs market rate £3.40/kg. Switch to Green Valley Produce immediately.', impact: '-£340', impactValue: 340, impactType: 'save', timeframe: 'per month', applied: false },
    { id: '3', category: 'staff', priority: 'high', title: 'Reduce Tuesday 2PM–5PM staff by 1', description: 'Tuesday afternoon footfall is 34% below weekly average but you are running full staff. Adjust rota to save labour costs.', impact: '-£280', impactValue: 280, impactType: 'save', timeframe: 'per month', applied: false },
    { id: '4', category: 'compliance', priority: 'critical', title: 'Log fridge temperature check — overdue 6 hours', description: 'Your SFBB diary has a 6-hour gap in temperature logging. An EHO visit during this gap is a critical fail. Log now.', impact: 'Avoid £5,000', impactValue: 5000, impactType: 'save', timeframe: 'potential fine', applied: false },
    { id: '5', category: 'pricing', priority: 'high', title: 'Remove "Soup of the Day" — lowest margin item', description: 'Soup of the Day generates only 12% margin vs your 68% menu average. It is also your slowest-moving item.', impact: '+£180', impactValue: 180, impactType: 'gain', timeframe: 'per month', applied: false },
    { id: '6', category: 'supplier', priority: 'high', title: 'Negotiate dairy contract — renewal due in 7 days', description: 'Your dairy contract expires in 7 days. Current market rate is 8% lower — renegotiate before auto-renewal.', impact: '-£190', impactValue: 190, impactType: 'save', timeframe: 'per month', applied: false },
    { id: '7', category: 'staff', priority: 'medium', title: 'Schedule allergen awareness training — 18 days overdue', description: '3 team members have overdue allergen training. Legal requirement under UK Food Safety Act 1990.', impact: 'Avoid £2,500', impactValue: 2500, impactType: 'save', timeframe: 'potential fine', applied: false },
    { id: '8', category: 'compliance', priority: 'high', title: 'Renew Public Liability Insurance — expires in 12 days', description: 'Your public liability insurance expires in 12 days. Operating without cover is illegal under UK law.', impact: 'Avoid closure', impactValue: 0, impactType: 'save', timeframe: 'legal risk', applied: false },
  ]);

  const applyAction = (id: string) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, applied: true } : a));
  };

  const filteredActions = filter === 'all' ? actions : actions.filter(a => a.category === filter);
  const totalPotential = actions.filter(a => !a.applied && a.impactValue < 1000).reduce((sum, a) => sum + a.impactValue, 0);
  const criticalCount = actions.filter(a => a.priority === 'critical' && !a.applied).length;
  const appliedCount = actions.filter(a => a.applied).length;

  const getPriorityStyle = (priority: string) => {
    if (priority === 'critical') return { bg: '#3a0f0f', border: '#7f1d1d', badge: '#ef4444', badgeText: 'CRITICAL' };
    if (priority === 'high') return { bg: '#2a1f0a', border: '#78350f', badge: '#f59e0b', badgeText: 'HIGH' };
    return { bg: '#0f1f2a', border: '#1e3a5f', badge: '#3b82f6', badgeText: 'MEDIUM' };
  };

  const getCategoryColor = (category: string) => {
    if (category === 'pricing') return '#10b981';
    if (category === 'supplier') return '#f59e0b';
    if (category === 'staff') return '#8b5cf6';
    return '#ef4444';
  };

  const getCategoryIcon = (category: string) => {
    if (category === 'pricing') return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    if (category === 'supplier') return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
    if (category === 'staff') return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
  };

  return (
    <>
      {/* Header */}
      <div className="rounded-2xl p-6 mb-8 text-white" style={{ background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #0f2027 100%)' }}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(139,92,246,0.3)' }}>
              <svg className="w-8 h-8 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Action Engine</h1>
              <p className="text-purple-200 text-sm mt-1">Your AI Operator — tells you exactly what to do, right now</p>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="text-center bg-white/10 rounded-xl px-5 py-3">
              <div className="text-2xl font-bold text-red-400">{criticalCount}</div>
              <div className="text-xs text-purple-200">Critical Actions</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl px-5 py-3">
              <div className="text-2xl font-bold text-green-400">£{totalPotential.toLocaleString()}</div>
              <div className="text-xs text-purple-200">Potential This Month</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl px-5 py-3">
              <div className="text-2xl font-bold text-purple-300">{appliedCount}</div>
              <div className="text-xs text-purple-200">Applied Today</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['all', 'pricing', 'supplier', 'staff', 'compliance'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-xl font-medium text-sm transition-all"
            style={{
              backgroundColor: filter === f ? getCategoryColor(f === 'all' ? 'staff' : f) : 'var(--bg-secondary)',
              color: filter === f ? 'white' : 'var(--text-muted)',
              border: '1px solid var(--border-color)',
            }}
          >
            {f === 'all' ? 'All Actions' : f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== 'all' && <span className="ml-1 opacity-70 text-xs">({actions.filter(a => a.category === f && !a.applied).length})</span>}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="space-y-4">
        {filteredActions.map((action) => {
          const style = getPriorityStyle(action.priority);
          return (
            <div key={action.id} className="rounded-2xl p-5 border transition-all" style={{ backgroundColor: action.applied ? 'var(--bg-secondary)' : style.bg, borderColor: action.applied ? 'var(--border-color)' : style.border, opacity: action.applied ? 0.6 : 1 }}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${getCategoryColor(action.category)}20`, color: getCategoryColor(action.category) }}>
                  {getCategoryIcon(action.category)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {!action.applied && <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: style.badge }}>{style.badgeText}</span>}
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full capitalize" style={{ backgroundColor: `${getCategoryColor(action.category)}20`, color: getCategoryColor(action.category) }}>{action.category}</span>
                    {action.applied && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-900 text-green-400">✅ APPLIED</span>}
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">{action.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{action.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0 min-w-[120px]">
                  <div className="text-right">
                    <div className="text-xl font-bold" style={{ color: action.impactType === 'gain' ? '#10b981' : '#f59e0b' }}>{action.impact}</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{action.timeframe}</div>
                  </div>
                  {!action.applied ? (
                    <button onClick={() => applyAction(action.id)} className="px-4 py-2 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}>
                      ✅ Apply Action
                    </button>
                  ) : (
                    <span className="px-4 py-2 rounded-xl font-bold text-sm text-green-400 border border-green-800">Done</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredActions.length === 0 && (
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          <p className="text-lg font-medium">No actions in this category</p>
        </div>
      )}
    </>
  );
}