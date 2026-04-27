import { useState } from 'react';
interface Competitor {
  id: string;
  name: string;
  address: string;
  rating: number;
  fhrsScore: number;
  cuisine: string;
  priceRange: string;
  revenueEstimate: string;
  distance: string;
  complianceScore: number;
}

export default function CompetitorBenchmarking() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'opportunities'>('overview');

  const competitors: Competitor[] = [
    { id: '1', name: 'The Golden Dragon', address: '123 High Street', rating: 4.5, fhrsScore: 5, cuisine: 'Chinese', priceRange: '££', revenueEstimate: '£2.5M/year', distance: '0.3 miles', complianceScore: 92 },
    { id: '2', name: 'Bella Italia', address: '45 Church Lane', rating: 4.2, fhrsScore: 4, cuisine: 'Italian', priceRange: '£££', revenueEstimate: '£1.8M/year', distance: '0.5 miles', complianceScore: 85 },
    { id: '3', name: 'Spice Garden', address: '78 Market Square', rating: 4.7, fhrsScore: 5, cuisine: 'Indian', priceRange: '££', revenueEstimate: '£3.2M/year', distance: '0.8 miles', complianceScore: 96 },
    { id: '4', name: 'The Burger Joint', address: '12 Station Road', rating: 3.9, fhrsScore: 3, cuisine: 'Fast Food', priceRange: '£', revenueEstimate: '£900K/year', distance: '0.4 miles', complianceScore: 68 },
    { id: '5', name: 'Sushi Master', address: '56 Park Avenue', rating: 4.6, fhrsScore: 5, cuisine: 'Japanese', priceRange: '££££', revenueEstimate: '£2.1M/year', distance: '1.2 miles', complianceScore: 94 },
  ];

  const [yourBusiness] = useState({
    name: 'Your Restaurant',
    rating: 4.1,
    fhrsScore: 4,
    complianceScore: 78,
    revenueEstimate: '£1.5M/year',
  });

  const getRatingColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const calculateAdvantage = (metric: 'rating' | 'fhrsScore' | 'complianceScore') => {
    const avgCompetitor = competitors.reduce((acc, c) => acc + c[metric], 0) / competitors.length;
    const yourValue = metric === 'rating' ? yourBusiness.rating : metric === 'fhrsScore' ? yourBusiness.fhrsScore : yourBusiness.complianceScore;
    const diff = yourValue - avgCompetitor;
    return { diff: diff.toFixed(1), better: diff > 0 };
  };

  const ratingAdv = calculateAdvantage('rating');
  const fhrsAdv = calculateAdvantage('fhrsScore');
  const complianceAdv = calculateAdvantage('complianceScore');

  const revenueOpportunities = [
    { category: 'Menu Pricing', opportunity: 'Add premium dishes +12% avg ticket', impact: 'Potential £180K/year', difficulty: 'Medium' },
    { category: 'Compliance Score', opportunity: 'Improve from 78 to 92 = +23% customer trust', impact: 'Potential £120K/year', difficulty: 'Low' },
    { category: 'Rating Boost', opportunity: '4.1 to 4.5 stars = +15% bookings', impact: 'Potential £90K/year', difficulty: 'Medium' },
    { category: 'Peak Hours', opportunity: 'Optimize 6-8 PM pricing', impact: 'Potential £60K/year', difficulty: 'High' },
    { category: 'FHR Score', opportunity: '4 to 5 stars = regulatory advantage', impact: 'Potential £45K/year', difficulty: 'Low' },
  ];

  const totalPotential = revenueOpportunities.reduce((acc, opp) => {
    const value = parseInt(opp.impact.replace(/[^0-9]/g, ''));
    return acc + value;
  }, 0);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Competitive Intelligence</h3>
              <p className="text-violet-100 text-sm mt-1">
                Know where you stand vs competitors
              </p>
            </div>
          </div>
          <div className="text-center bg-white/10 rounded-xl px-6 py-3">
            <div className="text-sm text-violet-200 mb-1">Revenue Opportunity</div>
            <div className="text-2xl font-bold">+£{totalPotential.toLocaleString()}/year</div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-sm">Your Rating</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${ratingAdv.better ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {ratingAdv.better ? '+' : ''}{ratingAdv.diff} vs avg
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            {getStarRating(yourBusiness.rating)}
            <span className="text-2xl font-bold text-gray-900 ml-2">{yourBusiness.rating}</span>
          </div>
          <p className="text-xs text-gray-500">Avg competitors: {(competitors.reduce((acc, c) => acc + c.rating, 0) / competitors.length).toFixed(1)}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-sm">FHRS Score</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${fhrsAdv.better ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {fhrsAdv.better ? '+' : ''}{fhrsAdv.diff} vs avg
            </span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-bold text-gray-900">{yourBusiness.fhrsScore}</span>
            <span className="text-gray-400">/ 5</span>
            <div className="flex gap-0.5 ml-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className={`w-5 h-5 ${star <= yourBusiness.fhrsScore ? 'text-emerald-500' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500">Avg competitors: {(competitors.reduce((acc, c) => acc + c.fhrsScore, 0) / competitors.length).toFixed(1)}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-sm">Compliance Score</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${complianceAdv.better ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {complianceAdv.better ? '+' : ''}{complianceAdv.diff} vs avg
            </span>
          </div>
          <div className="mb-4">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900">{yourBusiness.complianceScore}</span>
              <span className="text-gray-400 pb-1">/ 100</span>
            </div>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  yourBusiness.complianceScore >= 90 ? 'bg-emerald-500' :
                  yourBusiness.complianceScore >= 70 ? 'bg-blue-500' :
                  'bg-yellow-500'
                }`}
                style={{ width: `${yourBusiness.complianceScore}%` }}
              ></div>
            </div>
          </div>
          <p className="text-xs text-gray-500">Avg competitors: {Math.round(competitors.reduce((acc, c) => acc + c.complianceScore, 0) / competitors.length)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="border-b border-gray-100">
          <div className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-violet-600 text-violet-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Competitors Overview
            </button>
            <button
              onClick={() => setActiveTab('detailed')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'detailed'
                  ? 'border-violet-600 text-violet-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Detailed Analysis
            </button>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'opportunities'
                  ? 'border-violet-600 text-violet-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Revenue Opportunities
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {competitors.map((competitor) => (
                  <div key={competitor.id} className="border border-gray-200 rounded-xl p-4 hover:border-violet-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{competitor.name}</h4>
                        <p className="text-sm text-gray-500">{competitor.address}</p>
                      </div>
                      <span className="text-xs text-gray-400">{competitor.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">{getStarRating(competitor.rating)}</div>
                      <span className="text-sm font-medium">{competitor.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-emerald-600">FHRS {competitor.fhrsScore}/5</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(competitor.complianceScore)}`}>
                        Score: {competitor.complianceScore}
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Revenue:</span>
                        <span className="font-medium text-gray-900">{competitor.revenueEstimate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'detailed' && (
            <div className="space-y-6">
              <div className="bg-violet-50 rounded-xl p-4">
                <h4 className="font-semibold text-violet-900 mb-2">Your Position Analysis</h4>
                <p className="text-sm text-violet-700">
                  You're currently <strong>below average</strong> in compliance score ({yourBusiness.complianceScore} vs avg {Math.round(competitors.reduce((acc, c) => acc + c.complianceScore, 0) / competitors.length)}).
                  Improving your FHRS score to 5 stars would put you in the <strong>top 20%</strong> of competitors.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Competitor</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Rating</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">FHRS</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Compliance</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Revenue</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Gap</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-violet-50">
                      <td className="py-3 px-4 font-semibold text-violet-900">Your Business</td>
                      <td className="text-center py-3 px-4 font-semibold">{yourBusiness.rating}</td>
                      <td className="text-center py-3 px-4 font-semibold">{yourBusiness.fhrsScore}</td>
                      <td className="text-center py-3 px-4 font-semibold">{yourBusiness.complianceScore}</td>
                      <td className="text-center py-3 px-4 font-semibold">{yourBusiness.revenueEstimate}</td>
                      <td className="text-center py-3 px-4">-</td>
                    </tr>
                    {competitors.map((comp) => {
                      const revenueGap = parseInt(comp.revenueEstimate.replace(/[^0-9]/g, '')) - parseInt(yourBusiness.revenueEstimate.replace(/[^0-9]/g, ''));
                      return (
                        <tr key={comp.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <span className="font-medium text-gray-900">{comp.name}</span>
                              <span className="text-xs text-gray-400 ml-2">{comp.distance}</span>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4">
                            <div className="flex justify-center">{getStarRating(comp.rating)}</div>
                          </td>
                          <td className="text-center py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              comp.fhrsScore >= 5 ? 'bg-emerald-100 text-emerald-700' :
                              comp.fhrsScore >= 4 ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {comp.fhrsScore}/5
                            </span>
                          </td>
                          <td className="text-center py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(comp.complianceScore)}`}>
                              {comp.complianceScore}
                            </span>
                          </td>
                          <td className="text-center py-3 px-4 text-sm">{comp.revenueEstimate}</td>
                          <td className="text-center py-3 px-4">
                            <span className={`text-sm font-medium ${revenueGap > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                              {revenueGap > 0 ? '+' : ''}{revenueGap > 0 ? '' : ''}£{(revenueGap / 1000).toFixed(0)}K
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'opportunities' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 text-white mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg">Total Revenue Opportunity</h4>
                    <p className="text-emerald-100 text-sm">Based on competitive analysis</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">+£{totalPotential.toLocaleString()}/year</div>
                    <p className="text-emerald-100 text-sm">Potential increase</p>
                  </div>
                </div>
              </div>

              {revenueOpportunities.map((opp, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-5 hover:border-emerald-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                          {opp.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          opp.difficulty === 'Low' ? 'bg-emerald-100 text-emerald-700' :
                          opp.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {opp.difficulty} Effort
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{opp.opportunity}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold text-emerald-600">{opp.impact}</div>
                      <p className="text-xs text-gray-500">Estimated gain</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <a
                      href={opp.category.includes('Compliance') ? '/compliance-score' : '/menu-analyzer'}
                      className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Take Action
                    </a>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-6 text-white mt-6">
                <h4 className="font-bold text-lg mb-2">Expert Recommendation</h4>
                <p className="text-violet-100">
                  Focus first on <strong>improving your FHRS score from 4 to 5 stars</strong>. This is the easiest win with highest impact on customer trust and revenue. Combined with a compliance score boost, you could capture up to <strong>£165K additional revenue</strong> annually.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/rating-booster" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-emerald-300 transition-all group">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Improve FHRS Score</h4>
          <p className="text-sm text-gray-500">Get your 5-star rating with our step-by-step guide</p>
        </a>

        <a href="/compliance-score" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-300 transition-all group">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944v11.056a8 1 1 0 11-2 0v-1.944a11.955 11.955 0 01-5.618-4.132z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Boost Compliance Score</h4>
          <p className="text-sm text-gray-500">Close the gap with top performers</p>
        </a>

        <a href="/menu-analyzer" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-purple-300 transition-all group">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Optimize Menu Pricing</h4>
          <p className="text-sm text-gray-500">Match competitor pricing strategies</p>
        </a>
      </div>
    </>
  );
}
