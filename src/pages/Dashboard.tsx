import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Premise {
  id: string;
  name: string;
  address: string;
}

interface ComplianceItem {
  id: string;
  name: string;
  category: string;
  due_date: string;
  status: string;
  priority: string;
}

interface Reminder {
  id: string;
  title: string;
  due_date: string;
  reminder_type: string;
}

interface BusinessProfile {
  businessName: string;
  businessType: string;
  cuisineType: string;
  branchCount: string;
  staffCount: string;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [premises, setPremises] = useState<Premise[]>([]);
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [showAddPremise, setShowAddPremise] = useState(false);
  const [newPremise, setNewPremise] = useState({ name: '', address: '' });

  useEffect(() => {
    const savedProfile = localStorage.getItem('businessProfile');
    if (savedProfile) {
      setBusinessProfile(JSON.parse(savedProfile));
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: tenantData } = await supabase
        .from('tenants')
        .select('*')
        .limit(1)
        .single();

      if (tenantData) {
        const { data: premisesData } = await supabase
          .from('premises')
          .select('*')
          .eq('tenant_id', tenantData.id);

        if (premisesData && premisesData.length > 0) {
          setPremises(premisesData);

          const { data: complianceData } = await supabase
            .from('compliance_items')
            .select('*')
            .eq('premise_id', premisesData[0].id)
            .order('due_date', { ascending: true })
            .limit(5);

          if (complianceData) {
            setComplianceItems(complianceData);
          }
        }

        const { data: remindersData } = await supabase
          .from('reminders')
          .select('*')
          .eq('tenant_id', tenantData.id)
          .eq('is_sent', false)
          .order('due_date', { ascending: true })
          .limit(5);

        if (remindersData) {
          setReminders(remindersData);
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const addPremise = async () => {
    if (!newPremise.name) return;

    try {
      const { data, error } = await supabase
        .from('premises')
        .insert({
          name: newPremise.name,
          address: newPremise.address || 'Not specified'
        })
        .select()
        .single();

      if (data) {
        setPremises([...premises, data]);
        setNewPremise({ name: '', address: '' });
        setShowAddPremise(false);
      }
    } catch (err) {
      console.error('Error adding premise:', err);
    }
  };

  const stats = [
    { label: 'Compliance Score', value: premises.length > 0 ? '85%' : '--', change: '', positive: true },
    { label: 'Pending Tasks', value: complianceItems.length.toString(), change: '', positive: true },
    { label: 'Documents', value: '0', change: '', positive: true },
    { label: 'Days Until Next Deadline', value: premises.length > 0 ? '30' : '--', change: '', positive: true },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDaysUntil = (date: string) => {
    const today = new Date();
    const dueDate = new Date(date);
    const diff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Welcome Banner */}
      {!businessProfile && (
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">Complete Your Profile</h2>
              <p className="text-blue-100">Set up your business details to get started</p>
            </div>
            <Link
              to="/onboarding"
              className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              Set Up Business
            </Link>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              {businessProfile ? `Welcome, ${businessProfile.businessName}!` : 'Welcome to UK HurairaOps'}
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
            Beta Access Active
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-500 text-sm">{stat.label}</span>
              {stat.change && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {stat.change}
                </span>
              )}
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Premises Section */}
      <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Premises</h3>
          <button
            onClick={() => setShowAddPremise(!showAddPremise)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Premise
          </button>
        </div>

        {showAddPremise && (
          <div className="mb-4 p-4 bg-gray-50 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Premise Name"
                value={newPremise.name}
                onChange={(e) => setNewPremise({...newPremise, name: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Address"
                value={newPremise.address}
                onChange={(e) => setNewPremise({...newPremise, address: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addPremise}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {premises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {premises.map((premise) => (
              <div key={premise.id} className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="font-medium text-gray-900">{premise.name}</p>
                <p className="text-sm text-gray-500 mt-1">{premise.address}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="font-medium text-gray-900 mb-1">No premises added yet</p>
            <p className="text-sm">Add your first premise to start tracking compliance</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
            <Link to="/food-safety" className="text-blue-600 text-sm hover:underline">View All</Link>
          </div>
          {complianceItems.length > 0 ? (
            <div className="space-y-4">
              {complianceItems.map((item) => {
                const daysUntil = getDaysUntil(item.due_date);
                return (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${daysUntil <= 7 ? 'bg-red-100' : 'bg-blue-100'}`}>
                        <svg className={`w-5 h-5 ${daysUntil <= 7 ? 'text-red-600' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                        {daysUntil} days
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{item.due_date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No upcoming deadlines</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link to="/eho-bot" className="p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
              <svg className="w-8 h-8 text-indigo-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="font-medium text-gray-900">EHO Bot</p>
              <p className="text-sm text-gray-500">AI Inspection Prep</p>
            </Link>
            <Link to="/sfbb" className="p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
              <svg className="w-8 h-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="font-medium text-gray-900">SFBB Diary</p>
              <p className="text-sm text-gray-500">UKFSA Compliant</p>
            </Link>
            <Link to="/compliance-score" className="p-4 bg-violet-50 rounded-xl hover:bg-violet-100 transition-colors">
              <svg className="w-8 h-8 text-violet-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="font-medium text-gray-900">Compliance</p>
              <p className="text-sm text-gray-500">Score Widget</p>
            </Link>
            <Link to="/menu-analyzer" className="p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors">
              <svg className="w-8 h-8 text-rose-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="font-medium text-gray-900">Menu Profit</p>
              <p className="text-sm text-gray-500">Analyzer</p>
            </Link>
            <Link to="/food-safety" className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944v11.056a8 1 1 0 11-2 0v-1.944a11.955 11.955 0 01-5.618-4.132z" />
              </svg>
              <p className="font-medium text-gray-900">Food Safety</p>
              <p className="text-sm text-gray-500">Log Temps</p>
            </Link>
            <Link to="/seasonal-alerts" className="p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors">
              <svg className="w-8 h-8 text-amber-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-medium text-gray-900">Seasonal</p>
              <p className="text-sm text-gray-500">Alerts</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Reminders */}
      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reminders</h3>
          <Link to="/settings" className="text-blue-600 text-sm hover:underline">Manage Reminders</Link>
        </div>
        {reminders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {reminder.reminder_type}
                  </span>
                </div>
                <p className="font-medium text-gray-900">{reminder.title}</p>
                <p className="text-sm text-gray-500 mt-1">Due: {reminder.due_date}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No reminders set</p>
          </div>
        )}
      </div>
    </>
  );
}