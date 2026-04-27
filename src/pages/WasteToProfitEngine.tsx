import { useState } from 'react';

interface ExpiringItem {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  quantity: number;
  unit: string;
  cost: number;
  status: 'urgent' | 'warning' | 'ok';
  daysUntilExpiry: number;
  suggestedAction: string;
  potentialSaving: number;
}

interface WasteLog {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  reason: string;
  cost: number;
  date: string;
}

interface BundleSuggestion {
  id: string;
  name: string;
  items: string[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  itemsExpiring: string[];
  estimatedProfitLift: string;
}

export default function WasteToProfitEngine() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'deals' | 'analytics'>('inventory');

  // Demo expiring inventory
  const expiringItems: ExpiringItem[] = [
    { id: '1', name: 'Fresh Chicken Breast', category: 'Proteins', expiryDate: '2024-03-15', quantity: 5, unit: 'kg', cost: 2.50, status: 'urgent', daysUntilExpiry: 1, suggestedAction: 'Bundle with fries + sauce', potentialSaving: 15.00 },
    { id: '2', name: 'Greek Yogurt', category: 'Dairy', expiryDate: '2024-03-16', quantity: 12, unit: 'pcs', cost: 1.20, status: 'urgent', daysUntilExpiry: 2, suggestedAction: 'Create "Bottomless Yogurt" deal', potentialSaving: 8.50 },
    { id: '3', name: 'Mixed Salad Greens', category: 'Vegetables', expiryDate: '2024-03-17', quantity: 3, unit: 'kg', cost: 3.00, status: 'warning', daysUntilExpiry: 3, suggestedAction: 'Feature in lunch specials', potentialSaving: 12.00 },
    { id: '4', name: 'Halloumi Cheese', category: 'Dairy', expiryDate: '2024-03-18', quantity: 2, unit: 'kg', cost: 4.50, status: 'warning', daysUntilExpiry: 4, suggestedAction: 'Create Halloumi promotion', potentialSaving: 10.00 },
    { id: '5', name: 'Fresh Salmon', category: 'Proteins', expiryDate: '2024-03-19', quantity: 1.5, unit: 'kg', cost: 8.00, status: 'ok', daysUntilExpiry: 5, suggestedAction: 'Add to weekend special menu', potentialSaving: 18.00 },
    { id: '6', name: 'Sourdough Bread', category: 'Bakery', expiryDate: '2024-03-17', quantity: 8, unit: 'pcs', cost: 1.50, status: 'warning', daysUntilExpiry: 3, suggestedAction: 'Bread pudding special', potentialSaving: 6.00 },
    { id: '7', name: 'Tomato Passata', category: 'Pantry', expiryDate: '2024-03-20', quantity: 6, unit: 'jars', cost: 0.80, status: 'ok', daysUntilExpiry: 6, suggestedAction: 'Italian night promotion', potentialSaving: 5.00 },
    { id: '8', name: 'Cheddar Cheese', category: 'Dairy', expiryDate: '2024-03-21', quantity: 4, unit: 'kg', cost: 5.00, status: 'ok', daysUntilExpiry: 7, suggestedAction: 'Create cheese board special', potentialSaving: 14.00 },
  ];

  // Bundle suggestions
  const bundleSuggestions: BundleSuggestion[] = [
    { id: '1', name: 'Proteins Bundle Deal', items: ['Chicken Breast', 'Salmon', 'Halloumi'], originalPrice: 45.00, bundlePrice: 35.00, savings: 10.00, itemsExpiring: ['Chicken Breast', 'Salmon', 'Halloumi'], estimatedProfitLift: '+22%' },
    { id: '2', name: 'Breakfast-to-Lunch Bridge', items: ['Greek Yogurt', 'Mixed Salad Greens', 'Sourdough'], originalPrice: 18.50, bundlePrice: 12.99, savings: 5.51, itemsExpiring: ['Greek Yogurt', 'Mixed Salad Greens', 'Sourdough'], estimatedProfitLift: '+35%' },
    { id: '3', name: 'Quick Bite Special', items: ['Sourdough', 'Cheddar Cheese', 'Chicken Breast'], originalPrice: 22.00, bundlePrice: 16.99, savings: 5.01, itemsExpiring: ['Sourdough', 'Chicken Breast'], estimatedProfitLift: '+28%' },
    { id: '4', name: 'Healthy Bowl Bundle', items: ['Salmon', 'Mixed Greens', 'Greek Yogurt'], originalPrice: 28.00, bundlePrice: 19.99, savings: 8.01, itemsExpiring: ['Mixed Greens', 'Greek Yogurt', 'Salmon'], estimatedProfitLift: '+30%' },
  ];

