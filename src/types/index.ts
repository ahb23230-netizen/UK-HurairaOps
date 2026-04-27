export interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Statistic {
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export type SubscriptionTier = 'starter' | 'professional' | 'business';

export interface ComplianceCategory {
  id: string;
  name: string;
  icon: string;
  items: ComplianceItem[];
}

export interface ComplianceItem {
  id: string;
  name: string;
  description: string;
  category: string;
  expiryDate?: Date;
  status: 'valid' | 'expiring' | 'expired' | 'pending';
  isCritical: boolean;
}

export interface TemperatureLog {
  id: string;
  premiseId: string;
  fridgeName: string;
  temperature: number;
  isWithinRange: boolean;
  loggedAt: Date;
  loggedBy: string;
  notes?: string;
}

export interface License {
  id: string;
  name: string;
  category: 'alcohol' | 'music' | 'food' | 'entertainment' | 'other';
  referenceNumber?: string;
  issueDate?: Date;
  expiryDate?: Date;
  issuingAuthority?: string;
  status: 'valid' | 'expiring' | 'expired' | 'pending';
  documents: string[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
  category: string;
  size: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'staff' | 'admin';
  tenantId: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subscriptionTier: SubscriptionTier;
  subscriptionStatus: 'trial' | 'active' | 'cancelled' | 'past_due';
  subscriptionEndDate?: Date;
}

export interface Premise {
  id: string;
  tenantId: string;
  name: string;
  address: string;
  postcode: string;
  city: string;
  type: string;
  isActive: boolean;
}

export interface ReminderSettings {
  id: string;
  itemId: string;
  type: 'email' | 'sms' | 'both';
  daysBefore: number[];
  isActive: boolean;
  lastSent?: Date;
}
