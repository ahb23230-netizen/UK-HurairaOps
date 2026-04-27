-- ============================================
-- UK Hospitality Compliance Suite
-- Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- 1. Tenants (Organizations/Companies)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subscription_tier VARCHAR(50) DEFAULT 'starter',
    stripe_customer_id VARCHAR(255),
    trial_ends_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Premises (Restaurant Locations)
CREATE TABLE premises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    postcode VARCHAR(20),
    city VARCHAR(100),
    eho_rating VARCHAR(10),
    opening_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Compliance Items (Food Safety, etc.)
CREATE TABLE compliance_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    premise_id UUID REFERENCES premises(id) ON DELETE CASCADE NOT NULL,
    category VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    frequency VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'medium',
    assigned_to VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Temperature Logs (Food Safety)
CREATE TABLE temperature_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    premise_id UUID REFERENCES premises(id) ON DELETE CASCADE NOT NULL,
    food_item VARCHAR(255) NOT NULL,
    temperature DECIMAL(4,1) NOT NULL,
    fridge_or_freezer VARCHAR(50) NOT NULL,
    logged_by VARCHAR(255),
    logged_at TIMESTAMPTZ DEFAULT NOW(),
    is_compliant BOOLEAN DEFAULT true,
    notes TEXT
);

-- 6. Licenses
CREATE TABLE licenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    premise_id UUID REFERENCES premises(id) ON DELETE CASCADE NOT NULL,
    license_type VARCHAR(100) NOT NULL,
    license_number VARCHAR(100),
    issued_by VARCHAR(255),
    issue_date DATE,
    expiry_date DATE,
    renewal_cost DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'active',
    documents_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Documents
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    premise_id UUID REFERENCES premises(id) ON DELETE CASCADE NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_name VARCHAR(255),
    file_url TEXT,
    file_size INTEGER,
    uploaded_by VARCHAR(255),
    expiry_date DATE,
    is_expired BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Insurance Policies
CREATE TABLE insurance_policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    premise_id UUID REFERENCES premises(id) ON DELETE CASCADE NOT NULL,
    policy_type VARCHAR(100) NOT NULL,
    provider VARCHAR(255),
    policy_number VARCHAR(100),
    coverage_amount DECIMAL(12,2),
    premium DECIMAL(10,2),
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    documents_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Reminders
CREATE TABLE reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
    premise_id UUID REFERENCES premises(id) ON DELETE CASCADE,
    reminder_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    due_date TIMESTAMPTZ NOT NULL,
    days_before INTEGER DEFAULT 30,
    email_to VARCHAR(255),
    is_sent BOOLEAN DEFAULT false,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Activity Logs (Audit Trail)
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE premises ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE temperature_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Tenants: Users can only see their own tenant
CREATE POLICY "Users can view own tenant" ON tenants
    FOR SELECT USING (true);

CREATE POLICY "Service role can manage tenants" ON tenants
    FOR ALL USING (auth.role() = 'service_role');

-- Users: Users can only see users in their tenant
CREATE POLICY "Users can view own tenant users" ON users
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own tenant users" ON users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own tenant users" ON users
    FOR UPDATE USING (true);

CREATE POLICY "Service role can manage users" ON users
    FOR ALL USING (auth.role() = 'service_role');

-- Premises: Users can only see premises in their tenant
CREATE POLICY "Users can view own tenant premises" ON premises
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own tenant premises" ON premises
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own tenant premises" ON premises
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete own tenant premises" ON premises
    FOR DELETE USING (true);

CREATE POLICY "Service role can manage premises" ON premises
    FOR ALL USING (auth.role() = 'service_role');

-- Compliance Items: Same tenant access
CREATE POLICY "Users can view own tenant compliance items" ON compliance_items
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own tenant compliance items" ON compliance_items
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own tenant compliance items" ON compliance_items
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete own tenant compliance items" ON compliance_items
    FOR DELETE USING (true);

CREATE POLICY "Service role can manage compliance items" ON compliance_items
    FOR ALL USING (auth.role() = 'service_role');

