// Stripe Checkout Utility
// UK Hospitality Compliance Suite

import Stripe from 'stripe';
import { stripeConfig } from './stripe';

// Initialize Stripe with secret key
export const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: stripeConfig.apiVersion as any,
});

// Pricing Plan Types
export type PlanTier = 'starter' | 'professional' | 'business';

export interface PricingPlan {
  id: PlanTier;
  name: string;
  price: number;
  priceId: string;
  description: string;
  features: string[];
  highlighted: boolean;
  buttonText: string;
}

// Pricing Plans Configuration
export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    priceId: 'price_1TLU5xE12kH4RZGsQXEbalw7', // Stripe Price ID
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
    highlighted: false,
    buttonText: 'Start Free Trial',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 49,
    priceId: 'price_1TLUAME12kH4RZGsjQydl0de', // Stripe Price ID
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
    id: 'business',
    name: 'Business',
    price: 99,
    priceId: 'price_1TLUBOE12kH4RZGs0lrhrPea', // Stripe Price ID
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
    highlighted: false,
    buttonText: 'Contact Sales',
  },
];

// Create Stripe Checkout Session
export async function createCheckoutSession(
  planId: PlanTier,
  userId: string,
  userEmail: string
): Promise<{ sessionId: string; url: string }> {
  const plan = pricingPlans.find((p) => p.id === planId);

  if (!plan) {
    throw new Error('Invalid plan selected');
  }

  // Create checkout session with Stripe Price ID
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: userEmail,
    line_items: [
      {
        price: plan.priceId, // Use Stripe Price ID
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      planId,
    },
    subscription_data: {
      trial_period_days: 7, // 7-day free trial
    },
    success_url: `${stripeConfig.siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${stripeConfig.siteUrl}/checkout/cancel`,
  });

  return {
    sessionId: session.id,
    url: session.url || '',
  };
}

// Create Customer Portal Session
export async function createPortalSession(customerId: string): Promise<{ url: string }> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: stripeConfig.siteUrl,
  });

  return { url: session.url };
}

// Get Subscription Status
export async function getSubscriptionStatus(customerId: string) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 1,
  });

  if (subscriptions.data.length === 0) {
    return null;
  }

  const subscription = subscriptions.data[0];

  return {
    id: subscription.id,
    status: subscription.status,
    currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
    cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
  };
}

// Cancel Subscription
export async function cancelSubscription(subscriptionId: string) {
  return await stripe.subscriptions.cancel(subscriptionId);
}
