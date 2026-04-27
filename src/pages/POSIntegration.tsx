import { useState } from 'react';


interface POSIntegration {
  id: string;
  name: string;
  logo: string;
  status: 'connected' | 'disconnected' | 'pending';
  lastSync: string;
  description: string;
}

interface SalesData {
  date: string;
  totalSales: number;
  transactions: number;
  averageOrder: number;
  categoryBreakdown: { name: string; value: number; color: string }[];
}

export default function POSIntegration() {
  const [activeTab, setActiveTab] = useState<'integrations' | 'sales' | 'analytics'>('integrations');
  const [showConnectModal, setShowConnectModal] = useState(false);

  const posSystems: POSIntegration[] = [
    {
      id: 'square',
      name: 'Square',
      logo: 'S',
      status: 'connected',
      lastSync: '2024-03-15 14:30',
      description: 'Popular POS system for restaurants and retail'
    },
    {
      id: 'toast',
      name: 'Toast',
      logo: 'T',
      status: 'disconnected',
      lastSync: '',
      description: 'All-in-one restaurant management platform'
    },
    {
      id: 'clover',
      name: 'Clover',
      logo: 'C',
      status: 'disconnected',
      lastSync: '',
      description: 'Smart POS for growing businesses'
    },
    {
      id: 'shopify',
      name: 'Shopify POS',
      logo: 'SH',
      status: 'pending',
      lastSync: '',
      description: 'Unified commerce platform'
    }
  ];

  const salesData: SalesData[] = [
    { date: '2024-03-10', totalSales: 2450, transactions: 85, averageOrder: 28.82, categoryBreakdown: [{ name: 'Food', value: 1800, color: 'bg-blue-500' }, { name: 'Drinks', value: 450, color: 'bg-green-500' }, { name: 'Other', value: 200, color: 'bg-gray-400' }] },
    { date: '2024-03-11', totalSales: 3200, transactions: 112, averageOrder: 28.57, categoryBreakdown: [{ name: 'Food', value: 2400, color: 'bg-blue-500' }, { name: 'Drinks', value: 600, color: 'bg-green-500' }, { name: 'Other', value: 200, color: 'bg-gray-400' }] },
    { date: '2024-03-12', totalSales: 2800, transactions: 95, averageOrder: 29.47, categoryBreakdown: [{ name: 'Food', value: 2100, color: 'bg-blue-500' }, { name: 'Drinks', value: 500, color: 'bg-green-500' }, { name: 'Other', value: 200, color: 'bg-gray-400' }] },
    { date: '2024-03-13', totalSales: 4100, transactions: 145, averageOrder: 28.28, categoryBreakdown: [{ name: 'Food', value: 3000, color: 'bg-blue-500' }, { name: 'Drinks', value: 800, color: 'bg-green-500' }, { name: 'Other', value: 300, color: 'bg-gray-400' }] },
    { date: '2024-03-14', totalSales: 3600, transactions: 120, averageOrder: 30.00, categoryBreakdown: [{ name: 'Food', value: 2700, color: 'bg-blue-500' }, { name: 'Drinks', value: 650, color: 'bg-green-500' }, { name: 'Other', value: 250, color: 'bg-gray-400' }] },
    { date: '2024-03-15', totalSales: 2900, transactions: 98, averageOrder: 29.59, categoryBreakdown: [{ name: 'Food', value: 2200, color: 'bg-blue-500' }, { name: 'Drinks', value: 520, color: 'bg-green-500' }, { name: 'Other', value: 180, color: 'bg-gray-400' }] },
  ];

  const connectedCount = posSystems.filter(p => p.status === 'connected').length;
  const totalTransactions = salesData.reduce((sum, d) => sum + d.transactions, 0);
  const totalSales = salesData.reduce((sum, d) => sum + d.totalSales, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Connected</span>;
      case 'disconnected':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Not Connected</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Pending</span>;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Connected POS Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">📊 Live POS Sync Active</h3>
              <p className="text-emerald-100 text-sm mt-1">
                {connectedCount} POS system connected • Last sync: 2 minutes ago
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowConnectModal(true)}
            className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
          >
            + Connect New POS
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Connected POS</span>
          </div>
          <div className="text-4xl font-bold text-gray-900">{connectedCount}</div>
          <p className="text-sm text-gray-500 mt-1">of {posSystems.length} systems</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Total Sales</span>
          </div>
          <div className="text-4xl font-bold text-gray-900">£{totalSales.toLocaleString()}</div>
          <p className="text-sm text-gray-500 mt-1">Last 6 days</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Transactions</span>
          </div>
          <div className="text-4xl font-bold text-gray-900">{totalTransactions}</div>
          <p className="text-sm text-gray-500 mt-1">Orders processed</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Avg Order</span>
          </div>
          <div className="text-4xl font-bold text-gray-900">£{(totalSales / totalTransactions).toFixed(2)}</div>
          <p className="text-sm text-gray-500 mt-1">Per transaction</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {(['integrations', 'sales', 'analytics'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {tab === 'integrations' ? 'POS Integrations' : tab === 'sales' ? 'Sales Data' : 'Analytics'}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posSystems.map((pos) => (
            <div key={pos.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col min-h-[280px]">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {pos.logo}
                </div>
                {getStatusBadge(pos.status)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{pos.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{pos.description}</p>
              {pos.status === 'connected' && pos.lastSync && (
                <p className="text-xs text-gray-400 mb-4">Last sync: {pos.lastSync}</p>
              )}
              <div className="mt-auto pt-4">
                {pos.status === 'connected' && (
                  <button className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium">
                    Settings
                  </button>
                )}
                {pos.status === 'disconnected' && (
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Connect Now
                  </button>
                )}
                {pos.status === 'pending' && (
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Complete Setup
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'sales' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Sales Data</h3>
            <p className="text-sm text-gray-500">Synced from connected POS systems</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Sales</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Transactions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Avg Order</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Breakdown</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {salesData.map((day, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-medium">{day.date}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">£{day.totalSales.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-700">{day.transactions}</td>
                    <td className="px-6 py-4 text-gray-700">£{day.averageOrder.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {day.categoryBreakdown.map((cat, i) => (
                          <div key={i} className={`w-8 h-2 rounded-full ${cat.color}`} title={cat.name}></div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Food</span>
                  <span className="text-sm font-medium text-gray-900">£14,200 (78%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Drinks</span>
                  <span className="text-sm font-medium text-gray-900">£3,020 (17%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '17%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Other</span>
                  <span className="text-sm font-medium text-gray-900">£1,030 (5%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-gray-400 h-3 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <span className="font-medium text-gray-900">12:00 - 14:00</span>
                <span className="text-blue-600 font-semibold">45% of sales</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                <span className="font-medium text-gray-900">18:00 - 20:00</span>
                <span className="text-emerald-600 font-semibold">35% of sales</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                <span className="font-medium text-gray-900">Other Hours</span>
                <span className="text-amber-600 font-semibold">20% of sales</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}