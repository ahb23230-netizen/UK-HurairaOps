import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';


export default function Settings() {
  const { user } = useAuth();
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
          <nav className="flex -mb-px">
            {['profile', 'notifications', 'security', 'billing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
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
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => setProfileData({...profileData, company: e.target.value})}
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
                        onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
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

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing & Subscription</h3>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">Beta Access</span>
                    <p className="text-2xl font-bold text-gray-900 mt-4">Free</p>
                    <p className="text-sm text-gray-500">Currently in beta</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Upgrade</button>
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">View Invoices</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Cancel Subscription</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}