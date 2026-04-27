// Stripe Configuration
// UK Hospitality Compliance Suite

export const stripeConfig = {
  // Test Keys (use these for development)
  publishableKey: 'pk_test_51TLSuUE12kH4RZGsupxLxq1tJFp88ParrnOFP5YwtHu5CnKaAjKPkyJiguq58h59lN6MkwCeS2WpjshcOHFH51O100156QhC7n',
  secretKey: 'sk_test_51TLSuUE12kH4RZGsooPdGS9kZ5whvwzjErKi5O6KgstNCkaOqkTsoqHZSQr4UAnnHwXHf5CuKdsTfXKAAnNspGRg00gxpTL04o',

  // API Version
  apiVersion: '2024-12-18.acacia',

  // Pricing Plans
  prices: {
    starter: {
      priceId: 'price_starter_monthly', // Will be created in Stripe Dashboard
      amount: 1900, // £19.00 in pence
      currency: 'gbp',
    },
    professional: {
      priceId: 'price_professional_monthly',
      amount: 4900, // £49.00 in pence
      currency: 'gbp',
    },
    business: {
      priceId: 'price_business_monthly',
      amount: 9900, // £99.00 in pence
      currency: 'gbp',
    },
  },

  // Webhook Secret
  webhookSecret: 'whsec_p22ne8p36VqhZrWcR1iTRvAHRlUV6ZC2',

  // Site URL - Update this to your production URL
  siteUrl: 'https://os68o4ezkl4y.space.minimax.io',
};

// Export for use in frontend
export const STRIPE_PUBLISHABLE_KEY = stripeConfig.publishableKey;
