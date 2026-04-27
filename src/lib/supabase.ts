import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://poqklizfnkyezayeallt.supabase.co';
const supabaseAnonKey = 'sb_publishable_t_LfHfODHQSrRG395WLGMw_knfFHeG6';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWtsaXpmbmt5ZXpheWVhbGx0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjAwMDU3MCwiZXhwIjoyMDkxNTc2NTcwfQ.c8qj_ZUQbIM5d_J7epa3NKGYm02atL0PUBSDnO8ODhs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export const auth = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { data, error };
  },
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    return { data, error };
  },
};

export const db = {
  tenants: {
    create: async (data: any) => {
      const { data: result, error } = await supabaseAdmin.from('tenants').insert(data).select().single();
      return { data: result, error };
    },
    get: async (id: string) => {
      const { data, error } = await supabase.from('tenants').select('*').eq('id', id).single();
      return { data, error };
    },
    update: async (id: string, data: any) => {
      const { data: result, error } = await supabase.from('tenants').update(data).eq('id', id).select().single();
      return { data: result, error };
    },
  },
  users: {
    create: async (data: any) => {
      const { data: result, error } = await supabaseAdmin.from('users').insert(data).select().single();
      return { data: result, error };
    },
    getByEmail: async (email: string) => {
      const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
      return { data, error };
    },
    update: async (id: string, data: any) => {
      const { data: result, error } = await supabase.from('users').update(data).eq('id', id).select().single();
      return { data: result, error };
    },
  },
  premises: {
    create: async (data: any) => {
      const { data: result, error } = await supabase.from('premises').insert(data).select().single();
      return { data: result, error };
    },
    getAll: async (tenantId: string) => {
      const { data, error } = await supabase.from('premises').select('*').eq('tenant_id', tenantId);
      return { data, error };
    },
    update: async (id: string, data: any) => {
      const { data: result, error } = await supabase.from('premises').update(data).eq('id', id).select().single();
      return { data: result, error };
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('premises').delete().eq('id', id);
      return { error };
    },
  },
  complianceItems: {
    create: async (data: any) => {
      const { data: result, error } = await supabase.from('compliance_items').insert(data).select().single();
      return { data: result, error };
    },
    getByPremise: async (premiseId: string) => {
      const { data, error } = await supabase.from('compliance_items').select('*').eq('premise_id', premiseId);
      return { data, error };
    },
    update: async (id: string, data: any) => {
      const { data: result, error } = await supabase.from('compliance_items').update(data).eq('id', id).select().single();
      return { data: result, error };
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('compliance_items').delete().eq('id', id);
      return { error };
    },
  },
  temperatureLogs: {
    create: async (data: any) => {
      const { data: result, error } = await supabase.from('temperature_logs').insert(data).select().single();
      return { data: result, error };
    },
    getByPremise: async (premiseId: string, limit = 100) => {
      const { data, error } = await supabase.from('temperature_logs')
        .select('*')
        .eq('premise_id', premiseId)
        .order('logged_at', { ascending: false })
        .limit(limit);
      return { data, error };
    },
  },
  licenses: {
    create: async (data: any) => {
      const { data: result, error } = await supabase.from('licenses').insert(data).select().single();
      return { data: result, error };
    },
    getByPremise: async (premiseId: string) => {
      const { data, error } = await supabase.from('licenses').select('*').eq('premise_id', premiseId);
      return { data, error };
    },
    update: async (id: string, data: any) => {
      const { data: result, error } = await supabase.from('licenses').update(data).eq('id', id).select().single();
      return { data: result, error };
    },
  },
  documents: {
    create: async (data: any) => {
      const { data: result, error } = await supabase.from('documents').insert(data).select().single();
      return { data: result, error };
    },
    getByPremise: async (premiseId: string) => {
      const { data, error } = await supabase.from('documents').select('*').eq('premise_id', premiseId);
      return { data, error };
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('documents').delete().eq('id', id);
      return { error };
    },
  },
  reminders: {
    create: async (data: any) => {
      const { data: result, error } = await supabase.from('reminders').insert(data).select().single();
      return { data: result, error };
    },
    getPending: async (tenantId: string) => {
      const { data, error } = await supabase.from('reminders')
        .select('*')
        .eq('tenant_id', tenantId)
        .eq('is_sent', false)
        .gte('due_date', new Date().toISOString());
      return { data, error };
    },
    markSent: async (id: string) => {
      const { data, error } = await supabase.from('reminders').update({ is_sent: true }).eq('id', id).select().single();
      return { data, error };
    },
  },
};