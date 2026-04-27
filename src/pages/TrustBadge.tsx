import { useState } from 'react';
export default function TrustBadge() {
  const [badgeStyle, setBadgeStyle] = useState<'modern' | 'minimal' | 'premium'>('modern');
  const [complianceScore, setComplianceScore] = useState(92);
  const [copied, setCopied] = useState(false);

  const generateEmbedCode = () => {
    const styles = {
      modern: 'modern',
      minimal: 'minimal',
      premium: 'premium',
    };

    return `<!-- HurairaOps Trust Badge -->
<a href="https://hurairaops.com" target="_blank" rel="noopener"
   data-huraira-badge="${styles[badgeStyle]}"
   data-score="${complianceScore}"
   style="display:inline-flex;align-items:center;gap:8px;padding:8px 16px;background:linear-gradient(135deg,#10b981,#059669);border-radius:8px;color:white;font-family:system-ui,sans-serif;font-size:14px;text-decoration:none;">
  <span style="font-weight:700;">Powered by HurairaOps</span>
  <span style="opacity:0.9;">|</span>
  <span>Compliance Score: ${complianceScore}</span>
</a>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const badgePreview = () => {
    const baseClasses = "inline-flex items-center gap-2 px-4 py-2 text-white font-medium rounded-lg";

    switch (badgeStyle) {
      case 'modern':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 blur-lg opacity-30 rounded-lg"></div>
            <div className={`${baseClasses} bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944v11.056a8 1 1 0 11-2 0v-1.944a11.955 11.955 0 01-5.618-4.132z" />
              </svg>
              <span className="font-bold">Powered by HurairaOps</span>
              <span className="opacity-75">|</span>
              <span className="bg-white/20 px-2 py-0.5 rounded">Compliance Score: {complianceScore}</span>
            </div>
          </div>
        );
      case 'minimal':
        return (
          <div className={`${baseClasses} bg-slate-800 border border-slate-700`}>
            <span>Powered by <strong>HurairaOps</strong></span>
            <span className="text-emerald-400">•</span>
            <span>Score: {complianceScore}</span>
          </div>
        );
      case 'premium':
        return (
          <div className={`${baseClasses} bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-pulse`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold">HurairaOps Certified</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-sm">{complianceScore}/100</span>
          </div>
        );
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944v11.056a8 1 1 0 11-2 0v-1.944a11.955 11.955 0 01-5.618-4.132z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Public Trust Badge</h3>
              <p className="text-indigo-100 text-sm mt-1">
                Free marketing for your business
              </p>
            </div>
          </div>
          <div className="text-center bg-white/10 rounded-xl px-6 py-3">
            <div className="text-sm text-indigo-200 mb-1">Badge Impact</div>
            <div className="text-2xl font-bold">+23% Trust</div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Badge Preview</h3>
          <p className="text-sm text-gray-500">See how your badge will look on your website</p>
        </div>
        <div className="p-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-12 flex items-center justify-center min-h-[200px]">
            {badgePreview()}
          </div>
        </div>
      </div>

      {/* Badge Style Selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Choose Badge Style</h3>
          <p className="text-sm text-gray-500">Select a style that matches your brand</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setBadgeStyle('modern')}
              className={`p-6 rounded-xl border-2 transition-all ${
                badgeStyle === 'modern'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                <span className="font-semibold text-gray-900">Modern</span>
              </div>
              <p className="text-sm text-gray-500">Gradient green with glow effect</p>
            </button>

            <button
              onClick={() => setBadgeStyle('minimal')}
              className={`p-6 rounded-xl border-2 transition-all ${
                badgeStyle === 'minimal'
                  ? 'border-slate-500 bg-slate-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 rounded bg-slate-800"></div>
                <span className="font-semibold text-gray-900">Minimal</span>
              </div>
              <p className="text-sm text-gray-500">Clean dark style, professional look</p>
            </button>

            <button
              onClick={() => setBadgeStyle('premium')}
              className={`p-6 rounded-xl border-2 transition-all ${
                badgeStyle === 'premium'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <span className="font-semibold text-gray-900">Premium</span>
              </div>
              <p className="text-sm text-gray-500">Animated gradient with star rating</p>
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Score Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Your Compliance Score</h3>
          <p className="text-sm text-gray-500">Set your current compliance score (0-100)</p>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-6">
            <input
              type="range"
              min="0"
              max="100"
              value={complianceScore}
              onChange={(e) => setComplianceScore(Number(e.target.value))}
              className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100"
                value={complianceScore}
                onChange={(e) => setComplianceScore(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold"
              />
              <span className="text-gray-500">/100</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  complianceScore >= 80 ? 'bg-emerald-500' :
                  complianceScore >= 60 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${complianceScore}%` }}
              ></div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              complianceScore >= 80 ? 'bg-emerald-100 text-emerald-700' :
              complianceScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {complianceScore >= 80 ? 'Excellent' :
               complianceScore >= 60 ? 'Good' :
               'Needs Work'}
            </span>
          </div>
        </div>
      </div>

      {/* Embed Code Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Embed Code</h3>
          <p className="text-sm text-gray-500">Copy this code and paste it on your website</p>
        </div>
        <div className="p-6">
          <div className="bg-gray-900 rounded-xl p-4 mb-4 relative">
            <pre className="text-sm text-green-400 overflow-x-auto">
              <code>{generateEmbedCode()}</code>
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy Code'}
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Works with any website
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No JavaScript required
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mobile responsive
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Why Use the Trust Badge?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Increase Trust</h4>
              <p className="text-sm text-emerald-100">Customers are 23% more likely to choose verified compliant businesses</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Free Marketing</h4>
              <p className="text-sm text-emerald-100">Each badge click brings visitors to HurairaOps, increasing brand awareness</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944v11.056a8 1 1 0 11-2 0v-1.944a11.955 11.955 0 01-5.618-4.132z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Show Compliance</h4>
              <p className="text-sm text-emerald-100">Demonstrate your commitment to UK food safety standards</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Want to improve your compliance score?
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/compliance-score"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
          >
            Check Compliance Score
          </a>
          <a
            href="/eho-bot"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
          >
            Prepare for EHO Inspection
          </a>
        </div>
      </div>
    </>
  );
}
