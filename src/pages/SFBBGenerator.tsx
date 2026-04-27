import { useState } from 'react';


interface SFBBSection {
  id: string;
  title: string;
  completed: boolean;
  content: string;
}

interface SFBBDay {
  day: string;
  date: string;
  activities: {
    openingChecks: boolean;
    deliveryChecks: boolean;
    cookingTemperatures: { dish: string; temp: string }[];
    coolingTimes: { dish: string; startTime: string; endTime: string }[];
    fridgeTemps: { location: string; temp: string }[];
    freezerTemps: { location: string; temp: string }[];
    cleaning: boolean;
    waste: boolean;
    staffTraining: string;
    incidents: string;
  };
}

export default function SFBBGenerator() {
  const [businessType, setBusinessType] = useState('');
  const [premisesName, setPremisesName] = useState('');
  const [staffCount, setStaffCount] = useState('');
  const [foodTypes, setFoodTypes] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);

  const [weeklyLog, setWeeklyLog] = useState<SFBBDay[]>([]);

  const foodTypesOptions = [
    'Raw meat/poultry',
    'Cooked meat',
    'Fish/seafood',
    'Dairy products',
    'Eggs',
    'Fresh vegetables',
    'Ready-to-eat salads',
    'Hot food (held > 2 hours)',
    'Cold food (held > 2 hours)',
    'Baked goods',
  ];

  const businessTypes = [
    'Restaurant/Café',
    'Takeaway',
    'Pub/Bar',
    'Hotel Kitchen',
    'Catering Business',
    'Food Truck',
    'Care Home',
    'School/Canteen',
  ];

  const generateSFBB = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - baseDate.getDay() + 1);

    const newWeeklyLog: SFBBDay[] = days.map((day, index) => {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + index);
      return {
        day,
        date: date.toISOString().split('T')[0],
        activities: {
          openingChecks: false,
          deliveryChecks: index === 0 || index === 3,
          cookingTemperatures: [],
          coolingTimes: [],
          fridgeTemps: [
            { location: 'Main Fridge 1', temp: '' },
            { location: 'Main Fridge 2', temp: '' },
          ],
          freezerTemps: [
            { location: 'Freezer 1', temp: '' },
          ],
          cleaning: false,
          waste: false,
          staffTraining: '',
          incidents: '',
        },
      };
    });

    setWeeklyLog(newWeeklyLog);
    setGenerated(true);
  };

  const updateTempLog = (dayIndex: number, type: 'fridge' | 'freezer', locationIndex: number, value: string) => {
    const newLog = [...weeklyLog];
    if (type === 'fridge') {
      newLog[dayIndex].activities.fridgeTemps[locationIndex].temp = value;
    } else {
      newLog[dayIndex].activities.freezerTemps[locationIndex].temp = value;
    }
    setWeeklyLog(newLog);
  };

  const toggleActivity = (dayIndex: number, activity: keyof SFBBDay['activities']) => {
    const newLog = [...weeklyLog];
    (newLog[dayIndex].activities[activity] as boolean) = !(newLog[dayIndex].activities[activity] as boolean);
    setWeeklyLog(newLog);
  };

  const addCookingTemp = (dayIndex: number) => {
    const newLog = [...weeklyLog];
    newLog[dayIndex].activities.cookingTemperatures.push({ dish: '', temp: '' });
    setWeeklyLog(newLog);
  };

  const updateCookingTemp = (dayIndex: number, itemIndex: number, field: 'dish' | 'temp', value: string) => {
    const newLog = [...weeklyLog];
    newLog[dayIndex].activities.cookingTemperatures[itemIndex][field] = value;
    setWeeklyLog(newLog);
  };

  const handleFoodTypeToggle = (type: string) => {
    setFoodTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <>
      {!generated ? (
        /* Setup Form */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Configure Your SFBB Diary</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Premises Name</label>
              <input
                type="text"
                value={premisesName}
                onChange={(e) => setPremisesName(e.target.value)}
                placeholder="e.g., The Golden Dragon Restaurant"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select business type...</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Staff</label>
              <select
                value={staffCount}
                onChange={(e) => setStaffCount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select staff count...</option>
                <option value="1-5">1-5</option>
                <option value="6-10">6-10</option>
                <option value="11-20">11-20</option>
                <option value="21+">21+</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Food Categories Handled <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-4">Select all food categories your business handles:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {foodTypesOptions.map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                    foodTypes.includes(type)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={foodTypes.includes(type)}
                    onChange={() => handleFoodTypeToggle(type)}
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={generateSFBB}
            disabled={!businessType || foodTypes.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition-colors"
          >
            Generate SFBB Diary
          </button>
        </div>
      ) : (
        /* Generated SFBB Diary */
        <div>
          {/* Week Navigation */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Week Starting: {weeklyLog[0]?.date}</h3>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                    Week 1
                  </button>
                </div>
              </div>
            </div>

            <div className="flex overflow-x-auto">
              {weeklyLog.map((day, index) => (
                <button
                  key={day.day}
                  onClick={() => setCurrentDay(index)}
                  className={`flex-1 min-w-0 px-4 py-3 text-center border-b-2 transition-colors ${
                    currentDay === index
                      ? 'border-green-500 text-green-600 bg-green-50'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-sm font-medium">{day.day}</div>
                  <div className="text-xs text-gray-400">{day.date}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Daily Log */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">{weeklyLog[currentDay]?.day}'s Checklist</h3>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={weeklyLog[currentDay]?.activities.openingChecks || false}
                    onChange={() => toggleActivity(currentDay, 'openingChecks')}
                    className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Opening Checks</span>
                    <p className="text-sm text-gray-500">Check fridge/freezer temps, equipment, cleanliness</p>
                  </div>
                </label>
              </div>

              {weeklyLog[currentDay]?.activities.deliveryChecks && (
                <div className="border border-gray-200 rounded-xl p-4 bg-blue-50">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-green-600 rounded focus:ring-green-500" />
                    <div>
                      <span className="font-medium text-gray-900">Delivery Day</span>
                      <p className="text-sm text-gray-500">Check deliveries, temperatures, best before dates</p>
                    </div>
                  </label>
                </div>
              )}

              <div className="border border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-4">Fridge Temperatures (Target: 0-5C)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weeklyLog[currentDay]?.activities.fridgeTemps.map((fridge, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-32">{fridge.location}:</span>
                      <input
                        type="text"
                        value={fridge.temp}
                        onChange={(e) => updateTempLog(currentDay, 'fridge', index, e.target.value)}
                        placeholder="C"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-4">Freezer Temperatures (Target: -18C or below)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weeklyLog[currentDay]?.activities.freezerTemps.map((freezer, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-32">{freezer.location}:</span>
                      <input
                        type="text"
                        value={freezer.temp}
                        onChange={(e) => updateTempLog(currentDay, 'freezer', index, e.target.value)}
                        placeholder="C"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">Cooking Temperatures</h4>
                  <button onClick={() => addCookingTemp(currentDay)} className="text-sm text-green-600 hover:text-green-700 font-medium">
                    + Add Dish
                  </button>
                </div>
                <div className="space-y-3">
                  {weeklyLog[currentDay]?.activities.cookingTemperatures.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={item.dish}
                        onChange={(e) => updateCookingTemp(currentDay, index, 'dish', e.target.value)}
                        placeholder="Dish name"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        value={item.temp}
                        onChange={(e) => updateCookingTemp(currentDay, index, 'temp', e.target.value)}
                        placeholder="Temp (C)"
                        className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={weeklyLog[currentDay]?.activities.cleaning || false}
                    onChange={() => toggleActivity(currentDay, 'cleaning')}
                    className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Premises Cleaned</span>
                    <p className="text-sm text-gray-500">All surfaces, equipment, and floors sanitised</p>
                  </div>
                </label>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={weeklyLog[currentDay]?.activities.waste || false}
                    onChange={() => toggleActivity(currentDay, 'waste')}
                    className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Waste Disposed</span>
                    <p className="text-sm text-gray-500">Bins emptied, waste stored securely</p>
                  </div>
                </label>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-3">Staff Training Notes</h4>
                <textarea
                  value={weeklyLog[currentDay]?.activities.staffTraining || ''}
                  onChange={(e) => {
                    const newLog = [...weeklyLog];
                    newLog[currentDay].activities.staffTraining = e.target.value;
                    setWeeklyLog(newLog);
                  }}
                  placeholder="Note any training, incidents, or reminders..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="border border-red-200 rounded-xl p-4 bg-red-50">
                <h4 className="font-medium text-red-900 mb-3">Incidents / Food Safety Issues</h4>
                <textarea
                  value={weeklyLog[currentDay]?.activities.incidents || ''}
                  onChange={(e) => {
                    const newLog = [...weeklyLog];
                    newLog[currentDay].activities.incidents = e.target.value;
                    setWeeklyLog(newLog);
                  }}
                  placeholder="Record any food safety incidents, complaints, or actions taken..."
                  rows={3}
                  className="w-full px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 bg-white"
                />
              </div>
            </div>

            <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition-colors">
              Save {weeklyLog[currentDay]?.day}'s Log
            </button>
          </div>
        </div>
      )}
    </>
  );
}