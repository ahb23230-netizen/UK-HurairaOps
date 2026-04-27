import { useState } from 'react';


interface Supplier {
  id: string;
  name: string;
  category: string;
  items: SupplierItem[];
  lastUpdated: string;
  rating: number;
}

interface SupplierItem {
  id: string;
  name: string;
  currentPrice: number;
  marketPrice: number;
  unit: string;
  priceChange: number;
  trend: 'up' | 'down' | 'stable';
  lastOrder: string;
  isAboveMarket: boolean;
}

export default function SupplierPriceTracker() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ name: '', category: '', itemName: '', price: '', marketPrice: '' });

  // Sample data
  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Fresh Foods Ltd',
      category: 'Meat & Poultry',
      lastUpdated: '2024-03-15',
      rating: 4.5,
      items: [
        { id: '1a', name: 'Chicken Breast', currentPrice: 4.20, marketPrice: 3.80, unit: 'kg', priceChange: 8.5, trend: 'up', lastOrder: '2024-03-10', isAboveMarket: true },
        { id: '1b', name: 'Beef Mince', currentPrice: 5.50, marketPrice: 5.80, unit: 'kg', priceChange: -5.2, trend: 'down', lastOrder: '2024-03-08', isAboveMarket: false },
        { id: '1c', name: 'Lamb Chops', currentPrice: 7.80, marketPrice: 7.20, unit: 'kg', priceChange: 0, trend: 'stable', lastOrder: '2024-03-05', isAboveMarket: true },
      ]
    },
    {
      id: '2',
      name: 'Green Valley Produce',
      category: 'Vegetables',
      lastUpdated: '2024-03-15',
      rating: 4.8,
      items: [
        { id: '2a', name: 'Tomatoes', currentPrice: 2.10, marketPrice: 2.50, unit: 'kg', priceChange: -16, trend: 'down', lastOrder: '2024-03-12', isAboveMarket: false },
        { id: '2b', name: 'Potatoes', currentPrice: 0.80, marketPrice: 0.90, unit: 'kg', priceChange: -11, trend: 'down', lastOrder: '2024-03-12', isAboveMarket: false },
        { id: '2d', name: 'Onions', currentPrice: 0.60, marketPrice: 0.55, unit: 'kg', priceChange: 9.1, trend: 'up', lastOrder: '2024-03-11', isAboveMarket: true },
      ]
    },
    {
      id: '3',
      name: 'Ocean Fresh Seafood',
      category: 'Seafood',
      lastUpdated: '2024-03-14',
      rating: 4.2,
      items: [
        { id: '3a', name: 'Salmon Fillet', currentPrice: 12.50, marketPrice: 11.00, unit: 'kg', priceChange: 13.6, trend: 'up', lastOrder: '2024-03-09', isAboveMarket: true },
        { id: '3b', name: 'Prawns', currentPrice: 15.00, marketPrice: 14.50, unit: 'kg', priceChange: 3.4, trend: 'up', lastOrder: '2024-03-07', isAboveMarket: true },
      ]
    },
    {
      id: '4',
      name: 'Daily Bread Co',
      category: 'Bakery',
      lastUpdated: '2024-03-15',
      rating: 4.6,
      items: [
        { id: '4a', name: 'Sourdough Loaf', currentPrice: 2.80, marketPrice: 3.00, unit: 'unit', priceChange: -6.7, trend: 'down', lastOrder: '2024-03-14', isAboveMarket: false },
        { id: '4b', name: 'Croissants', currentPrice: 1.20, marketPrice: 1.10, unit: 'unit', priceChange: 9.1, trend: 'up', lastOrder: '2024-03-13', isAboveMarket: true },
      ]
    }
  ];

  const categories = ['all', 'Meat & Poultry', 'Vegetables', 'Seafood', 'Bakery', 'Dairy', 'Beverages'];

  const filteredSuppliers = selectedCategory === 'all'
    ? suppliers
    : suppliers.filter(s => s.category === selectedCategory);

  // Calculate alerts
  const expensiveItems = suppliers.flatMap(s => s.items.filter(i => i.isAboveMarket));
  const totalPotentialSavings = expensiveItems.reduce((sum, item) => {
    const diff = item.currentPrice - item.marketPrice;
    return sum + (diff > 0 ? diff * 10 : 0); // Assuming 10 units per order
  }, 0);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <span className="text-red-500">↑</span>;
      case 'down':
        return <span className="text-green-500">↓</span>;
      default:
        return <span className="text-gray-500">→</span>;
    }
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-red-600 bg-red-50';
    if (change < 0) return 'text-green-600 bg-green-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <>
      {/* Alerts Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">💰 Potential Savings Alert</h3>
              <p className="text-amber-100 text-sm mt-1">
                {expensiveItems.length} items are priced above market average
              </p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm opacity-80">Estimated Monthly Savings</p>
            <p className="text-4xl font-bold">£{totalPotentialSavings.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Total Suppliers</span>
          </div>
          <div className="text-4xl font-bold text-gray-900">{suppliers.length}</div>
          <p className="text-sm text-gray-500 mt-1">Active Partners</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Items Tracked</span>
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {suppliers.reduce((sum, s) => sum + s.items.length, 0)}
          </div>
          <p className="text-sm text-gray-500 mt-1">Across All Categories</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Above Market</span>
          </div>
          <div className="text-4xl font-bold text-red-600">{expensiveItems.length}</div>
          <p className="text-sm text-gray-500 mt-1">Items Need Attention</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Avg Rating</span>
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {(suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1)}
          </div>
          <p className="text-sm text-gray-500 mt-1">Supplier Performance</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat === 'all' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Supplier Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                  <p className="text-sm text-gray-500">{supplier.category}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-gray-900">{supplier.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">Updated: {supplier.lastUpdated}</p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Item</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Your Price</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Market</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Change</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {supplier.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">per {item.unit}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-semibold text-gray-900">£{item.currentPrice.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-gray-600">£{item.marketPrice.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${getPriceChangeColor(item.priceChange)}`}>
                          {getTrendIcon(item.trend)}
                          <span className="text-sm font-medium">
                            {Math.abs(item.priceChange).toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {item.isAboveMarket ? (
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                            Above Market ⚠️
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Good Deal ✓
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Add Supplier Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setShowAddSupplier(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Supplier
        </button>
      </div>
    </>
  );
}