  // Recent waste log
  const recentWaste: WasteLog[] = [
    { id: '1', itemName: 'Lamb Mince', quantity: 2.5, unit: 'kg', reason: 'Expired - not used in time', cost: 15.00, date: '2024-03-12' },
    { id: '2', itemName: 'Fresh Herbs', quantity: 0.5, unit: 'kg', reason: 'Wilted - poor storage', cost: 4.50, date: '2024-03-11' },
    { id: '3', itemName: 'Chicken Wings', quantity: 3, unit: 'kg', reason: 'Overcooked - quality issue', cost: 12.00, date: '2024-03-10' },
    { id: '4', itemName: 'Pizza Dough', quantity: 8, unit: 'pcs', reason: 'Not ordered - slow day', cost: 8.00, date: '2024-03-09' },
  ];

  // Calculate totals
  const totalExpiringValue = expiringItems.reduce((sum, item) => sum + (item.cost * item.quantity), 0);
  const totalPotentialSaving = expiringItems.reduce((sum, item) => sum + item.potentialSaving, 0);
  const totalWasteCost = recentWaste.reduce((sum, item) => sum + item.cost, 0);
  const urgentItems = expiringItems.filter(i => i.status === 'urgent').length;

  // Today's deals from expiring items
  const todaysDeals = expiringItems.filter(i => i.status === 'urgent' || i.status === 'warning').slice(0, 4);

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Waste-to-Profit Engine</h1>
        <p className="text-gray-500 mt-1">Transform food waste into profit opportunities</p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Items Expiring</p>
              <p className="text-2xl font-bold text-gray-900">{expiringItems.length}</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Urgent Action</p>
              <p className="text-2xl font-bold text-red-600">{urgentItems}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Potential Saving</p>
              <p className="text-2xl font-bold text-emerald-600">£{totalPotentialSaving.toFixed(2)}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Waste</p>
              <p className="text-2xl font-bold text-gray-900">£{totalWasteCost.toFixed(2)}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex gap-4 border-b border-gray-200">
          {[
            { id: 'inventory', label: 'Expiring Inventory', icon: '📦' },
            { id: 'deals', label: 'Bundle Deals', icon: '🎁' },
            { id: 'analytics', label: 'Waste Analytics', icon: '📊' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Today's Deals Alert */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Today's Action Required</h3>
                <p className="text-white/80">Items that need immediate attention</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {todaysDeals.map((deal) => (
                <div key={deal.id} className="bg-white/10 rounded-xl p-3">
                  <div className="font-semibold text-sm">{deal.name}</div>
                  <div className="text-xs text-white/70 mt-1">Exp: {deal.expiryDate}</div>
                  <div className="mt-2 text-emerald-200 font-bold text-sm">
                    Save £{deal.potentialSaving.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expiring Items List */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Items Near Expiry</h3>
                <p className="text-sm text-gray-500 mt-1">Total value at risk: £{totalExpiringValue.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                  {expiringItems.filter(i => i.status === 'urgent').length} Urgent
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                  {expiringItems.filter(i => i.status === 'warning').length} Warning
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                    <th className="pb-3 font-medium">Item</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Expiry</th>
                    <th className="pb-3 font-medium">Quantity</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Suggested Action</th>
                    <th className="pb-3 font-medium">Saving</th>
                  </tr>
                </thead>
                <tbody>
                  {expiringItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4">
                        <div className="font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-600">{item.expiryDate}</td>
                      <td className="py-4 text-sm text-gray-600">{item.quantity} {item.unit}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === 'urgent' ? 'bg-red-100 text-red-700' :
                          item.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {item.status === 'urgent' ? '🔴 Urgent' :
                           item.status === 'warning' ? '🟡 Warning' : '🟢 OK'}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="text-sm text-gray-600">{item.suggestedAction}</div>
                      </td>
                      <td className="py-4">
                        <div className="font-semibold text-emerald-600">£{item.potentialSaving.toFixed(2)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'deals' && (
        <div className="space-y-6">
          {/* Bundle Deals Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎁</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Smart Bundle Suggestions</h3>
                <p className="text-white/80">Combine expiring items into profit-boosting deals</p>
              </div>
            </div>
          </div>

          {/* Bundle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundleSuggestions.map((bundle) => (
              <div key={bundle.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{bundle.name}</h4>
                      <p className="text-sm text-gray-500">{bundle.itemsExpiring.length} expiring items</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                    {bundle.estimatedProfitLift}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Includes:</p>
                  <div className="flex flex-wrap gap-2">
                    {bundle.items.map((item, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-xs text-gray-500 line-through">£{bundle.originalPrice.toFixed(2)}</p>
                      <p className="text-xl font-bold text-emerald-600">£{bundle.bundlePrice.toFixed(2)}</p>
                    </div>
                    <div className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                      Save £{bundle.savings.toFixed(2)}
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Activate Deal
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors text-left">
                <div className="text-2xl mb-2">🍽️</div>
                <div className="font-medium text-gray-900">Today's Special</div>
                <div className="text-sm text-gray-500">Feature expiring items</div>
              </button>
              <button className="p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors text-left">
                <div className="text-2xl mb-2">📋</div>
                <div className="font-medium text-gray-900">Create Bundle</div>
                <div className="text-sm text-gray-500">Custom meal deal</div>
              </button>
              <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-left">
                <div className="text-2xl mb-2">📱</div>
                <div className="font-medium text-gray-900">Push to Apps</div>
                <div className="text-sm text-gray-500">Just Eat, Deliveroo</div>
              </button>
              <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors text-left">
                <div className="text-2xl mb-2">📧</div>
                <div className="font-medium text-gray-900">Email Campaign</div>
                <div className="text-sm text-gray-500">Notify customers</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Waste Analytics */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Waste Analysis (This Month)</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-red-600 mb-2">£{totalWasteCost.toFixed(2)}</div>
                <div className="text-sm text-gray-500">Total Waste Cost</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-amber-600 mb-2">12.5 kg</div>
                <div className="text-sm text-gray-500">Food Wasted</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-emerald-600 mb-2">85%</div>
                <div className="text-sm text-gray-500">Preventable Waste</div>
              </div>
            </div>

            {/* Waste Reasons */}
            <h4 className="font-medium text-gray-900 mb-4">Top Waste Reasons</h4>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600">Expired</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div className="bg-red-500 h-4 rounded-full" style={{ width: '45%' }} />
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">45%</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600">Overproduction</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div className="bg-amber-500 h-4 rounded-full" style={{ width: '30%' }} />
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">30%</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600">Quality Issues</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div className="bg-blue-500 h-4 rounded-full" style={{ width: '15%' }} />
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">15%</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600">Other</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div className="bg-gray-500 h-4 rounded-full" style={{ width: '10%' }} />
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">10%</div>
              </div>
            </div>
          </div>

          {/* Recent Waste Log */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Waste Log</h3>
            <div className="space-y-4">
              {recentWaste.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.itemName}</div>
                    <div className="text-sm text-gray-500">{item.reason}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{item.quantity} {item.unit}</div>
                    <div className="font-semibold text-red-600">-£{item.cost.toFixed(2)}</div>
                  </div>
                  <div className="text-sm text-gray-500">{item.date}</div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
              + Log New Waste Entry
            </button>
          </div>

          {/* Compliance + Profit Connection */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Compliance + Profit Connection</h3>
                <p className="text-white/80">How waste reduction improves your compliance score</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-sm text-white/70 mb-1">Better Stock Rotation</div>
                <div className="font-bold text-lg">+5% FHRS</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-sm text-white/70 mb-1">Reduced Expiry Risks</div>
                <div className="font-bold text-lg">+8% Compliance</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-sm text-white/70 mb-1">Cost Savings</div>
                <div className="font-bold text-lg">£200/mo avg</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}