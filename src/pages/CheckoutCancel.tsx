import { Link } from 'react-router-dom';

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Cancel Icon */}
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Checkout Cancelled
          </h1>
          <p className="text-gray-600 mb-6">
            No worries! Your checkout was cancelled and you haven't been charged.
          </p>

          {/* Try Again */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600">
              You can still start your <strong>7-day free trial</strong> whenever you're ready.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              to="/pricing"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-center transition-colors"
            >
              View Pricing Again
            </Link>
            <Link
              to="/"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-center transition-colors"
            >
              Back to Home
            </Link>
          </div>

          {/* Help */}
          <p className="text-sm text-gray-500 mt-6">
            Having trouble?{' '}
            <a href="mailto:support@ukhospitalitycompliance.com" className="text-blue-600 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
