import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicChatWidget from '../components/PublicChatWidget';

export default function BetaPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [betaFeatures] = useState([
    {
      icon: 'Shield',
      title: 'Food Safety Tracking',
      description: 'Temperature logs, HACCP diary, allergen tracking',
    },
    {
      icon: 'FileCheck',
      title: 'License Management',
      description: 'Track alcohol, music, and food premises licenses',
    },
    {
      icon: 'Bell',
      title: 'Smart Reminders',
      description: '30, 60, 90 day alerts before deadlines',
    },
    {
      icon: 'FolderOpen',
      title: 'Document Vault',
      description: 'Secure storage for all compliance documents',
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitted(true);
    setLoading(false);
  };

  const handleAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate validation
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Redirect to register with beta code
    window.location.href = `/register?beta_code=${accessCode}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="UKHurairaOps Logo" className="w-12 h-12 object-contain" />
              <span className="font-bold text-xl text-gray-900">UKHurairaOps</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Beta Hero */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Beta Launch - Limited Spots Available
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Be Among the First to Experience
            <span className="block text-yellow-300">UKHurairaOps</span>
          </h1>

          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Join our exclusive beta program and help shape the future of compliance management for UK restaurants.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    'Join Waitlist'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
              <p className="text-blue-100">We'll send you an access code when your spot is ready.</p>
            </div>
          )}

          <div className="mt-8 flex justify-center items-center gap-8 text-white">
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-blue-200 text-sm">Beta Testers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-blue-200 text-sm">Free During Beta</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-blue-200 text-sm">Priority Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Have Access Code */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          {!showAccessForm ? (
            <button
              onClick={() => setShowAccessForm(true)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Already have a beta access code? Click here
            </button>
          ) : (
            <form onSubmit={handleAccessSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  placeholder="Enter your beta code"
                  required
                  className="flex-1 px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all disabled:opacity-50"
                >
                  Access Beta
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Beta Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What's Included in Beta
            </h2>
            <p className="text-xl text-gray-600">
              Full access to all features - completely free during the beta period
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {betaFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944v11.056a8 1 1 0 11-2 0v-1.944a11.955 11.955 0 01-5.618-4.132z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beta Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Beta Tester Benefits
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                title: 'Lifetime Discount',
                description: 'Beta testers get 50% off forever once we launch publicly',
                icon: 'Percent',
              },
              {
                title: 'Direct Access to Founders',
                description: 'Direct line to the team for feature requests and feedback',
                icon: 'MessageCircle',
              },
              {
                title: 'Shape the Product',
                description: 'Your feedback directly influences the roadmap',
                icon: 'Target',
              },
              {
                title: 'Priority Support',
                description: 'Skip the queue with dedicated beta tester support',
                icon: 'Zap',
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Beta FAQ
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'How long is the beta period?',
                a: 'The beta period will last 3 months. After that, beta testers will transition to our public launch with their exclusive discount.',
              },
              {
                q: 'Is there a limit on beta accounts?',
                a: 'Yes, we are limiting the beta to 100 restaurants to ensure quality support. Once spots are filled, we will maintain a waitlist.',
              },
              {
                q: 'What happens to my data after beta?',
                a: 'Your data is yours. You can export it anytime, and it will remain accessible even after the beta ends.',
              },
              {
                q: 'Can I cancel during beta?',
                a: 'Yes, you can cancel anytime with no obligations. We want beta testers who are genuinely interested in helping us improve.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to simplify your compliance?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the beta program today and help us build the compliance tool UK restaurants deserve.
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all"
                >
                  Join Beta Now
                </button>
              </div>
            </form>
          ) : (
            <p className="text-white text-lg">Check your email for your access code!</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>2026 UKHurairaOps. All rights reserved.</p>
        </div>
      </footer>
      <div className="fixed right-16 top-24 hidden lg:block">
        <img src="/logo.png" alt="Logo" className="w-[350px] h-auto object-contain" />
      </div>
      <PublicChatWidget />
    </div>
  );
}
