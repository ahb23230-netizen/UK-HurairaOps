import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');

  const [profileData, setProfileData] = useState({
    fullName: user?.email?.split('@')[0] || 'User',
    email: user?.email || '',
    phone: '',
    company: '',
    address: '',
  });

  const [notifications, setNotifications] = useState({
    emailReminders: true,
    smsReminders: false,
    weeklyReport: true,
    marketingEmails: false,
  });

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            {['profile', 'notifications', 'security', 'billing', 'appearance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-8">

          {/* ── PROFILE ── */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
                Save Changes
              </button>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { key: 'emailReminders', label: 'Email Reminders', description: 'Receive email notifications for upcoming deadlines' },
                  { key: 'smsReminders', label: 'SMS Reminders', description: 'Get text messages for critical reminders' },
                  { key: 'weeklyReport', label: 'Weekly Report', description: 'Receive a weekly compliance summary' },
                  { key: 'marketingEmails', label: 'Marketing Emails', description: 'Updates about new features and offers' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[item.key as keyof typeof notifications]}
                        onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
                Save Preferences
              </button>
            </div>
          )}

          {/* ── SECURITY ── */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">Change Password</p>
                      <p className="text-sm text-gray-500">Update your password regularly</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">Change</button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add extra security to your account</p>
                    </div>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">Enable</button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">Active Sessions</p>
                      <p className="text-sm text-gray-500">Manage your active sessions</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">View</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── BILLING ── */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing & Subscription</h3>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">Starter Plan</p>
                    <p className="text-gray-600 text-sm">Free — Demo Mode</p>
                  </div>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Active</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Upgrade to Pro or Business to unlock advanced AI features, multi-branch management, and priority support.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
                  Upgrade Plan
                </button>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Payment Method</p>
                    <p className="text-sm text-gray-500">No payment method added</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Add Card</button>
                </div>
              </div>
            </div>
          )}

          {/* ── APPEARANCE ── */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Appearance
                </h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                  Choose how UKHurairaOps looks on your device. Your preference is saved automatically.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                  {/* ── Dark (Replit-style) ── */}
                  <button
                    onClick={() => setTheme('dark')}
                    className={`relative rounded-xl p-4 border-2 text-left transition-all ${
                      theme === 'dark'
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: '#2a2a2a' }}
                  >
                    <div className="w-full h-16 rounded-lg mb-3 overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
                      <div className="h-2 w-3/4 rounded mt-2 ml-2" style={{ backgroundColor: '#333333' }}></div>
                      <div className="h-2 w-1/2 rounded mt-2 ml-2" style={{ backgroundColor: '#3a3a3a' }}></div>
                      <div className="h-2 w-2/3 rounded mt-2 ml-2" style={{ backgroundColor: '#3a3a3a' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-xs text-white">Dark</p>
                        <p className="text-xs text-gray-400" style={{ fontSize: '10px' }}>Clean & minimal</p>
                      </div>
                      {theme === 'dark' && (
                        <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>

                  {/* ── Light ── */}
                  <button
                    onClick={() => setTheme('light')}
                    className={`relative rounded-xl p-4 border-2 text-left transition-all ${
                      theme === 'light'
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <div className="w-full h-16 rounded-lg mb-3 overflow-hidden" style={{ backgroundColor: '#f9fafb' }}>
                      <div className="h-2 w-3/4 rounded mt-2 ml-2" style={{ backgroundColor: '#e5e7eb' }}></div>
                      <div className="h-2 w-1/2 rounded mt-2 ml-2" style={{ backgroundColor: '#d1d5db' }}></div>
                      <div className="h-2 w-2/3 rounded mt-2 ml-2" style={{ backgroundColor: '#d1d5db' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-xs text-gray-900">Light</p>
                        <p className="text-xs text-gray-500" style={{ fontSize: '10px' }}>Classic white</p>
                      </div>
                      {theme === 'light' && (
                        <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>

                  {/* ── Midnight ── */}
                  <button
                    onClick={() => setTheme('midnight')}
                    className={`relative rounded-xl p-4 border-2 text-left transition-all ${
                      theme === 'midnight'
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: '#16163a' }}
                  >
                    <div className="w-full h-16 rounded-lg mb-3 overflow-hidden" style={{ backgroundColor: '#0a0a1a' }}>
                      <div className="h-2 w-3/4 rounded mt-2 ml-2" style={{ backgroundColor: '#2a2a5a' }}></div>
                      <div className="h-2 w-1/2 rounded mt-2 ml-2" style={{ backgroundColor: '#1e1e4a' }}></div>
                      <div className="h-2 w-2/3 rounded mt-2 ml-2" style={{ backgroundColor: '#1e1e4a' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-xs text-blue-100">Midnight</p>
                        <p className="text-xs text-blue-300/60" style={{ fontSize: '10px' }}>Deep blue</p>
                      </div>
                      {theme === 'midnight' && (
                        <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>

                  {/* ── Gaming ── */}
                  <button
                    onClick={() => setTheme('gaming')}
                    className={`relative rounded-xl p-4 border-2 text-left transition-all ${
                      theme === 'gaming'
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: '#1f2937' }}
                  >
                    <div className="w-full h-16 rounded-lg mb-3 overflow-hidden" style={{ backgroundColor: '#111827' }}>
                      <div className="h-2 w-3/4 rounded mt-2 ml-2" style={{ backgroundColor: '#374151' }}></div>
                      <div className="h-2 w-1/2 rounded mt-2 ml-2" style={{ backgroundColor: '#4B5563' }}></div>
                      <div className="h-2 w-2/3 rounded mt-2 ml-2" style={{ backgroundColor: '#4B5563' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-xs text-white">Gaming</p>
                        <p className="text-xs text-gray-400" style={{ fontSize: '10px' }}>Blue-gray style</p>
                      </div>
                      {theme === 'gaming' && (
                        <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>

                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}