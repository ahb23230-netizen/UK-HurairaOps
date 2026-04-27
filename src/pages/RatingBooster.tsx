import { useState } from 'react';
interface RatingArea {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  weight: number;
  description: string;
  tips: string[];
  improvements: string[];
}

interface ChecklistItem {
  id: string;
  task: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  category: string;
  completed: boolean;
  critical: boolean;
}

interface ProgressMilestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  targetRating: number;
}

export default function RatingBooster() {
  const [currentRating, setCurrentRating] = useState(3);
  const [targetRating, setTargetRating] = useState(5);
  const [showImprovementPlan, setShowImprovementPlan] = useState(false);

  const ratingAreas: RatingArea[] = [
    {
      id: 'confidence',
      name: 'Confidence in Management',
      score: 10,
      maxScore: 30,
      weight: 50,
      description: 'How well you demonstrate food safety management',
      tips: [
        'Complete SFBB diary daily',
        'Show evidence of regular self-checks',
        'Keep training records up to date',
        'Document all food safety decisions',
      ],
      improvements: [
        'Implement daily SFBB diary checks',
        'Schedule monthly management reviews',
        'Create staff training calendar',
      ],
    },
    {
      id: 'hygiene',
      name: 'Hygiene',
      score: 10,
      maxScore: 30,
      weight: 25,
      description: 'Cleanliness and food handling practices',
      tips: [
        'Check fridge temperatures twice daily',
        'Separate raw and cooked foods',
        'Sanitise all surfaces regularly',
        'Use colour-coded chopping boards',
      ],
      improvements: [
        'Install temperature monitoring system',
        'Update sanitisation schedule',
        'Add colour-coded equipment',
      ],
    },
    {
      id: 'structural',
      name: 'Structural',
      score: 10,
      maxScore: 30,
      weight: 25,
      description: 'Condition of your premises and facilities',
      tips: [
        'Fix any damaged surfaces immediately',
        'Ensure proper ventilation',
        'Check drainage regularly',
        'Maintain pest prevention measures',
      ],
      improvements: [
        'Schedule maintenance audit',
        'Upgrade ventilation filters',
        'Review pest control contract',
      ],
    },
  ];

  const checklistItems: ChecklistItem[] = [
    { id: '1', task: 'Check fridge temperatures', frequency: 'daily', category: 'Temperature', completed: false, critical: true },
    { id: '2', task: 'Check freezer temperatures', frequency: 'daily', category: 'Temperature', completed: false, critical: true },
    { id: '3', task: 'Record all food deliveries', frequency: 'daily', category: 'Documentation', completed: false, critical: true },
    { id: '4', task: 'Complete SFBB diary', frequency: 'daily', category: 'Documentation', completed: false, critical: true },
    { id: '5', task: 'Check food use-by dates', frequency: 'daily', category: 'Food Safety', completed: false, critical: true },
    { id: '6', task: 'Clean and sanitise surfaces', frequency: 'daily', category: 'Hygiene', completed: false, critical: false },
    { id: '7', task: 'Wash hands signage check', frequency: 'daily', category: 'Hygiene', completed: false, critical: true },
    { id: '8', task: 'Deep clean kitchen equipment', frequency: 'weekly', category: 'Hygiene', completed: false, critical: false },
    { id: '9', task: 'Check pest control measures', frequency: 'weekly', category: 'Structural', completed: false, critical: true },
    { id: '10', task: 'Review stock rotation', frequency: 'weekly', category: 'Food Safety', completed: false, critical: false },
    { id: '11', task: 'Clean ventilation filters', frequency: 'monthly', category: 'Structural', completed: false, critical: false },
    { id: '12', task: 'Staff training refresher', frequency: 'monthly', category: 'Training', completed: false, critical: false },
    { id: '13', task: 'Review cleaning schedule', frequency: 'monthly', category: 'Hygiene', completed: false, critical: false },
    { id: '14', task: 'Check drainage systems', frequency: 'monthly', category: 'Structural', completed: false, critical: false },
  ];

  const progressMilestones: ProgressMilestone[] = [
    { id: '1', title: 'Foundation', description: 'Complete basic documentation and temperature logs', completed: true, targetRating: 3 },
    { id: '2', title: 'Documentation Mastery', description: 'Full SFBB implementation with daily reviews', completed: true, targetRating: 4 },
    { id: '3', title: 'Hygiene Excellence', description: 'Implement enhanced sanitisation procedures', completed: false, targetRating: 4 },
    { id: '4', title: 'Management Confidence', description: 'Complete management review system', completed: false, targetRating: 5 },
    { id: '5', title: '5-Star Ready', description: 'Full compliance achieved', completed: false, targetRating: 5 },
  ];

  const getStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-8 h-8 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const calculateProjectedRating = () => {
    let totalWeight = 0;
    let weightedScore = 0;

    ratingAreas.forEach(area => {
      totalWeight += area.weight;
      weightedScore += (area.score / area.maxScore) * area.weight;
    });

    return Math.round((weightedScore / totalWeight) * 5 * 10) / 10;
  };

  const projectedRating = calculateProjectedRating();

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold">5-Star Rating Booster</h3>
              <p className="text-emerald-100 text-sm mt-1">
                Your path to excellence in food safety
              </p>
            </div>
          </div>
          <div className="text-center bg-white/10 rounded-xl px-6 py-3">
            <div className="text-sm text-emerald-200 mb-1">Current Rating</div>
            <div className="flex gap-1 justify-center">
              {getStars(currentRating)}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-red-600">{currentRating}</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Current Rating</h4>
          <p className="text-sm text-gray-500">Your FHRS score</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-yellow-600">{targetRating}</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Target Rating</h4>
          <p className="text-sm text-gray-500">Your goal</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-emerald-600">{projectedRating}</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Projected Rating</h4>
          <p className="text-sm text-gray-500">Based on current scores</p>
        </div>
      </div>

      {/* Rating Areas Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Rating Areas Breakdown</h3>
          <p className="text-sm text-gray-500">The three areas that determine your FHRS score</p>
        </div>
        <div className="p-6 space-y-6">
          {ratingAreas.map((area) => (
            <div key={area.id} className="border border-gray-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{area.name}</h4>
                  <p className="text-sm text-gray-500">{area.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round((area.score / area.maxScore) * 100)}%
                  </div>
                  <div className="text-xs text-gray-400">
                    {area.score}/{area.maxScore} points • {area.weight}% weight
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all"
                  style={{ width: `${(area.score / area.maxScore) * 100}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">💡 Pro Tips</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {area.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">📋 Recommended Improvements</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {area.improvements.map((imp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500">→</span>
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Improvement Plan</h4>
              <p className="text-sm text-blue-100">Get your personalised roadmap</p>
            </div>
          </div>
          <button
            onClick={() => setShowImprovementPlan(!showImprovementPlan)}
            className="w-full bg-white text-blue-600 px-4 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            {showImprovementPlan ? 'Hide Plan' : 'Generate Plan'}
          </button>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Track Progress</h4>
              <p className="text-sm text-emerald-100">Monitor your journey to 5-star</p>
            </div>
          </div>
          <button className="w-full bg-white text-emerald-600 px-4 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
            View Dashboard
          </button>
        </div>
      </div>

      {/* Improvement Plan */}
      {showImprovementPlan && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 bg-emerald-50">
            <h3 className="text-lg font-semibold text-gray-900">Your 5-Star Improvement Plan</h3>
            <p className="text-sm text-gray-500">Step-by-step actions to reach your target rating</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {progressMilestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    milestone.completed
                      ? 'border-emerald-200 bg-emerald-50'
                      : milestone.targetRating <= targetRating
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    milestone.completed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}>
                    {milestone.completed ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-0.5">
                      {getStars(milestone.targetRating)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Compliance Checklist */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Compliance Checklist</h3>
          <p className="text-sm text-gray-500">Daily, weekly, and monthly tasks for 5-star compliance</p>
        </div>
        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Daily</span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">Weekly</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">Monthly</span>
          </div>
          <div className="space-y-3">
            {checklistItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  item.completed
                    ? 'border-emerald-200 bg-emerald-50'
                    : item.critical
                      ? 'border-red-200 bg-red-50'
                      : 'border-gray-200 bg-gray-50 hover:border-blue-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <span className={`font-medium ${item.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                    {item.task}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.frequency === 'daily' ? 'bg-blue-100 text-blue-700' :
                    item.frequency === 'weekly' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {item.frequency}
                  </span>
                  {item.critical && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      Critical
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FSA Tips Banner */}
      <div className="mt-8 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-semibold">FSA Guidelines Reminder</h4>
            <p className="text-sm text-slate-300 mt-1">
              Your FHRS rating is displayed on the door of your premises and online.
              Maintain consistent compliance to achieve and retain a 5-star rating.
              <a href="https://www.food.gov.uk/ratings" target="_blank" rel="noopener noreferrer" className="underline ml-1">
                Learn more from FSA
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
