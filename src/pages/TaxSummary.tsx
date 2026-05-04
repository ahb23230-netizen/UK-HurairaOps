import React, { useState } from 'react';


interface TaxPeriod {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  status: 'current' | 'upcoming' | 'filed';
}

interface VATTransaction {
  id: string;
  date: string;
  description: string;
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
  category: string;
  type: 'sale' | 'purchase' | 'refund';
}

export default function TaxSummary() {
  const [selectedPeriod, setSelectedPeriod] = useState('q1-2024');
  const [showExportModal, setShowExportModal] = useState(false);

  const taxPeriods: TaxPeriod[] = [
    { id: 'q1-2024', label: 'Q1 2024 (Jan-Mar)', startDate: '2024-01-01', endDate: '2024-03-31', status: 'filed' },
    { id: 'q2-2024', label: 'Q2 2024 (Apr-Jun)', startDate: '2024-04-01', endDate: '2024-06-30', status: 'filed' },
    { id: 'q3-2024', label: 'Q3 2024 (Jul-Sep)', startDate: '2024-07-01', endDate: '2024-09-30', status: 'filed' },
    { id: 'q4-2024', label: 'Q4 2024 (Oct-Dec)', startDate: '2024-10-01', endDate: '2024-12-31', status: 'current' },
    { id: 'q1-2025', label: 'Q1 2025 (Jan-Mar)', startDate: '2025-01-01', endDate: '2025-03-31', status: 'upcoming' },
  ];

  const vatTransactions: VATTransaction[] = [
    { id: '1', date: '2024-01-05', description: 'Food supplies - Supplier A', netAmount: 850, vatAmount: 170, grossAmount: 1020, category: 'Purchases', type: 'purchase' },
    { id: '2', date: '2024-01-08', description: 'Customer sales - Dining', netAmount: 1250, vatAmount: 250, grossAmount: 1500, category: 'Sales', type: 'sale' },
    { id: '3', date: '2024-01-12', description: 'Beverage supplies', netAmount: 420, vatAmount: 84, grossAmount: 504, category: 'Purchases', type: 'purchase' },
    { id: '4', date: '2024-01-15', description: 'Customer sales - Takeaway', netAmount: 680, vatAmount: 136, grossAmount: 816, category: 'Sales', type: 'sale' },
    { id: '5', date: '2024-01-18', description: 'Equipment maintenance', netAmount: 350, vatAmount: 70, grossAmount: 420, category: 'Expenses', type: 'purchase' },
    { id: '6', date: '2024-01-20', description: 'Customer refund', netAmount: -120, vatAmount: -24, grossAmount: -144, category: 'Refunds', type: 'refund' },
    { id: '7', date: '2024-01-22', description: 'Catering services', netAmount: 890, vatAmount: 178, grossAmount: 1068, category: 'Sales', type: 'sale' },
    { id: '8', date: '2024-01-25', description: 'Cleaning supplies', netAmount: 180, vatAmount: 36, grossAmount: 216, category: 'Expenses', type: 'purchase' },
  ];

  // Calculate totals
  const totalSales = vatTransactions.filter(t => t.type === 'sale').reduce((sum, t) => sum + t.netAmount, 0);
  const totalSalesVAT = vatTransactions.filter(t => t.type === 'sale').reduce((sum, t) => sum + t.vatAmount, 0);
  const totalPurchases = vatTransactions.filter(t => t.type === 'purchase').reduce((sum, t) => sum + t.netAmount, 0);
  const totalPurchasesVAT = vatTransactions.filter(t => t.type === 'purchase').reduce((sum, t) => sum + t.vatAmount, 0);
  const totalRefunds = Math.abs(vatTransactions.filter(t => t.type === 'refund').reduce((sum, t) => sum + t.netAmount, 0));
  const netVAT = totalSalesVAT - totalPurchasesVAT;
  const vatRate = 20; // UK standard VAT rate

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Current Period</span>;
      case 'upcoming':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Upcoming</span>;
      case 'filed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Filed</span>;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">HMRC VAT Ready</h3>
              <p className="text-indigo-100 text-sm mt-1">
                Q4 2024 • VAT Return due: 7 Feb 2025
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowExportModal(true)}
              className="bg-white text-indigo-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
            >
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* VAT Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Output VAT (Sales)</span>
          </div>
          <div className="text-3xl font-bold text-green-600">£{totalSalesVAT.toLocaleString()}</div>
          <p className="text-sm text-gray-500 mt-1">£{totalSales.toLocaleString()} net sales</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Input VAT (Purchases)</span>
          </div>
          <div className="text-3xl font-bold text-red-600">£{totalPurchasesVAT.toLocaleString()}</div>
          <p className="text-sm text-gray-500 mt-1">£{totalPurchases.toLocaleString()} net purchases</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Refunds/Corrections</span>
          </div>
          <div className="text-3xl font-bold text-blue-600">-£24</div>
          <p className="text-sm text-gray-500 mt-1">Adjustments</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Net VAT Due</span>
          </div>
          <div className={`text-3xl font-bold ${netVAT >= 0 ? 'text-indigo-600' : 'text-green-600'}`}>
            £{Math.abs(netVAT).toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">{netVAT >= 0 ? 'Payable to HMRC' : 'Claimable from HMRC'}</p>
        </div>
      </div>

      {/* Period Selector and Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Tax Period</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {taxPeriods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedPeriod === period.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">{period.label}</span>
                  {getStatusBadge(period.status)}
                </div>
                <p className="text-xs text-gray-500">{period.startDate} to {period.endDate}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VAT Rate Info */}
      <div className="rounded-2xl p-6 mb-8 border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bg-hover)' }}>
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
                        <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>UK VAT Rates Applied</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="text-2xl font-bold text-amber-500">20%</div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Standard Rate (most items)</div>
              </div>
              <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="text-2xl font-bold text-green-500">5%</div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Reduced Rate (energy, child car seats)</div>
              </div>
              <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--text-muted)' }}>0%</div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Zero Rate (food, books, children's clothing)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">VAT Transactions</h3>
          <p className="text-sm text-gray-500">Detailed breakdown for selected period</p>
        </div>
        <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
          Download CSV
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Net Amount</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">VAT (20%)</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Gross</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200">
            {vatTransactions?.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.category === 'Sales' ? 'bg-green-100 text-green-700' :
                    transaction.category === 'Purchases' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {transaction.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 capitalize">{transaction.type}</td>
                <td className={`px-6 py-4 text-right font-medium ${
                  transaction.netAmount < 0 ? 'text-red-600' : 'text-gray-900'
                }`}>
                  £{Math.abs(transaction.netAmount).toLocaleString()}
                </td>
                <td className={`px-6 py-4 text-right ${
                  transaction.vatAmount < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  £{Math.abs(transaction.vatAmount).toLocaleString()}
                </td>
                <td className={`px-6 py-4 text-right font-semibold ${
                  transaction.grossAmount < 0 ? 'text-red-600' : 'text-gray-900'
                }`}>
                  £{Math.abs(transaction.grossAmount).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={4} className="px-6 py-4 text-sm font-semibold text-gray-900">Totals</td>
              <td className="px-6 py-4 text-right font-semibold text-gray-900">
                £{vatTransactions?.reduce((sum, t) => sum + t.netAmount, 0).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right font-semibold text-gray-900">
                £{vatTransactions?.reduce((sum, t) => sum + t.vatAmount, 0).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right font-semibold text-gray-900">
                £{vatTransactions?.reduce((sum, t) => sum + t.grossAmount, 0).toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Tax Report</h3>
            <div className="space-y-3">
              <button className="w-full p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">VAT Return (VAT Return form)</div>
                  <div className="text-sm text-gray-500">For HMRC submission</div>
                </div>
              </button>
              <button className="w-full p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Excel Spreadsheet</div>
                  <div className="text-sm text-gray-500">Full detailed breakdown</div>
                </div>
              </button>
              <button className="w-full p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Making Tax Digital (MTD)</div>
                  <div className="text-sm text-gray-500">Compatible with HMRC software</div>
                </div>
              </button>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2.5 bg-indigo-600 rounded-xl text-white font-medium hover:bg-indigo-700 transition-colors"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
