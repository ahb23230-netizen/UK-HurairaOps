// Stripe Webhook Handler for UK Hospitality Compliance
// Supabase Edge Function

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const STRIPE_WEBHOOK_SECRET = 'whsec_p22ne8p36VqhZrWcR1iTRvAHRlUV6ZC2';
const SUPABASE_URL = 'https://poqklizfnkyezayeallt.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWtsaXpmbmt5ZXpheWVhbGx0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjAwMDU3MCwiZXhwIjoyMDkxNTc2NTcwfQ.c8qj_ZUQbIM5d_J7epa3NKGYm02atL0PUBSDnO8ODhs';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

serve(async (req) => {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  // Verify webhook signature
  // Note: In production, use Stripe's actual signature verification
  // For now, we'll process the event directly

  let event: any;

  try {
    // Parse the event (in production, use Stripe's signature verification)
    event = JSON.parse(body);
  } catch (err) {
    console.error('Webhook error:', err.message);
    return new Response('Webhook error', { status: 400 });
  }

  // Handle different event types
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event.data.object);
      break;

    case 'customer.subscription.created':
      await handleSubscriptionCreated(event.data.object);
      break;

    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      break;

    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      break;

    case 'invoice.payment_succeeded':
      await handlePaymentSucceeded(event.data.object);
      break;

    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

// Handle checkout session completed
async function handleCheckoutSessionCompleted(session: any) {
  console.log('Checkout session completed:', session.id);

  const userId = session.metadata?.userId;
  const planId = session.metadata?.planId;
  const customerId = session.customer;

  if (!userId || !planId) {
    console.error('Missing metadata in checkout session');
    return;
  }

  // Map plan ID to subscription tier
  const tierMap: Record<string, string> = {
    starter: 'starter',
    professional: 'professional',
    business: 'business',
  };

  const tier = tierMap[planId] || 'starter';

  // Update tenant with subscription info
  const { data: user } = await supabase
    .from('users')
    .select('tenant_id')
    .eq('id', userId)
    .single();

  if (user?.tenant_id) {
    await supabase
      .from('tenants')
      .update({
        subscription_tier: tier,
        stripe_customer_id: customerId,
        trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days trial
      })
      .eq('id', user.tenant_id);
  }

  console.log('Subscription created successfully');
}

// Handle subscription created
async function handleSubscriptionCreated(subscription: any) {
  console.log('Subscription created:', subscription.id);

  const customerId = subscription.customer;
  const status = subscription.status;

  // Update tenant with subscription status
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (tenant) {
    await supabase
      .from('tenants')
      .update({ subscription_tier: subscription.metadata?.tier || 'starter' })
      .eq('id', tenant.id);
  }
}

// Handle subscription updated
async function handleSubscriptionUpdated(subscription: any) {
  console.log('Subscription updated:', subscription.id);

  const customerId = subscription.customer;
  const status = subscription.status;

  // Update tenant with new status
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (tenant) {
    const updates: any = {};

    if (status === 'active') {
      // Subscription is active, clear trial
      updates.trial_ends_at = null;
    } else if (status === 'past_due') {
      // Subscription payment failed
      updates.subscription_tier = 'suspended';
    }

    if (Object.keys(updates).length > 0) {
      await supabase.from('tenants').update(updates).eq('id', tenant.id);
    }
  }
}

// Handle subscription deleted
async function handleSubscriptionDeleted(subscription: any) {
  console.log('Subscription deleted:', subscription.id);

  const customerId = subscription.customer;

  // Update tenant to free tier
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (tenant) {
    await supabase
      .from('tenants')
      .update({
        subscription_tier: 'canceled',
        stripe_customer_id: null,
      })
      .eq('id', tenant.id);
  }
}

// Handle payment succeeded
async function handlePaymentSucceeded(invoice: any) {
  console.log('Payment succeeded:', invoice.id);

  // Log successful payment
  await supabase.from('activity_logs').insert({
    tenant_id: invoice.customer,
    action: 'payment_succeeded',
    entity_type: 'subscription',
    details: { invoice_id: invoice.id },
  });
}

// Handle payment failed
async function handlePaymentFailed(invoice: any) {
  console.log('Payment failed:', invoice.id);

  const customerId = invoice.customer;

  // Log failed payment
  await supabase.from('activity_logs').insert({
    tenant_id: customerId,
    action: 'payment_failed',
    entity_type: 'subscription',
    details: { invoice_id: invoice.id },
  });

  // Send notification email (optional - implement later)
  console.log('Payment failed for customer:', customerId);
}
