import { createContext, useContext, useState, ReactNode } from 'react';

export type PlanType = 'starter' | 'pro' | 'business';

interface SubscriptionContextType {
  plan: PlanType;
  setPlan: (plan: PlanType) => void;
  isPro: boolean;
  isBusiness: boolean;
  hasAccess: (requiredPlan: PlanType) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  // For demo purposes, default to starter. In production, this would come from auth/user data
    const [plan, setPlan] = useState<PlanType>('pro');

  const isPro = plan === 'pro' || plan === 'business';
  const isBusiness = plan === 'business';

  const hasAccess = (requiredPlan: PlanType): boolean => {
    if (requiredPlan === 'starter') return true;
    if (requiredPlan === 'pro') return isPro;
    if (requiredPlan === 'business') return isBusiness;
    return false;
  };

  return (
    <SubscriptionContext.Provider value={{ plan, setPlan, isPro, isBusiness, hasAccess }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

// Plan feature definitions
export const PLAN_FEATURES = {
  starter: {
    name: 'Starter',
    price: '£29',
    features: [
      'Dashboard',
      'Food Safety',
      'Licenses',
      'Documents',
      'Insurance',
      'EHO Inspector Bot',
      'SFBB Diary',
      'Compliance Score',
      'Seasonal Alerts',
      'Invoice Reminders',
    ],
    lockedFeatures: [
      'AI Risk Predictor',
      'Incident Reports',
      'Auto Incident Report Generator',
      'Advanced Analytics',
      'Priority Support',
      'Custom Branding',
    ],
  },
  pro: {
    name: 'Pro',
    price: '£79',
    features: [
      'All Starter features',
      'AI Risk Predictor',
      'Incident Reports',
      'Advanced Analytics',
      'Priority Support',
    ],
    lockedFeatures: [
      'Custom Branding',
    ],
  },
  business: {
    name: 'Business',
    price: '£149',
    features: [
      'All Pro features',
      'Custom Branding',
      'API Access',
      'Dedicated Account Manager',
      'Custom Integrations',
    ],
    lockedFeatures: [],
  },
};
