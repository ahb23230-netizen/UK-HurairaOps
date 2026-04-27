import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { pricingPlans, createCheckoutSession, PlanTier } from '../lib/stripe-checkout';
import PublicChatWidget from '../components/PublicChatWidget';

export default function PricingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<PlanTier | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectPlan = async (planId: PlanTier) => {
    // If user is not logged in, redirect to register
    if (!user) {
      navigate('/register?redirect=/pricing');
      return;
    }

    // For Business plan, redirect to contact
    if (planId === 'business') {
      window.location.href = 'mailto:sales@ukhospitalitycompliance.com?subject=Business Plan Inquiry';
      return;
    }

    setLoading(planId);
    setError(null);

    try {
      const { url } = await createCheckoutSession(
        planId,
        user.id,
        user.email || ''
      );

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to start checkout. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="UKHurairaOps Logo" className="w-12 h-12 object-contain" />
              <span className="font-bold text-xl text-gray-900">UK HurairaOps</span>
            </a>
            <div className="flex items-center gap-4">
              <a href="/login" className="text-gray-600 hover:text-gray-900">Login</a>
              <a href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your business. All plans include 7-day free trial.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            </div>
          )}

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'border-2 border-blue-600 shadow-xl scale-105'
                    : 'border border-gray-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">£{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={loading !== null}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  } ${loading === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading === plan.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    plan.buttonText
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">Trusted by 500+ UK restaurants</p>
            <div className="flex justify-center items-center gap-8">
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm">Cancel Anytime</span>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
                <p className="text-gray-600 text-sm">Yes! We use bank-level encryption (AES-256) and GDPR-compliant storage. Your data is encrypted at rest and in transit.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600 text-sm">Absolutely! You can cancel your subscription with one click, no fees or hidden charges.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What happens after my free trial?</h3>
                <p className="text-gray-600 text-sm">After your 7-day free trial, you can choose to subscribe to any plan or cancel. No credit card required during trial.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <img src="/logo.png" alt="Logo" className="w-80 h-80 object-contain" />
      </div>
      <PublicChatWidget />
    </div>
  );
}
