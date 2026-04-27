import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('session_id');
    if (id) {
      setSessionId(id);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to UK Hospitality Compliance!
          </h1>
          <p className="text-gray-600 mb-6">
            Your subscription has been activated. You now have full access to all features.
          </p>

          {/* Trial Info */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>7-Day Free Trial Active</strong>
              <br />
              Your card will not be charged until your trial ends.
            </p>
          </div>

          {/* Next Steps */}
          <div className="text-left bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Next Steps:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">1.</span>
                Set up your restaurant profile
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">2.</span>
                Add your premises (locations)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">3.</span>
                Start tracking compliance items
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-center transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-center transition-colors"
            >
              Back to Home
            </Link>
          </div>

          {/* Session ID (for debugging) */}
          {sessionId && (
            <p className="text-xs text-gray-400 mt-6">
              Session: {sessionId.slice(0, 20)}...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
