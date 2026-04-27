import { useState } from 'react';


interface ComplianceCategory {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  requirements: {
    id: string;
    name: string;
    completed: boolean;
    evidence: string;
  }[];
}

export default function ComplianceScore() {
  const [categories, setCategories] = useState<ComplianceCategory[]>([
    {
      id: 'food-safety',
      name: 'Food Safety',
      score: 85,
      maxScore: 100,
      status: 'good',
      requirements: [
        { id: '1', name: 'SFBB Diary completed daily', completed: true, evidence: 'sfbb' },
        { id: '2', name: 'Temperature logs up to date', completed: true, evidence: 'temp' },
        { id: '3', name: 'HACCP plan in place', completed: true, evidence: 'haccp' },
        { id: '4', name: 'Food handler training certificates', completed: false, evidence: 'training' },
        { id: '5', name: 'Allergen information displayed', completed: true, evidence: 'allergen' },
      ],
    },
    {
      id: 'premises',
      name: 'Premises Condition',
      score: 72,
      maxScore: 100,
      status: 'warning',
      requirements: [
        { id: '1', name: 'Gas safety certificate valid', completed: true, evidence: 'gas' },
        { id: '2', name: 'Electrical PAT testing current', completed: false, evidence: 'electrical' },
        { id: '3', name: 'Fire risk assessment completed', completed: true, evidence: 'fire' },
        { id: '4', name: 'Pest control contract active', completed: false, evidence: 'pest' },
        { id: '5', name: 'Adequate ventilation', completed: true, evidence: 'vent' },
      ],
    },
    {
      id: 'licenses',
      name: 'Licenses & Permits',
      score: 100,
      maxScore: 100,
      status: 'excellent',
      requirements: [
        { id: '1', name: 'Food premises registration', completed: true, evidence: 'food-reg' },
        { id: '2', name: 'Alcohol license (if applicable)', completed: true, evidence: 'alcohol' },
        { id: '3', name: 'Music license (if applicable)', completed: true, evidence: 'music' },
        { id: '4', name: 'Outdoor seating permit (if applicable)', completed: true, evidence: 'outdoor' },
      ],
    },
    {
      id: 'documentation',
      name: 'Documentation',
      score: 60,
      maxScore: 100,
      status: 'critical',
      requirements: [
        { id: '1', name: 'Insurance certificates current', completed: true, evidence: 'insurance' },
        { id: '2', name: 'Staff DSL/DBS checks', completed: false, evidence: 'dsl' },
        { id: '3', name: 'Health & safety policy', completed: false, evidence: 'hs-policy' },
        { id: '4', name: 'Incident log maintained', completed: true, evidence: 'incident' },
        { id: '5', name: 'Equipment maintenance records', completed: false, evidence: 'equipment' },
      ],
    },
    {
      id: 'staff',
      name: 'Staff Training',
      score: 90,
      maxScore: 100,
      status: 'excellent',
      requirements: [
        { id: '1', name: 'Level 2 Food Safety certificates', completed: true, evidence: 'level2' },
        { id: '2', name: 'Allergen awareness training', completed: true, evidence: 'allergen-train' },
        { id: '3', name: 'First aid trained staff', completed: false, evidence: 'firstaid' },
        { id: '4', name: 'HACCP training for supervisors', completed: true, evidence: 'haccp-train' },
      ],
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const overallScore = Math.round(
    categories.reduce((acc, cat) => acc + cat.score, 0) / categories.length
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-green-500', text: 'text-green-600', bgLight: 'bg-green-50' };
    if (score >= 60) return { bg: 'bg-yellow-500', text: 'text-yellow-600', bgLight: 'bg-yellow-50' };
    if (score >= 40) return { bg: 'bg-orange-500', text: 'text-orange-600', bgLight: 'bg-orange-50' };
    return { bg: 'bg-red-500', text: 'text-red-600', bgLight: 'bg-red-50' };
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Attention';
    return 'Critical';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'good':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const incompleteItems = categories
    .flatMap(cat => cat.requirements.filter(req => !req.completed))
    .map(item => ({
      ...item,
      category: categories.find(cat => cat.requirements.includes(item))?.name || ''
    }));

  const toggleRequirement = (categoryId: string, requirementId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        const updatedRequirements = cat.requirements.map(req => {
          if (req.id === requirementId) {
            return { ...req, completed: !req.completed };
          }
          return req;
        });
        const completedCount = updatedRequirements.filter(r => r.completed).length;
        const newScore = Math.round((completedCount / updatedRequirements.length) * 100);
        return { ...cat, requirements: updatedRequirements, score: newScore };
      }
      return cat;
    }));
  };

  const overallColors = getScoreColor(overallScore);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Your Compliance Score</h1>
            <p className="text-blue-100">
              Based on UK Food Standards Agency and Local Authority requirements
            </p>
          </div>
          <div className="relative">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.2)" strokeWidth="12" fill="none" />
              <circle cx="80" cy="80" r="70" stroke="white" strokeWidth="12" fill="none" strokeDasharray={`${(overallScore / 100) * 440} 440`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{overallScore}%</span>
              <span className="text-blue-200 text-sm">{getScoreLabel(overallScore)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Cards */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Score by Category</h2>
          {categories.map((category) => {
            const colors = getScoreColor(category.score);
            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(category.status)}
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${colors.text}`}>{category.score}%</span>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${selectedCategory === category.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${colors.bg} h-2 rounded-full transition-all`} style={{ width: `${category.score}%` }} />
                </div>

                {selectedCategory === category.id && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Requirements Checklist</h4>
                    <div className="space-y-3">
                      {category.requirements.map((req) => (
                        <label key={req.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                          <input type="checkbox" checked={req.completed} onChange={() => toggleRequirement(category.id, req.id)} className="w-5 h-5 mt-0.5 text-green-600 rounded focus:ring-green-500" />
                          <div className="flex-1">
                            <span className={`font-medium ${req.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{req.name}</span>
                            {req.completed && <span className="ml-2 text-xs text-green-600 font-medium">Verified</span>}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Plan Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">FHRS Rating Estimate</h3>
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${overallScore >= 80 ? 'bg-green-100' : overallScore >= 60 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                <span className={`text-3xl font-bold ${overallScore >= 80 ? 'text-green-600' : overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {overallScore >= 80 ? '5' : overallScore >= 60 ? '4' : overallScore >= 40 ? '3' : '2'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Estimated Food Hygiene Rating</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Action Plan</h3>
            <div className="space-y-3">
              {incompleteItems.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                  <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
              ))}
              {incompleteItems.length === 0 && (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">All requirements met!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}