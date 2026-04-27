import { useState } from 'react';


interface Policy {
  id: string;
  policy_type: string;
  provider: string;
  policy_number: string;
  coverage_amount: number;
  premium: number;
  end_date: string;
  status: string;
}

export default function Insurance() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ policy_type: '', provider: '', policy_number: '', coverage_amount: '', premium: '', end_date: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPolicies([...policies, { id: Date.now().toString(), ...formData, coverage_amount: parseFloat(formData.coverage_amount), premium: parseFloat(formData.premium), status: 'active' }]);
    setFormData({ policy_type: '', provider: '', policy_number: '', coverage_amount: '', premium: '', end_date: '' });
    setShowForm(false);
  };

  const getDaysUntil = (date: string) => Math.ceil((new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div />
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Policy
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New Insurance Policy</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Policy Type</label>
              <select value={formData.policy_type} onChange={e => setFormData({...formData, policy_type: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required>
                <option value="">Select type...</option>
                <option value="Public Liability">Public Liability</option>
                <option value="Employers Liability">Employers Liability</option>
                <option value="Buildings & Contents">Buildings & Contents</option>
                <option value="Professional Indemnity">Professional Indemnity</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
              <input type="text" value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number</label>
              <input type="text" value={formData.policy_number} onChange={e => setFormData({...formData, policy_number: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Amount (£)</label>
              <input type="number" value={formData.coverage_amount} onChange={e => setFormData({...formData, coverage_amount: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Premium (£)</label>
              <input type="number" value={formData.premium} onChange={e => setFormData({...formData, premium: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input type="date" value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
            </div>
            <div className="md:col-span-3 flex gap-4">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">Save Policy</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {policies.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Insurance Policies</h3>
          <p className="text-gray-500 mb-6">Add your insurance policies to track coverage and renewal dates</p>
          <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
            Add Your First Policy
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => {
            const daysUntil = getDaysUntil(policy.end_date);
            return (
              <div key={policy.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">{policy.policy_type}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{policy.status}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{policy.provider}</h3>
                <p className="text-sm text-gray-500 mb-4">{policy.policy_number}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Coverage:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(policy.coverage_amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Annual Premium:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(policy.premium)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expires:</span>
                    <span className={`font-medium ${daysUntil <= 60 ? 'text-red-600' : 'text-gray-900'}`}>{policy.end_date}</span>
                  </div>
                </div>
                {daysUntil <= 60 && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-xl">
                    <p className="text-sm text-yellow-800">Renew in {daysUntil} days</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}