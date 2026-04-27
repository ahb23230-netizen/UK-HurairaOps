import { useState } from 'react';
import { Link } from 'react-router-dom';


interface Allergen {
  id: string;
  name: string;
  icon: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

interface MenuItem {
  id: string;
  name: string;
  contains: string[];
  crossContaminationRisk: string[];
  riskLevel: 'high' | 'medium' | 'low';
}

const majorAllergens: Allergen[] = [
  { id: 'celery', name: 'Celery', icon: '🥬', severity: 'high', description: 'Including celery stalks, leaves, seeds and root' },
  { id: 'gluten', name: 'Gluten', icon: '🌾', severity: 'high', description: 'Wheat, barley, oats, rye, spelt' },
  { id: 'crustaceans', name: 'Crustaceans', icon: '🦐', severity: 'high', description: 'Prawns, crabs, lobster, shrimp' },
  { id: 'eggs', name: 'Eggs', icon: '🥚', severity: 'medium', description: 'Eggs in all forms including mayonnaise' },
  { id: 'fish', name: 'Fish', icon: '🐟', severity: 'high', description: 'All fish species' },
  { id: 'lupin', name: 'Lupin', icon: '🪻', severity: 'medium', description: 'Lupin seeds and flour' },
  { id: 'milk', name: 'Milk', icon: '🥛', severity: 'high', description: 'All dairy products including cheese' },
  { id: 'molluscs', name: 'Molluscs', icon: '🐚', severity: 'high', description: 'Oysters, mussels, squid, snails' },
  { id: 'mustard', name: 'Mustard', icon: '🟡', severity: 'medium', description: 'Mustard seeds, powder, paste' },
  { id: 'nuts', name: 'Nuts', icon: '🥜', severity: 'high', description: 'Almonds, hazelnuts, walnuts, cashews' },
  { id: 'peanuts', name: 'Peanuts', icon: '🥜', severity: 'high', description: 'Peanuts in all forms' },
  { id: 'sesame', name: 'Sesame', icon: '🫘', severity: 'high', description: 'Sesame seeds and oil' },
  { id: 'soya', name: 'Soya', icon: '🫘', severity: 'medium', description: 'Soya beans, tofu, edamame' },
  { id: 'sulphites', name: 'Sulphites', icon: '🍷', severity: 'medium', description: 'Sulphur dioxide used as preservative' },
];

const sampleMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Chicken Caesar Salad',
    contains: ['gluten', 'eggs', 'milk'],
    crossContaminationRisk: ['nuts'],
    riskLevel: 'medium',
  },
  {
    id: '2',
    name: 'Fish and Chips',
    contains: ['gluten', 'fish'],
    crossContaminationRisk: ['nuts', 'milk'],
    riskLevel: 'low',
  },
  {
    id: '3',
    name: 'Beef Burger',
    contains: ['gluten', 'milk', 'eggs'],
    crossContaminationRisk: ['nuts', 'sesame'],
    riskLevel: 'high',
  },
  {
    id: '4',
    name: 'Vegetable Curry',
    contains: ['milk', 'mustard'],
    crossContaminationRisk: ['gluten', 'peanuts'],
    riskLevel: 'medium',
  },
  {
    id: '5',
    name: 'Prawn Tempura',
    contains: ['gluten', 'crustaceans', 'eggs'],
    crossContaminationRisk: ['nuts', 'soya'],
    riskLevel: 'high',
  },
  {
    id: '6',
    name: 'Mushroom Risotto',
    contains: ['milk', 'celery'],
    crossContaminationRisk: ['gluten', 'fish'],
    riskLevel: 'low',
  },
];

