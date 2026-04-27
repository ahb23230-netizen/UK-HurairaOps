import { useState, useEffect } from 'react';


interface MenuItem {
  id: string;
  name: string;
  sellingPrice: number;
  ingredientCost: number;
  prepTime: number;
  dailyOrders: number;
  category: string;
}

interface ProfitAnalysis {
  id: string;
  name: string;
  profit: number;
  profitMargin: number;
  status: 'high' | 'medium' | 'low';
  suggestion: string;
}

const defaultMenuItems: MenuItem[] = [];

export default function MenuProfitAnalyzer() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    sellingPrice: 0,
    ingredientCost: 0,
    prepTime: 0,
    dailyOrders: 0,
    category: 'Mains',
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'profit' | 'margin' | 'orders'>('profit');

  useEffect(() => {
    const saved = localStorage.getItem('menuItems');
    if (saved) {
      setMenuItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (menuItems.length > 0) {
      localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }
  }, [menuItems]);

  const analyzeProfit = (item: MenuItem): ProfitAnalysis => {
    const profit = item.sellingPrice - item.ingredientCost;
    const profitMargin = (profit / item.sellingPrice) * 100;
    const dailyProfit = profit * item.dailyOrders;

    let status: 'high' | 'medium' | 'low';
    let suggestion: string;

    if (profitMargin >= 65) {
      status = 'high';
      suggestion = 'Top performer! Consider highlighting this item.';
    } else if (profitMargin >= 40) {
      status = 'medium';
      suggestion = `Potential to increase price by £${(item.sellingPrice * 0.1).toFixed(2)}`;
    } else {
      status = 'low';
      suggestion = `Review costs or increase price by £${(item.sellingPrice * 0.2).toFixed(2)}+`;
    }

    return { id: item.id, name: item.name, profit: dailyProfit, profitMargin, status, suggestion };
  };

  const analyzedItems = menuItems
    .map(item => ({ ...item, analysis: analyzeProfit(item) }))
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'profit') return b.analysis.profit - a.analysis.profit;
      if (sortBy === 'margin') return b.analysis.profitMargin - a.analysis.profitMargin;
      return b.dailyOrders - a.dailyOrders;
    });

  const totalDailyProfit = analyzedItems.reduce((sum, item) => sum + item.analysis.profit, 0);
  const averageMargin = analyzedItems.length > 0
    ? analyzedItems.reduce((sum, item) => sum + item.analysis.profitMargin, 0) / analyzedItems.length
    : 0;

  const handleAddItem = () => {
    if (newItem.name && newItem.sellingPrice && newItem.ingredientCost) {
      const item: MenuItem = {
        id: Date.now().toString(),
        name: newItem.name,
        sellingPrice: newItem.sellingPrice,
        ingredientCost: newItem.ingredientCost,
        prepTime: newItem.prepTime || 0,
        dailyOrders: newItem.dailyOrders || 0,
        category: newItem.category || 'Mains',
      };
      setMenuItems([...menuItems, item]);
      setNewItem({ name: '', sellingPrice: 0, ingredientCost: 0, prepTime: 0, dailyOrders: 0, category: 'Mains' });
      setShowAddForm(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Daily Profit</p>
              <p className="text-3xl font-bold text-emerald-600">£{totalDailyProfit.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-xl">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Avg. Profit Margin</p>
              <p className="text-3xl font-bold text-purple-600">{averageMargin.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Total Items</p>
              <p className="text-3xl font-bold text-slate-800">{menuItems.length}</p>
            </div>
            <div className="p-3 bg-slate-100 rounded-xl">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Monthly Potential</p>
              <p className="text-3xl font-bold text-blue-600">£{(totalDailyProfit * 30).toFixed(0)}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-6">
        <button onClick={() => setShowAddForm(true)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {cat}
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-100 text-slate-600 border-0 focus:ring-2 focus:ring-blue-500">
            <option value="profit">Sort by Profit</option>
            <option value="margin">Sort by Margin</option>
            <option value="orders">Sort by Orders</option>
          </select>
        </div>
      </div>

      {/* Menu Items Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {analyzedItems.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">No menu items yet. Add your first item to start analyzing profits.</p>
            <button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">Add Your First Item</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Item</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Category</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Price</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Cost</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Profit</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Margin</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analyzedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{item.analysis.suggestion}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">{item.category}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">£{item.sellingPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right text-slate-600">£{item.ingredientCost.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-medium text-emerald-600">£{(item.sellingPrice - item.ingredientCost).toFixed(2)}</td>
                    <td className={`px-6 py-4 text-right font-semibold ${item.analysis.profitMargin >= 65 ? 'text-emerald-600' : item.analysis.profitMargin >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                      {item.analysis.profitMargin.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.analysis.status)}`}>
                        {item.analysis.status === 'high' ? 'High' : item.analysis.status === 'medium' ? 'Medium' : 'Low'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAddForm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Add New Menu Item</h2>
              <button onClick={() => setShowAddForm(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Item Name</label>
                <input type="text" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Chicken Burger" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Selling Price (£)</label>
                  <input type="number" step="0.01" value={newItem.sellingPrice || ''} onChange={(e) => setNewItem({ ...newItem, sellingPrice: parseFloat(e.target.value) })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="12.99" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ingredient Cost (£)</label>
                  <input type="number" step="0.01" value={newItem.ingredientCost || ''} onChange={(e) => setNewItem({ ...newItem, ingredientCost: parseFloat(e.target.value) })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="4.50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Prep Time (min)</label>
                  <input type="number" value={newItem.prepTime || ''} onChange={(e) => setNewItem({ ...newItem, prepTime: parseInt(e.target.value) })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Daily Orders</label>
                  <input type="number" value={newItem.dailyOrders || ''} onChange={(e) => setNewItem({ ...newItem, dailyOrders: parseInt(e.target.value) })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="25" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500">
                  <option value="Mains">Mains</option>
                  <option value="Starters">Starters</option>
                  <option value="Sides">Sides</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Drinks">Drinks</option>
                </select>
              </div>

              <div className="pt-4">
                <button onClick={handleAddItem} disabled={!newItem.name || !newItem.sellingPrice || !newItem.ingredientCost} className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Add Item to Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}