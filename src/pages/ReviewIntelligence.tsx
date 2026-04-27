import { useState } from 'react';


const sources = [
  { id: 'google', name: 'Google Reviews', icon: '🔍', color: 'bg-blue-500' },
  { id: 'tripadvisor', name: 'TripAdvisor', icon: '📍', color: 'bg-green-500' },
  { id: 'facebook', name: 'Facebook', icon: '📘', color: 'bg-blue-600' },
  { id: 'yelp', name: 'Yelp', icon: '⭐', color: 'bg-red-500' },
  { id: 'opentable', name: 'OpenTable', icon: '🍽️', color: 'bg-purple-500' },
];

const sampleReviews = [
  {
    id: 1,
    source: 'google',
    rating: 5,
    date: '2024-01-15',
    text: 'Absolutely fantastic experience! The food was exceptional and the service was impeccable. Will definitely be coming back!',
    sentiment: 'positive',
    keywords: ['excellent food', 'great service', 'recommend'],
    sentimentScore: 95,
  },
  {
    id: 2,
    source: 'tripadvisor',
    rating: 4,
    date: '2024-01-12',
    text: 'Really enjoyed our meal. The atmosphere was lovely. Slightly pricey but worth it for a special occasion.',
    sentiment: 'positive',
    keywords: ['enjoyed', 'lovely atmosphere', 'worth it'],
    sentimentScore: 78,
  },
  {
    id: 3,
    source: 'google',
    rating: 3,
    date: '2024-01-10',
    text: 'Food was good but service was slow. Waited 30 minutes for drinks. Might give another chance.',
    sentiment: 'neutral',
    keywords: ['slow service', 'long wait', 'good food'],
    sentimentScore: 52,
  },
  {
    id: 4,
    source: 'facebook',
    rating: 1,
    date: '2024-01-08',
    text: 'Terrible experience. Found hair in my food. Complained to staff but they were dismissive. Never going back.',
    sentiment: 'negative',
    keywords: ['hair in food', 'dismissive staff', 'complaint'],
    sentimentScore: 15,
  },
  {
    id: 5,
    source: 'yelp',
    rating: 4,
    date: '2024-01-05',
    text: 'Great portions and friendly staff. The allergen information was very helpful. Highly recommend for those with dietary requirements.',
    sentiment: 'positive',
    keywords: ['great portions', 'friendly staff', 'allergen info'],
    sentimentScore: 88,
  },
];

const sentimentBreakdown = {
  positive: { count: 67, percentage: 74, color: 'bg-green-500' },
  neutral: { count: 18, percentage: 20, color: 'bg-yellow-500' },
  negative: { count: 5, percentage: 6, color: 'bg-red-500' },
};

const commonThemes = [
  { theme: 'Food Quality', positive: 82, negative: 18, trend: 'up' },
  { theme: 'Service Speed', positive: 45, negative: 55, trend: 'down' },
  { theme: 'Staff Friendliness', positive: 89, negative: 11, trend: 'up' },
  { theme: 'Cleanliness', positive: 76, negative: 24, trend: 'up' },
  { theme: 'Value for Money', positive: 61, negative: 39, trend: 'stable' },
  { theme: 'Allergen Info', positive: 94, negative: 6, trend: 'up' },
];

const responseTemplates = [
  {
    id: 'positive',
    title: 'Thank Positive Review',
    template: 'Thank you so much for your wonderful review! We are delighted to hear you enjoyed your experience. Looking forward to welcoming you back soon!',
  },
  {
    id: 'neutral',
    title: 'Acknowledge Feedback',
    template: 'Thank you for your feedback. We appreciate you sharing your experience with us. Your comments about service speed have been noted and we are working to improve. We hope to see you again and provide a better experience.',
  },
  {
    id: 'negative',
    title: 'Address Concern',
    template: 'We sincerely apologize for your experience. This is not the standard we strive for. Please contact us directly so we can discuss this further and make it right. Your satisfaction is our priority.',
  },
];

