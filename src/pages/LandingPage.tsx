import { useState } from 'react';
import PublicChatWidget from '../components/PublicChatWidget';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Navbar */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="UKHurairaOps Logo" className="h-10 w-auto object-contain" />
            <span className="font-bold text-xl text-gray-900">UK HurairaOps</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</a>
            <a href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Login</a>
            <a href="/beta" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Join Beta
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</a>
              <a href="/login" className="text-gray-600 hover:text-gray-900">Login</a>
              <a href="/beta" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-center">
                Join Beta
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Beta Launch - Limited Spots Available
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Never Miss a <span className="text-blue-600">Compliance Deadline</span> Again
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The all-in-one compliance suite for UK restaurants. Track food safety, licenses, insurance, and more - all in one simple dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="/beta" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-600/30">
              Join Beta - 50% Off Forever
            </a>
            <a href="#features" className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all border border-gray-200">
              See How It Works
            </a>
          </div>

          <p className="text-gray-500 text-sm">Free during beta - No credit card required</p>
          </div>

          {/* Logo on Right Side */}
          <div className="flex flex-col items-center">
            <img src="/logo.png" alt="UKHurairaOps Logo" className="w-80 h-80 object-contain" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 pt-8 border-t border-gray-200">
          <div>
            <div className="text-3xl font-bold text-gray-900">50+</div>
            <div className="text-gray-600">Beta Testers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">0</div>
            <div className="text-gray-600">During Beta</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">50%</div>
            <div className="text-gray-600">Discount for Life</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">100</div>
            <div className="text-gray-600">Spots Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Problem() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Running a UK Restaurant is Hard Enough
          </h2>
          <p className="text-xl text-gray-600">
            Do not let compliance be what brings you down
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-red-600 mb-2">40%</div>
            <div className="text-gray-600">of UK restaurants face compliance fines yearly</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-red-600 mb-2">£5,000+</div>
            <div className="text-gray-600">average fine for food safety violations</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-red-600 mb-2">67%</div>
            <div className="text-gray-600">of business owners miss compliance deadlines</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-red-600 mb-2">5+</div>
            <div className="text-gray-600">different apps needed for complete compliance</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const featuresData = [
    {
      icon: 'Shield',
      title: 'Food Safety Tracking',
      description: 'Temperature logs, HACCP diary, allergen tracking, and cleaning schedules all in one place. Stay EHO-ready.',
    },
    {
      icon: 'FileCheck',
      title: 'License Management',
      description: 'Track alcohol licenses, music licenses, food premises registration, and more. Never miss a renewal.',
    },
    {
      icon: 'Bell',
      title: 'Smart Reminders',
      description: 'Get notified 30, 60, and 90 days before deadlines. Email and SMS notifications keep you informed.',
    },
    {
      icon: 'FolderOpen',
      title: 'Document Vault',
      description: 'Store all certificates, insurance policies, and compliance documents securely. Access them anytime.',
    },
    {
      icon: 'BarChart3',
      title: 'Compliance Dashboard',
      description: 'See your compliance score at a glance. Track overdue items and upcoming deadlines.',
    },
    {
      icon: 'FileText',
      title: 'PDF Reports',
      description: 'Generate professional compliance reports ready for EHO inspections or accountant submissions.',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            One Dashboard. Complete Compliance.
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to stay compliant, all in one place
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944v11.056a8 1 1 0 11-2 0v-1.944a11.955 11.955 0 01-5.618-4.132z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 19,
      betaPrice: 0,
      description: 'Perfect for single-location restaurants just getting started with compliance',
      features: [
        'Food Safety Tracking',
        'Temperature Logging',
        'License Reminders',
        'Email Notifications',
        '1 Premises',
        'Basic Reports',
      ],
      buttonText: 'Join Beta',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: 49,
      betaPrice: 0,
      description: 'For growing restaurants that need comprehensive compliance management',
      features: [
        'Everything in Starter',
        'All Licenses Tracking',
        'Insurance Tracking',
        'Document Storage',
        'Staff Training Records',
        'PDF Reports',
        'Priority Support',
        'Up to 3 Premises',
      ],
      buttonText: 'Join Beta',
      highlighted: true,
    },
    {
      name: 'Business',
      price: 99,
      betaPrice: 0,
      description: 'For multi-location businesses that need enterprise-grade compliance',
      features: [
        'Everything in Professional',
        'Multi-Location Support',
        'Team Access (5 users)',
        'Financial Deadlines',
        'HR Compliance',
        'Dedicated Account Manager',
        'API Access',
        'Unlimited Premises',
      ],
      buttonText: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Beta Launch - All Plans FREE During Beta
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Beta Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Join the beta and lock in 50% off forever after launch
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 ${
                plan.highlighted
                  ? 'border-2 border-green-600 shadow-xl scale-105'
                  : 'border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recommended
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

              <div className="mb-2">
                <span className="text-4xl font-bold text-green-600">FREE</span>
                <span className="text-gray-400 line-through ml-2">£{plan.price}/mo</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">During Beta Period</p>
              <p className="text-sm text-gray-600 mb-6">
                <span className="text-green-600 font-semibold">50% off</span> after launch = £{Math.round(plan.price * 0.5)}/mo
              </p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/beta"
                className={`block w-full py-3 rounded-xl font-semibold text-center transition-all ${
                  plan.highlighted
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 mt-8">
          Beta is limited to 100 restaurants.{' '}
          <a href="/beta" className="text-green-600 hover:underline font-semibold">Join the waitlist</a>
        </p>
      </div>
    </section>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Is my data secure?',
      answer: 'Yes! We use bank-level encryption (AES-256) and GDPR-compliant storage. Your data is encrypted at rest and in transit. We never share your data with third parties, and you can export or delete your data at any time.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely! You can cancel your subscription with one click, no fees or hidden charges. No long-term contracts required. You will retain access until the end of your billing period.',
    },
    {
      question: 'What happens after my free trial?',
      answer: 'After your 7-day free trial, you can choose to subscribe to any plan or cancel. There is no obligation and no credit card required during the trial. If you choose to subscribe, you can start with our Starter plan and upgrade anytime.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee. If you are not satisfied with our service within the first 30 days, contact us for a full refund - no questions asked.',
    },
    {
      question: 'How does the 7-day free trial work?',
      answer: 'Sign up with your email, set up your restaurant profile, and get full access to all Professional features for 7 days. No credit card required. At the end of your trial, choose a plan that fits your needs or cancel without any charges.',
    },
    {
      question: 'Can I switch plans later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you will receive prorated credit for the remainder of your current billing period. When downgrading, the change takes effect at the end of your current billing period.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our service
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img src="/logo.png" alt="UKHurairaOps Logo" className="w-48 h-48 object-contain" />
              <span className="font-bold text-3xl text-white">UK HurairaOps</span>
            </div>
            <p className="text-sm">
              The all-in-one compliance suite for UK restaurants. Stay compliant, stay calm.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">2024 UK HurairaOps. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.619-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
      <PublicChatWidget />
    </div>
  );
}
