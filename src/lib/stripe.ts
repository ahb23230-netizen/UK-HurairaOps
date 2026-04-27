// Stripe Configuration
// UK Hospitality Compliance Suite

export const stripeConfig = {
  // Test Keys (use these for development)
  publishableKey: 'pk_test_YOUR_PUBLISHABLE_KEY_HERE',
  secretKey: 'sk_test_YOUR_SECRET_KEY_HERE',

  // API Version
  apiVersion: '2024-12-18.acacia',

  // Pricing Plans
  prices: {
    starter: {
      priceId: 'price_starter_monthly',
      amount: 1900,
      currency: 'gbp',
    },
    professional: {
      priceId: 'price_professional_monthly',
      amount: 4900,
      currency: 'gbp',
    },
    business: {
      priceId: 'price_business_monthly',
      amount: 9900,
      currency: 'gbp',
    },
  },

  // Webhook Secret
  webhookSecret: 'whsec_YOUR_WEBHOOK_SECRET_HERE',

  // Site URL - Update this to your production URL
  siteUrl: 'https://YOUR_PRODUCTION_URL_HERE',
};

// Export for use in frontend
export const STRIPE_PUBLISHABLE_KEY = stripeConfig.publishableKey;
