# Stripe Webhook Edge Function

## Purpose
This Edge Function handles Stripe webhook events for subscription management.

## Events Handled
- `checkout.session.completed` - New subscription created
- `customer.subscription.created` - Subscription activated
- `customer.subscription.updated` - Subscription status changed
- `customer.subscription.deleted` - Subscription cancelled
- `invoice.payment_succeeded` - Payment successful
- `invoice.payment_failed` - Payment failed

## Deployment

### 1. Install Supabase CLI
```bash
npm install -g supabase
```

### 2. Login to Supabase
```bash
supabase login
```

### 3. Link to project
```bash
cd supabase
supabase link --project-ref poqklizfnkyezayeallt
```

### 4. Deploy Edge Function
```bash
supabase functions deploy stripe-webhook
```

### 5. Set secrets
```bash
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_p22ne8p36VqhZrWcR1iTRvAHRlUV6ZC2
```

## Webhook URL
After deployment, use this URL in Stripe Dashboard:
```
https://poqklizfnkyezayeallt.supabase.co/functions/v1/stripe-webhook
```

## Testing
Use Stripe CLI to test webhooks locally:
```bash
stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook
```