export default function AllergenScanner() {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRiskAlerts, setShowRiskAlerts] = useState(true);

  const toggleAllergen = (id: string) => {
    setSelectedAllergens(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const filteredMenuItems = sampleMenuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const hasSelectedAllergen = selectedAllergens.some(
      a => item.contains.includes(a) || item.crossContaminationRisk.includes(a)
    );
    return matchesSearch && (selectedAllergens.length === 0 || hasSelectedAllergen);
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'high': return '🔴 High Risk';
      case 'medium': return '🟡 Medium Risk';
      case 'low': return '🟢 Low Risk';
      default: return 'Unknown';
    }
  };

  const highRiskItems = sampleMenuItems.filter(item => item.riskLevel === 'high');

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Allergen Risk Scanner</h1>
          <p className="text-gray-600">Identify allergens and cross-contamination risks in your menu items</p>
        </div>

        {/* UK 14 Allergens Reference */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            UK 14 Major Allergens - Select your customer's requirements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {majorAllergens.map((allergen) => (
              <button
                key={allergen.id}
                onClick={() => toggleAllergen(allergen.id)}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  selectedAllergens.includes(allergen.id)
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="text-2xl mb-1">{allergen.icon}</div>
                <div className="text-xs font-medium text-gray-900">{allergen.name}</div>
              </button>
            ))}
          </div>
          {selectedAllergens.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-200">
              <p className="text-sm text-red-700 font-medium">
                Selected allergens: {selectedAllergens.map(id =>
                  majorAllergens.find(a => a.id === id)?.name
                ).join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Risk Alerts */}
        {showRiskAlerts && highRiskItems.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🚨</span>
              High Risk Items Alert
            </h3>
            <div className="space-y-3">
              {highRiskItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-4 border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(item.riskLevel)}`}>
                      {getRiskLabel(item.riskLevel)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-1">
                      <strong>Contains:</strong>{' '}
                      {item.contains.map(id => majorAllergens.find(a => a.id === id)?.name).join(', ')}
                    </p>
                    <p className="text-red-600">
                      <strong>⚠️ Cross-contamination Risk:</strong>{' '}
                      {item.crossContaminationRisk.map(id => majorAllergens.find(a => a.id === id)?.name).join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              onClick={() => setShowRiskAlerts(!showRiskAlerts)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                showRiskAlerts
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {showRiskAlerts ? '🔴 Risk Alerts ON' : '⚪ Risk Alerts OFF'}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMenuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(item.riskLevel)}`}>
                  {getRiskLabel(item.riskLevel)}
                </span>
              </div>

              <div className="mb-3">
                <p className="text-xs text-gray-500 font-medium mb-2">Contains:</p>
                <div className="flex flex-wrap gap-2">
                  {item.contains.map((id) => {
                    const allergen = majorAllergens.find(a => a.id === id);
                    const hasWarning = selectedAllergens.includes(id);
                    return (
                      <span
                        key={id}
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          hasWarning
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {allergen?.icon} {allergen?.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-amber-600 font-medium mb-2">⚠️ Cross-contamination Risk:</p>
                <div className="flex flex-wrap gap-2">
                  {item.crossContaminationRisk.map((id) => {
                    const allergen = majorAllergens.find(a => a.id === id);
                    const hasWarning = selectedAllergens.includes(id);
                    return (
                      <span
                        key={id}
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          hasWarning
                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                            : 'bg-amber-50 text-amber-600'
                        }`}
                      >
                        {allergen?.icon} {allergen?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMenuItems.length === 0 && (
          <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or allergen filters</p>
          </div>
        )}

        {/* UK Law Reminder */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">📜</span>
            UK Food Information Regulations 2014
          </h3>
          <div className="text-sm text-blue-700 space-y-2">
            <p>
              <strong>⚠️ Legal Requirement:</strong> All food businesses must provide allergen information
              to customers for the 14 major allergens listed above.
            </p>
            <p>
              <strong>📋 What you need:</strong> Accurate ingredient lists, clear allergen labeling,
              staff training, and good record-keeping.
            </p>
            <p>
              <strong>🚨 Penalties:</strong> Failure to comply can result in prosecution, fines up to £5,000,
              and reputational damage.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