export default function ReviewIntelligence() {
  const [activeTab, setActiveTab] = useState('import');
  const [connectedSources, setConnectedSources] = useState<string[]>(['google']);
  const [selectedReviews, setSelectedReviews] = useState<number[]>([]);
  const [responseModal, setResponseModal] = useState<{ review: typeof sampleReviews[0] | null; template: string }>({ review: null, template: '' });

  const toggleSource = (sourceId: string) => {
    if (connectedSources.includes(sourceId)) {
      setConnectedSources(connectedSources.filter(s => s !== sourceId));
    } else {
      setConnectedSources([...connectedSources, sourceId]);
    }
  };

  const toggleReview = (reviewId: number) => {
    if (selectedReviews.includes(reviewId)) {
      setSelectedReviews(selectedReviews.filter(id => id !== reviewId));
    } else {
      setSelectedReviews([...selectedReviews, reviewId]);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'neutral': return 'text-yellow-600 bg-yellow-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSourceIcon = (source: string) => {
    const sourceData = sources.find(s => s.id === source);
    return sourceData?.icon || '📝';
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">4.2</div>
            <div className="text-sm text-gray-500">Average Rating</div>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">90</div>
            <div className="text-sm text-gray-500">Total Reviews</div>
            <div className="text-xs text-green-600 mt-1">+12 this month</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">74%</div>
            <div className="text-sm text-gray-500">Positive Sentiment</div>
            <div className="text-xs text-green-600 mt-1">+5% from last month</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-500">Connected Platforms</div>
            <div className="text-xs text-gray-400 mt-1">Track more for insights</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('import')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === 'import' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Import Sources
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === 'reviews' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === 'analytics' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('responses')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === 'responses' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Response Templates
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'import' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect Review Platforms</h3>
                <p className="text-sm text-gray-500 mb-6">Link your accounts to automatically import and analyze reviews from multiple sources.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sources.map((source) => (
                    <div
                      key={source.id}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        connectedSources.includes(source.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => toggleSource(source.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${source.color} flex items-center justify-center text-xl`}>
                            {source.icon}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{source.name}</div>
                            <div className="text-xs text-gray-500">
                              {connectedSources.includes(source.id) ? 'Connected' : 'Not connected'}
                            </div>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          connectedSources.includes(source.id)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {connectedSources.includes(source.id) && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      {connectedSources.includes(source.id) && (
                        <div className="mt-3 pt-3 border-t border-blue-200">
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Last sync: 2 hours ago</span>
                            <span className="text-blue-600">28 reviews</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-blue-900">API Integration Available</div>
                      <div className="text-xs text-blue-700">Connect your Google Business Profile or TripAdvisor for automatic review syncing. Requires API credentials from respective platforms.</div>
                    </div>
                  </div>
                </div>

                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Sync All Sources
                </button>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">All Reviews</h3>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                      <option>All Sources</option>
                      {sources.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                      <option>All Ratings</option>
                      <option>5 Stars</option>
                      <option>4 Stars</option>
                      <option>3 Stars</option>
                      <option>2 Stars</option>
                      <option>1 Star</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {sampleReviews.map((review) => (
                    <div key={review.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={selectedReviews.includes(review.id)}
                          onChange={() => toggleReview(review.id)}
                          className="mt-1 w-4 h-4 rounded border-gray-300"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{getSourceIcon(review.source)}</span>
                            <span className="text-sm text-gray-600 capitalize">{review.source}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">{review.date}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{review.text}</p>
                          <div className="flex items-center gap-4 flex-wrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(review.sentiment)}`}>
                              {review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
                            </span>
                            <div className="text-xs text-gray-500">
                              Sentiment Score: <span className="font-medium">{review.sentimentScore}%</span>
                            </div>
                            <div className="flex gap-1">
                              {review.keywords.map((keyword, i) => (
                                <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setResponseModal({ review, template: '' })}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Respond
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedReviews.length > 0 && (
                  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4">
                    <span>{selectedReviews.length} reviews selected</span>
                    <button className="px-4 py-1 bg-white text-gray-900 rounded-full text-sm font-medium">
                      Bulk Respond
                    </button>
                    <button
                      onClick={() => setSelectedReviews([])}
                      className="p-1 hover:bg-gray-700 rounded"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Analysis</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-600 mb-4">Sentiment Breakdown</h4>
                    <div className="space-y-3">
                      {Object.entries(sentimentBreakdown).map(([sentiment, data]) => (
                        <div key={sentiment}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm capitalize text-gray-700">{sentiment}</span>
                            <span className="text-sm font-medium text-gray-900">{data.count} ({data.percentage}%)</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${data.color} rounded-full transition-all`}
                              style={{ width: `${data.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-600 mb-4">Rating Distribution</h4>
                    <div className="flex items-end justify-between h-40">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const heights = { 5: 45, 4: 28, 3: 15, 2: 8, 1: 4 };
                        return (
                          <div key={rating} className="flex flex-col items-center gap-2">
                            <div
                              className="w-12 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all"
                              style={{ height: `${heights[rating as keyof typeof heights]}%` }}
                            />
                            <span className="text-sm text-gray-500">{rating}★</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 text-center text-sm text-gray-600">
                      90 total reviews • Average: 4.2★
                    </div>
                  </div>
                </div>

                <h4 className="text-sm font-medium text-gray-600 mb-4">Theme Analysis</h4>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Theme</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Positive</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Negative</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {commonThemes.map((theme, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{theme.theme}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: `${theme.positive}%` }} />
                              </div>
                              <span className="text-sm text-gray-600">{theme.positive}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 rounded-full" style={{ width: `${theme.negative}%` }} />
                              </div>
                              <span className="text-sm text-gray-600">{theme.negative}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {theme.trend === 'up' && (
                              <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                Improving
                              </span>
                            )}
                            {theme.trend === 'down' && (
                              <span className="inline-flex items-center gap-1 text-red-600 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                                Needs Attention
                              </span>
                            )}
                            {theme.trend === 'stable' && (
                              <span className="inline-flex items-center gap-1 text-gray-600 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                                </svg>
                                Stable
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-amber-900">Attention Needed: Service Speed</div>
                      <div className="text-xs text-amber-700 mt-1">55% of negative reviews mention slow service. Consider implementing a service time improvement plan to boost your ratings.</div>
                      <button className="mt-2 px-3 py-1 bg-amber-600 text-white rounded-lg text-xs font-medium">
                        Create Action Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'responses' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Response Templates</h3>
                    <p className="text-sm text-gray-500 mt-1">Pre-built templates for quick review responses</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    + Create Template
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {responseTemplates.map((template) => (
                    <div key={template.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          template.id === 'positive' ? 'bg-green-100 text-green-600' :
                          template.id === 'neutral' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {template.id === 'positive' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          {template.id === 'neutral' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8M12 8v8" />
                            </svg>
                          )}
                          {template.id === 'negative' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{template.title}</div>
                          <div className="text-xs text-gray-500 capitalize">{template.id} sentiment</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">{template.template}</p>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                          Edit
                        </button>
                        <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                          Use Template
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-xl text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">AI-Powered Responses (Pro)</div>
                      <p className="text-sm text-white/80">Generate personalized responses automatically using AI. Just review and send.</p>
                    </div>
                    <button className="ml-auto px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                      Upgrade to Pro
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Response Modal */}
        {responseModal.review && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Respond to Review</h3>
                <button
                  onClick={() => setResponseModal({ review: null, template: '' })}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="text-xs text-gray-500 mb-1">Review from {responseModal.review.source}</div>
                <p className="text-sm text-gray-700">{responseModal.review.text}</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quick Templates</label>
                <div className="flex gap-2">
                  {responseTemplates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setResponseModal({ ...responseModal, template: t.template })}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        responseModal.template === t.template
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
                <textarea
                  value={responseModal.template}
                  onChange={(e) => setResponseModal({ ...responseModal, template: e.target.value })}
                  className="w-full h-32 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your response..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setResponseModal({ review: null, template: '' })}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Send Response
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}