import { useState } from 'react';


interface SeasonalAlert {
  id: string;
  title: string;
  description: string;
  type: 'weather' | 'regulatory' | 'food-safety' | 'health';
  season: 'spring' | 'summer' | 'autumn' | 'winter' | 'all';
  priority: 'high' | 'medium' | 'low';
  actionItems: string[];
  active: boolean;
}

interface SeasonalPromo {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  actionItems: string[];
}

export default function SeasonalAlerts() {
  const [alerts, setAlerts] = useState<SeasonalAlert[]>([
    { id: '1', title: 'Easter Trading Requirements', description: 'Prepare for increased Easter foot traffic with updated allergen information for seasonal specials.', type: 'regulatory', season: 'spring', priority: 'high', actionItems: ['Update Easter menu allergen information', 'Book Easter Monday food safety check', 'Stock up on temperature monitoring supplies'], active: true },
    { id: '2', title: 'Pest Control - Spring Infestation Risk', description: 'Spring brings increased pest activity. Ensure all entry points are secured.', type: 'food-safety', season: 'spring', priority: 'high', actionItems: ['Schedule spring pest inspection', 'Check door seals and fly screens', 'Clear exterior waste storage areas'], active: true },
    { id: '3', title: 'BBQ Season Food Safety', description: 'Higher temperatures increase food safety risks. Extra vigilance needed for outdoor dining.', type: 'food-safety', season: 'summer', priority: 'high', actionItems: ['Increase fridge temperature checks to 3x daily', 'Use blast chillers for rapid cooling', 'Extend "use by" date caution period'], active: true },
    { id: '4', title: 'Heatwave Operating Procedures', description: 'When temperatures exceed 30C, additional food safety measures are required.', type: 'weather', season: 'summer', priority: 'high', actionItems: ['Activate heatwave food safety plan', 'Move high-risk foods to coldest fridges', 'Increase ice supply for transport'], active: true },
    { id: '5', title: 'Back to School Allergen Review', description: 'September brings new dietary requirements. Update allergen information for returning customers.', type: 'food-safety', season: 'autumn', priority: 'medium', actionItems: ['Review and update allergen matrices', 'Schedule staff allergen refresher training', 'Update online allergen menus'], active: true },
    { id: '6', title: 'Christmas Trading Compliance', description: 'The busiest time requires careful planning. Ensure all licenses cover extended hours.', type: 'regulatory', season: 'winter', priority: 'high', actionItems: ['Apply for extended hours licenses NOW', 'Book December food safety inspection early', 'Update Christmas menu allergen cards'], active: true },
    { id: '7', title: 'Daily Temperature Monitoring', description: 'Year-round requirement. Fridges must be 0-5C, freezers at -18C or below.', type: 'food-safety', season: 'all', priority: 'high', actionItems: ['Check fridge temps morning and evening', 'Record all readings in SFBB diary', 'Calibrate thermometers monthly'], active: true },
  ]);

  const [selectedSeason, setSelectedSeason] = useState<string>('all');

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  const currentSeason = getCurrentSeason();

  const seasons = [
    { id: 'all', label: 'All Seasons', color: 'bg-gray-500' },
    { id: 'spring', label: 'Spring', color: 'bg-green-500' },
    { id: 'summer', label: 'Summer', color: 'bg-yellow-500' },
    { id: 'autumn', label: 'Autumn', color: 'bg-orange-500' },
    { id: 'winter', label: 'Winter', color: 'bg-blue-500' },
  ];

  // UK Bank Holidays and Special Events - Inclusive for all communities
  const ukEvents: SeasonalPromo[] = [
    {
      id: '1',
      title: 'Bank Holidays',
      description: 'Major public holidays with increased trading opportunities',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      actionItems: ['Plan staffing for extended trading hours', 'Update menu for holiday specials', 'Check license conditions for Sundays'],
    },
    {
      id: '2',
      title: 'Sporting Events',
      description: 'Football, rugby, cricket - big match days drive footfall',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      actionItems: ['Prepare match-day specials', 'Increase stock for high-demand items', 'Promote delivery during games'],
    },
    {
      id: '3',
      title: 'Cultural Celebrations',
      description: 'Bonfire Night, VE Day, bank holidays - celebrate British culture',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      actionItems: ['Plan themed menu items', 'Prepare for late-night closures', 'Coordinate with local events'],
    },
    {
      id: '4',
      title: 'School Holidays',
      description: 'Family dining peaks during half-terms and summer breaks',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      actionItems: ['Create kids menus', 'Plan family meal deals', 'Prepare allergen info for families'],
    },
  ];

  const filteredAlerts = alerts.filter(alert => {
    if (selectedSeason !== 'all' && alert.season !== selectedSeason && alert.season !== 'all') return false;
    return true;
  });

  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-green-100 text-green-700 border-green-200',
  };

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  return (
    <>
      {/* UK Bank Holidays & Special Events Section - Inclusive */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">UK Bank Holidays & Special Events</h2>
        <p className="text-sm text-gray-600 mb-4">Plan your trading strategy around Britain's major public holidays and events</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ukEvents.map((event) => (
            <div
              key={event.id}
              className="p-5 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 hover:border-indigo-200 transition-all shadow-sm"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-3">
                {event.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{event.description}</p>
              <div className="space-y-1">
                {event.actionItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-3 h-3 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Season Selector */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {seasons.map((season) => (
            <button
              key={season.id}
              onClick={() => setSelectedSeason(season.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                selectedSeason === season.id
                  ? `${season.color} text-white shadow-md`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {season.label}
              {season.id === currentSeason && (
                <span className="ml-1 text-xs bg-white/30 px-2 py-0.5 rounded-full">Current</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Season Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl">
            {currentSeason === 'spring' && 'S'}
            {currentSeason === 'summer' && 'Su'}
            {currentSeason === 'autumn' && 'A'}
            {currentSeason === 'winter' && 'W'}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 capitalize">{currentSeason} Compliance Checklist</h3>
            <p className="text-gray-600">
              {currentSeason === 'spring' && 'Pest control, Easter trading, fresh produce handling'}
              {currentSeason === 'summer' && 'Heatwave protocols, outdoor dining, BBQ safety'}
              {currentSeason === 'autumn' && 'Allergen reviews, Halloween, stock rotation'}
              {currentSeason === 'winter' && 'Christmas planning, freezer management, New Year compliance'}
            </p>
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {selectedSeason === 'all' ? 'All Alerts' : `${selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)} Alerts`}
          <span className="ml-2 text-sm font-normal text-gray-500">({filteredAlerts.length})</span>
        </h3>

        {filteredAlerts.map((alert) => (
          <div key={alert.id} className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all ${alert.active ? '' : 'opacity-50'}`}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    alert.type === 'weather' ? 'bg-blue-100 text-blue-600' :
                    alert.type === 'regulatory' ? 'bg-purple-100 text-purple-600' :
                    alert.type === 'food-safety' ? 'bg-red-100 text-red-600' :
                    'bg-pink-100 text-pink-600'
                  }`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${priorityColors[alert.priority]}`}>
                        {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
                      </span>
                      {alert.season !== 'all' && (
                        <span className="text-xs text-gray-500 capitalize">{alert.season}</span>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={alert.active} onChange={() => toggleAlert(alert.id)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {alert.active && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">Action Items</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {alert.actionItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
