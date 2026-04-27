import { useState } from 'react';


interface PriceRecommendation {
  id: string;
  itemName: string;
  currentPrice: number;
  suggestedPrice: number;
  change: 'increase' | 'decrease' | 'maintain';
  reason: string;
  period: string;
  confidence: number;
}

interface TimeSlot {
  name: string;
  startTime: string;
  endTime: string;
  demand: 'high' | 'medium' | 'low';
  suggestedMultiplier: number;
  note?: string;
}

interface CalendarEvent {
  name: string;
  startDate: string;
  endDate: string;
  impact: string;
  category: 'uk-bank-holiday' | 'christian' | 'islamic' | 'hindu' | 'jewish' | 'buddhist' | 'sikh' | 'general';
  icon: string;
}

export default function DynamicPricingAdvisor() {
  const [selectedPeriod, setSelectedPeriod] = useState<'lunch' | 'dinner' | 'weekend' | 'ramadan' | 'christmas'>('lunch');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Demo menu items
  const menuItems = [
    { id: '1', name: 'Chicken Spicy Wrap', category: 'Mains', currentPrice: 12.99 },
    { id: '2', name: 'Classic Burger', category: 'Mains', currentPrice: 9.99 },
    { id: '3', name: 'Margherita Pizza', category: 'Mains', currentPrice: 11.99 },
    { id: '4', name: 'Lamb Biryani', category: 'Mains', currentPrice: 14.99 },
    { id: '5', name: 'Falafel Wrap', category: 'Vegetarian', currentPrice: 8.99 },
    { id: '6', name: 'Shawarma Plate', category: 'Mains', currentPrice: 13.99 },
  ];

  // Time slots - updated to include Suhoor for Ramadan
  const timeSlots: TimeSlot[] = [
    { name: 'Breakfast', startTime: '07:00', endTime: '11:00', demand: 'low' as const, suggestedMultiplier: 0.85 },
    { name: 'Lunch', startTime: '11:00', endTime: '15:00', demand: 'high' as const, suggestedMultiplier: 1.1 },
    { name: 'Afternoon', startTime: '15:00', endTime: '17:00', demand: 'low' as const, suggestedMultiplier: 0.9 },
    { name: 'Dinner', startTime: '17:00', endTime: '22:00', demand: 'high' as const, suggestedMultiplier: 1.2 },
    // Ramadan-specific times
    ...(selectedPeriod === 'ramadan' ? [
      { name: 'Suhoor (Ramadan)', startTime: '01:00', endTime: '04:00', demand: 'high' as const, suggestedMultiplier: 1.3, note: 'Late night fasting meal' },
      { name: 'Iftar Prep', startTime: '17:00', endTime: '18:00', demand: 'high' as const, suggestedMultiplier: 1.25, note: 'Breaking fast rush' },
    ] : []),
    // Christmas-specific times
    ...(selectedPeriod === 'christmas' ? [
      { name: 'Christmas Day', startTime: '10:00', endTime: '20:00', demand: 'high' as const, suggestedMultiplier: 1.3, note: 'Full day premium service' },
      { name: 'Boxing Day', startTime: '09:00', endTime: '21:00', demand: 'high' as const, suggestedMultiplier: 1.25, note: 'Extended hours' },
    ] : []),
  ];

  // Complete UK Calendar - All Celebrations (Neutral, Inclusive)
  const calendarEvents: CalendarEvent[] = [
    // UK Bank Holidays
    { name: 'New Year Bank Holiday', startDate: '2024-01-01', endDate: '2024-01-01', impact: '+15%', category: 'uk-bank-holiday', icon: '🎆' },
    { name: 'Early May Bank Holiday', startDate: '2024-05-06', endDate: '2024-05-06', impact: '+20%', category: 'uk-bank-holiday', icon: '🎏' },
    { name: 'Spring Bank Holiday', startDate: '2024-05-27', endDate: '2024-05-27', impact: '+18%', category: 'uk-bank-holiday', icon: '🌸' },
    { name: 'Summer Bank Holiday', startDate: '2024-08-26', endDate: '2024-08-26', impact: '+20%', category: 'uk-bank-holiday', icon: '☀️' },
    { name: 'Christmas Day', startDate: '2024-12-25', endDate: '2024-12-25', impact: '+30%', category: 'christian', icon: '🎄' },
    { name: 'Boxing Day', startDate: '2024-12-26', endDate: '2024-12-26', impact: '+25%', category: 'christian', icon: '📦' },

    // Christian Celebrations
    { name: 'Good Friday', startDate: '2024-03-29', endDate: '2024-03-29', impact: '+15%', category: 'christian', icon: '✝️' },
    { name: 'Easter Sunday', startDate: '2024-03-31', endDate: '2024-03-31', impact: '+25%', category: 'christian', icon: '🐰' },
    { name: 'Easter Monday', startDate: '2024-04-01', endDate: '2024-04-01', impact: '+18%', category: 'christian', icon: '🥚' },
    { name: 'St. Patrick\'s Day', startDate: '2024-03-17', endDate: '2024-03-17', impact: '+12%', category: 'christian', icon: '🍀' },
    { name: 'St. George\'s Day', startDate: '2024-04-23', endDate: '2024-04-23', impact: '+10%', category: 'christian', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },

    // Islamic Celebrations
    { name: 'Ramadan (Full Month)', startDate: '2024-03-10', endDate: '2024-04-09', impact: '+25%', category: 'islamic', icon: '🌙' },
    { name: 'Eid al-Fitr (Eid)', startDate: '2024-04-10', endDate: '2024-04-11', impact: '+30%', category: 'islamic', icon: '🌙' },
    { name: 'Eid al-Adha', startDate: '2024-06-16', endDate: '2024-06-17', impact: '+25%', category: 'islamic', icon: '🌙' },

    // Hindu Celebrations
    { name: 'Diwali', startDate: '2024-11-01', endDate: '2024-11-02', impact: '+20%', category: 'hindu', icon: '🪔' },
    { name: 'Holi', startDate: '2024-03-25', endDate: '2024-03-26', impact: '+15%', category: 'hindu', icon: '🎨' },

    // Jewish Celebrations
    { name: 'Hanukkah', startDate: '2024-12-07', endDate: '2024-12-15', impact: '+12%', category: 'jewish', icon: '🕯️' },
    { name: 'Rosh Hashanah', startDate: '2024-10-03', endDate: '2024-10-04', impact: '+10%', category: 'jewish', icon: '🍎' },
    { name: 'Yom Kippur', startDate: '2024-10-12', endDate: '2024-10-12', impact: '+8%', category: 'jewish', icon: '✡️' },

    // Buddhist Celebrations
    { name: 'Vesak (Buddha Day)', startDate: '2024-05-23', endDate: '2024-05-23', impact: '+10%', category: 'buddhist', icon: '☸️' },

    // Sikh Celebrations
    { name: 'Vaisakhi', startDate: '2024-04-13', endDate: '2024-04-14', impact: '+15%', category: 'sikh', icon: '🏹' },

    // General Celebrations
    { name: 'New Year\'s Eve', startDate: '2024-12-31', endDate: '2024-12-31', impact: '+25%', category: 'general', icon: '🎉' },
    { name: 'Valentine\'s Day', startDate: '2024-02-14', endDate: '2024-02-14', impact: '+20%', category: 'general', icon: '❤️' },
    { name: 'Mother\'s Day UK', startDate: '2024-03-10', endDate: '2024-03-10', impact: '+25%', category: 'general', icon: '🌷' },
    { name: 'Father\'s Day UK', startDate: '2024-06-16', endDate: '2024-06-16', impact: '+20%', category: 'general', icon: '🎁' },
    { name: 'Halloween', startDate: '2024-10-31', endDate: '2024-10-31', impact: '+22%', category: 'general', icon: '🎃' },
    { name: 'Bonfire Night', startDate: '2024-11-05', endDate: '2024-11-05', impact: '+18%', category: 'general', icon: '🎆' },
    { name: 'Black Friday', startDate: '2024-11-29', endDate: '2024-11-29', impact: '+15%', category: 'general', icon: '🛍️' },
    { name: 'Cyber Monday', startDate: '2024-12-02', endDate: '2024-12-02', impact: '+12%', category: 'general', icon: '💻' },
    { name: 'Super Bowl', startDate: '2024-02-11', endDate: '2024-02-11', impact: '+15%', category: 'general', icon: '🏈' },
    { name: 'Wimbledon', startDate: '2024-07-01', endDate: '2024-07-14', impact: '+12%', category: 'general', icon: '🎾' },
  ];

  // Ramadan-specific menu items
  const ramadanMenuItems = [
    { id: '1', name: 'Iftar Family Bundle', description: 'Dates, Soup, Main, Dessert', price: 29.99 },
    { id: '2', name: 'Suhoor Special', description: 'Protein-rich meal pack', price: 18.99 },
    { id: '3', name: 'Mixed Grill Platter', description: 'For Iftar gatherings', price: 24.99 },
    { id: '4', name: 'Lamb Biryani Large', description: 'Family size serving', price: 19.99 },
    { id: '5', name: 'Chicken Shawarma Family', description: '6 wraps + sides', price: 22.99 },
    { id: '6', name: 'Falafel Mega Box', description: '30 falafel + dips', price: 15.99 },
  ];

  // Category filters with neutral colors
  const categoryFilters = [
    { id: 'all', label: 'All Events', color: 'gray' },
    { id: 'uk-bank-holiday', label: 'UK Bank Holidays', color: 'blue' },
    { id: 'christian', label: 'Christian', color: 'indigo' },
    { id: 'islamic', label: 'Islamic', color: 'emerald' },
    { id: 'hindu', label: 'Hindu', color: 'orange' },
    { id: 'jewish', label: 'Jewish', color: 'violet' },
    { id: 'buddhist', label: 'Buddhist', color: 'amber' },
    { id: 'sikh', label: 'Sikh', color: 'pink' },
    { id: 'general', label: 'General', color: 'teal' },
  ];

  // Generate recommendations based on selected period
  const getRecommendations = (): PriceRecommendation[] => {
    const periodConfig = {
      lunch: {
        multiplier: 1.1,
        reason: 'High lunch demand period',
        displayPeriod: 'Lunch (11:00 - 15:00)'
      },
      dinner: {
        multiplier: 1.2,
        reason: 'Peak dinner hours - premium pricing',
        displayPeriod: 'Dinner (17:00 - 22:00)'
      },
      weekend: {
        multiplier: 1.15,
        reason: 'Weekend surge - increased footfall',
        displayPeriod: 'Weekend (Fri-Sun)'
      },
      ramadan: {
        multiplier: 1.25,
        reason: 'Ramadan - Iftar rush & extended hours',
        displayPeriod: 'Ramadan Period'
      },
      christmas: {
        multiplier: 1.3,
        reason: 'Christmas & New Year - Peak holiday season',
        displayPeriod: 'Christmas Period'
      }
    };

    const config = periodConfig[selectedPeriod];
    return menuItems.map(item => {
      const suggestedPrice = parseFloat((item.currentPrice * config.multiplier).toFixed(2));
      const change = suggestedPrice > item.currentPrice ? 'increase' :
                     suggestedPrice < item.currentPrice ? 'decrease' : 'maintain';
      return {
        id: item.id,
        itemName: item.name,
        currentPrice: item.currentPrice,
        suggestedPrice,
        change,
        reason: config.reason,
        period: config.displayPeriod,
        confidence: 85 + Math.random() * 10
      };
    });
  };

  const recommendations = getRecommendations();

  // Filter events by category
  const filteredEvents = selectedCategory === 'all'
    ? calendarEvents
    : calendarEvents.filter(e => e.category === selectedCategory);

  // Get category color class
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'uk-bank-holiday': 'bg-blue-100 text-blue-700',
      'christian': 'bg-indigo-100 text-indigo-700',
      'islamic': 'bg-emerald-100 text-emerald-700',
      'hindu': 'bg-orange-100 text-orange-700',
      'jewish': 'bg-violet-100 text-violet-700',
      'buddhist': 'bg-amber-100 text-amber-700',
      'sikh': 'bg-pink-100 text-pink-700',
      'general': 'bg-teal-100 text-teal-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  // Quiet day offers
  const quietDayStrategies = [
    { day: 'Monday', strategy: '2-for-1 Main Courses', expectedLift: '+30%' },
    { day: 'Tuesday', strategy: 'Kids Eat Free', expectedLift: '+25%' },
    { day: 'Wednesday', strategy: '20% Off Pre-orders', expectedLift: '+20%' },
    { day: 'Thursday', strategy: 'Happy Hour 4-6 PM', expectedLift: '+35%' },
  ];

  return (
    <>
      {/* Period Selection */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Pricing Period</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'lunch', label: 'Lunch', icon: '☀️', desc: '11AM - 3PM' },
              { id: 'dinner', label: 'Dinner', icon: '🌙', desc: '5PM - 10PM' },
              { id: 'weekend', label: 'Weekend', icon: '🎉', desc: 'Fri-Sun' },
              { id: 'ramadan', label: 'Ramadan', icon: '🌙✨', desc: 'Mar 10 - Apr 9' },
              { id: 'christmas', label: 'Christmas', icon: '🎄', desc: 'Dec 20 - Jan 2' },
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id as any)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedPeriod === period.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{period.icon}</div>
                <div className="font-semibold text-gray-900">{period.label}</div>
                <div className="text-sm text-gray-500">{period.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Christmas Special Section */}
      {selectedPeriod === 'christmas' && (
        <div className="mb-8 bg-gradient-to-r from-red-600 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🎄</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">Christmas & New Year Special</h3>
              <p className="text-white/80">Peak holiday season: Dec 20 - Jan 2</p>
            </div>
          </div>

          {/* Christmas Menu Bundles */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="font-semibold text-lg">Christmas Dinner Bundle</div>
              <div className="text-sm text-white/70 mt-1">Turkey, sides, dessert</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-2xl font-bold">£39.99</span>
                <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">Bundle</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="font-semibold text-lg">New Year Party Pack</div>
              <div className="text-sm text-white/70 mt-1">Appetizers, drinks, snacks</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-2xl font-bold">£49.99</span>
                <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">Bundle</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="font-semibold text-lg">Boxing Day Special</div>
              <div className="text-sm text-white/70 mt-1">Leftover specials & deals</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-2xl font-bold">£24.99</span>
                <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">Special</span>
              </div>
            </div>
          </div>

          {/* Christmas & Boxing Day Times */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <div className="font-semibold">Christmas Day</div>
                  <div className="text-white/70 text-sm">Dec 25 - Full day service</div>
                </div>
              </div>
              <div className="text-sm text-white/80">
                Premium pricing for Christmas dinner, family gatherings, and special menus.
              </div>
              <div className="mt-2 text-yellow-300 font-medium">+30% pricing multiplier</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📦</span>
                <div>
                  <div className="font-semibold">Boxing Day</div>
                  <div className="text-white/70 text-sm">Dec 26 - Sale day service</div>
                </div>
              </div>
              <div className="text-sm text-white/80">
                Post-Christmas sales, buffet specials, and extended hours for shoppers.
              </div>
              <div className="mt-2 text-yellow-300 font-medium">+25% pricing multiplier</div>
            </div>
          </div>
        </div>
      )}

      {/* Ramadan Special Section */}
      {selectedPeriod === 'ramadan' && (
        <div className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🌙</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">Ramadan Special Pricing</h3>
              <p className="text-white/80">Extended hours: Suhoor (1-4 AM) + Iftar (5-10 PM)</p>
            </div>
          </div>

          {/* Ramadan Menu Bundles */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ramadanMenuItems.map((item) => (
              <div key={item.id} className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="font-semibold text-lg">{item.name}</div>
                <div className="text-sm text-white/70 mt-1">{item.description}</div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-2xl font-bold">£{item.price}</span>
                  <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                    Bundle
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Suhoor & Iftar Times */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🌅</span>
                <div>
                  <div className="font-semibold">Suhoor Time</div>
                  <div className="text-white/70 text-sm">1:00 AM - 4:00 AM</div>
                </div>
              </div>
              <div className="text-sm text-white/80">
                Offer protein-rich meals, energy drinks, dates, and hydration packs.
              </div>
              <div className="mt-2 text-emerald-300 font-medium">+30% pricing multiplier</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🌇</span>
                <div>
                  <div className="font-semibold">Iftar Time</div>
                  <div className="text-white/70 text-sm">5:00 PM - 10:00 PM</div>
                </div>
              </div>
              <div className="text-sm text-white/80">
                Family bundles, dates, soup, main course, and desserts.
              </div>
              <div className="mt-2 text-emerald-300 font-medium">+25% pricing multiplier</div>
            </div>
          </div>
        </div>
      )}

      {/* Time Slots Overview */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {timeSlots.map((slot, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-900">{slot.name}</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                slot.demand === 'high' ? 'bg-emerald-100 text-emerald-700' :
                slot.demand === 'medium' ? 'bg-amber-100 text-amber-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {slot.demand}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">{slot.startTime} - {slot.endTime}</div>
            {slot.note && <div className="text-xs text-purple-600 mb-2">{slot.note}</div>}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Multiplier:</span>
              <span className={`font-semibold ${slot.suggestedMultiplier > 1 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {slot.suggestedMultiplier > 1 ? '+' : ''}{((slot.suggestedMultiplier - 1) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Price Recommendations */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Price Recommendations</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedPeriod === 'ramadan' ? 'Ramadan pricing strategy for maximum profit' : `${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} pricing optimization`}</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedPeriod === 'ramadan'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              Period: {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{rec.itemName}</div>
                  <div className="text-sm text-gray-500 mt-1">{rec.reason}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    <span className="line-through">{rec.currentPrice.toFixed(2)}</span>
                    <span className="mx-2">→</span>
                    <span className={`font-semibold ${rec.change === 'increase' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      £{rec.suggestedPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className={`text-sm font-medium mt-1 ${
                    rec.change === 'increase' ? 'text-emerald-600' :
                    rec.change === 'decrease' ? 'text-amber-600' : 'text-gray-600'
                  }`}>
                    {rec.change === 'increase' ? `+${((rec.suggestedPrice - rec.currentPrice) / rec.currentPrice * 100).toFixed(1)}%` :
                     rec.change === 'decrease' ? `-${((rec.currentPrice - rec.suggestedPrice) / rec.currentPrice * 100).toFixed(1)}%` : 'No change'}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${selectedPeriod === 'ramadan' ? 'bg-emerald-500' : 'bg-blue-600'}`}
                      style={{ width: `${rec.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{rec.confidence.toFixed(0)}%</span>
                </div>
                <button className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors ${
                  selectedPeriod === 'ramadan'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}>
                  Apply
                </button>
              </div>
            ))}
          </div>

          <div className={`mt-6 p-4 border rounded-xl ${
            selectedPeriod === 'ramadan'
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-emerald-50 border-emerald-200'
          }`}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="font-medium text-emerald-800">
                Estimated Revenue Lift: +{selectedPeriod === 'ramadan' ? '28%' : selectedPeriod === 'dinner' ? '18%' : '12%'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* UK Calendar Events - Complete & Inclusive */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">UK Calendar Events</h3>
              <p className="text-sm text-gray-500 mt-1">Complete event calendar with impact projections</p>
            </div>
            <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              {filteredEvents.length} Events
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categoryFilters.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="text-2xl">{event.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">{event.name}</div>
                  <div className="text-sm text-gray-500">{event.startDate}</div>
                  {event.startDate !== event.endDate && (
                    <div className="text-xs text-gray-400">to {event.endDate}</div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                    {event.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Occasions & Quiet Day Strategies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quiet Day Strategies */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiet Day Strategies</h3>
          <p className="text-sm text-gray-500 mb-4">Boost slow days with targeted promotions</p>
          <div className="space-y-3">
            {quietDayStrategies.map((strategy, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  {strategy.day.slice(0, 3)}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{strategy.day}</div>
                  <div className="text-sm text-gray-600">{strategy.strategy}</div>
                </div>
                <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                  {strategy.expectedLift}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Calendar Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Events</span>
              <span className="font-semibold text-gray-900">{calendarEvents.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Bank Holidays</span>
              <span className="font-semibold text-blue-600">{calendarEvents.filter(e => e.category === 'uk-bank-holiday').length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Religious Events</span>
              <span className="font-semibold text-emerald-600">{calendarEvents.filter(e => !['uk-bank-holiday', 'general'].includes(e.category)).length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Commercial Events</span>
              <span className="font-semibold text-teal-600">{calendarEvents.filter(e => e.category === 'general').length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
              <span className="text-emerald-700">Peak Impact Events</span>
              <span className="font-semibold text-emerald-700">+25-35%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}