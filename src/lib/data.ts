import { PricingPlan, FAQItem, Feature, Statistic, Testimonial } from '@/types';

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: 19,
    description: 'Perfect for single-location restaurants just getting started with compliance',
    features: [
      'Food Safety Tracking',
      'Temperature Logging',
      'License Reminders',
      'Email Notifications',
      '1 Premises',
      'Basic Reports',
      '7-Day Free Trial',
    ],
    buttonText: 'Start Free Trial',
  },
  {
    name: 'Professional',
    price: 49,
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
    highlighted: true,
    buttonText: 'Start Free Trial',
  },
  {
    name: 'Business',
    price: 99,
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
  },
];

export const faqItems: FAQItem[] = [
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
  {
    question: 'What support do you offer?',
    answer: 'All plans include email support. Professional and Business plans include priority support with faster response times. Business plan subscribers get access to a dedicated account manager for personalized assistance.',
  },
  {
    question: 'Is the app available on mobile?',
    answer: 'Yes! Our Progressive Web App (PWA) works on any device - desktop, tablet, or mobile. Simply visit our website on your mobile browser and add it to your home screen for an app-like experience. Native apps for iOS and Android are coming soon.',
  },
];

export const features: Feature[] = [
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

export const statistics: Statistic[] = [
  {
    value: '500+',
    label: 'UK Restaurants',
  },
  {
    value: '4.8/5',
    label: 'Average Rating',
  },
  {
    value: '£0',
    label: 'Compliance Fines',
  },
  {
    value: '24/7',
    label: 'Peace of Mind',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    role: 'Owner',
    company: 'The Coastal Kitchen, Brighton',
    content: 'Finally, a compliance tool that actually understands what UK restaurant owners need. The license tracking alone has saved me from two close calls with expired alcohol licenses.',
    rating: 5,
  },
  {
    name: 'Ahmed Hassan',
    role: 'Director',
    company: 'Spice Garden Ltd, London',
    content: 'The temperature logging feature is a lifesaver. I used to forget to check the fridges, now I get automatic reminders and my HACCP records are always up to date.',
    rating: 5,
  },
  {
    name: 'Emma Thompson',
    role: 'Manager',
    company: 'Thompson\'s Cafe, Manchester',
    content: 'We passed our EHO inspection with flying colours thanks to this app. Having all our compliance documents organized and ready made all the difference.',
    rating: 5,
  },
];

export const problemStats: Statistic[] = [
  {
    value: '40%',
    label: 'of UK restaurants face compliance fines yearly',
  },
  {
    value: '£5,000+',
    label: 'average fine for food safety violations',
  },
  {
    value: '67%',
    label: 'of business owners miss compliance deadlines',
  },
  {
    value: '5+',
    label: 'different apps needed for complete compliance',
  },
];