-- Temperature Logs: Same tenant access
CREATE POLICY "Users can view own tenant temperature logs" ON temperature_logs
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own tenant temperature logs" ON temperature_logs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can manage temperature logs" ON temperature_logs
    FOR ALL USING (auth.role() = 'service_role');

-- Licenses: Same tenant access
CREATE POLICY "Users can view own tenant licenses" ON licenses
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own tenant licenses" ON licenses
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own tenant licenses" ON licenses
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete own tenant licenses" ON licenses
    FOR DELETE USING (true);

CREATE POLICY "Service role can manage licenses" ON licenses
    FOR ALL USING (auth.role() = 'service_role');

-- Documents: Same tenant access
CREATE POLICY "Users can view own tenant documents" ON documents
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own tenant documents" ON documents
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can delete own tenant documents" ON documents
    FOR DELETE USING (true);

CREATE POLICY "Service role can manage documents" ON documents
    FOR ALL USING (auth.role() = 'service_role');

-- Insurance Policies: Same tenant access
CREATE POLICY "Users can view own tenant insurance policies" ON insurance_policies
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own tenant insurance policies" ON insurance_policies
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own tenant insurance policies" ON insurance_policies
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete own tenant insurance policies" ON insurance_policies
    FOR DELETE USING (true);

CREATE POLICY "Service role can manage insurance policies" ON insurance_policies
    FOR ALL USING (auth.role() = 'service_role');

-- Reminders: Same tenant access
CREATE POLICY "Users can view own tenant reminders" ON reminders
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own tenant reminders" ON reminders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own tenant reminders" ON reminders
    FOR UPDATE USING (true);

CREATE POLICY "Service role can manage reminders" ON reminders
    FOR ALL USING (auth.role() = 'service_role');

-- Activity Logs: Same tenant access
CREATE POLICY "Users can view own tenant activity logs" ON activity_logs
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own tenant activity logs" ON activity_logs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can manage activity logs" ON activity_logs
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_premises_tenant_id ON premises(tenant_id);
CREATE INDEX idx_compliance_items_premise_id ON compliance_items(premise_id);
CREATE INDEX idx_compliance_items_due_date ON compliance_items(due_date);
CREATE INDEX idx_compliance_items_status ON compliance_items(status);
CREATE INDEX idx_temperature_logs_premise_id ON temperature_logs(premise_id);
CREATE INDEX idx_temperature_logs_logged_at ON temperature_logs(logged_at);
CREATE INDEX idx_licenses_premise_id ON licenses(premise_id);
CREATE INDEX idx_licenses_expiry_date ON licenses(expiry_date);
CREATE INDEX idx_documents_premise_id ON documents(premise_id);
CREATE INDEX idx_insurance_policies_premise_id ON insurance_policies(premise_id);
CREATE INDEX idx_insurance_policies_end_date ON insurance_policies(end_date);
CREATE INDEX idx_reminders_tenant_id ON reminders(tenant_id);
CREATE INDEX idx_reminders_due_date ON reminders(due_date);
CREATE INDEX idx_reminders_is_sent ON reminders(is_sent);
CREATE INDEX idx_activity_logs_tenant_id ON activity_logs(tenant_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_premises_updated_at BEFORE UPDATE ON premises
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_items_updated_at BEFORE UPDATE ON compliance_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_licenses_updated_at BEFORE UPDATE ON licenses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_insurance_policies_updated_at BEFORE UPDATE ON insurance_policies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('compliance-documents', 'compliance-documents', false);

-- Storage policies
CREATE POLICY "Users can upload documents" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'compliance-documents');

CREATE POLICY "Users can view documents" ON storage.objects
    FOR SELECT USING (bucket_id = 'compliance-documents');

CREATE POLICY "Users can delete own documents" ON storage.objects
    FOR DELETE USING (bucket_id = 'compliance-documents');

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert a sample tenant
-- INSERT INTO tenants (id, name, subscription_tier)
-- VALUES ('11111111-1111-1111-1111-111111111111', 'Demo Restaurant Ltd', 'professional');