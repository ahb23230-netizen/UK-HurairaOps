import { useState } from 'react';


interface License {
  id: string;
  license_type: string;
  license_number: string;
  expiry_date: string;
  status: string;
  issued_by: string;
}

export default function Licenses() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ license_type: '', license_number: '', expiry_date: '', issued_by: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLicenses([...licenses, { id: Date.now().toString(), ...formData, status: 'active' }]);
    setFormData({ license_type: '', license_number: '', expiry_date: '', issued_by: '' });
    setShowForm(false);
  };

  const getDaysUntil = (date: string) => Math.ceil((new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getStatusColor = (status: string, daysUntil: number) => {
    if (status === 'expired') return 'bg-red-100 text-red-700';
    if (daysUntil <= 30) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div />
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add License
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New License</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">License Type</label>
              <select value={formData.license_type} onChange={e => setFormData({...formData, license_type: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required>
                <option value="">Select type...</option>
                <option value="Alcohol License">Alcohol License</option>
                <option value="Food Premises Registration">Food Premises Registration</option>
                <option value="Music License">Music License</option>
                <option value="Entertainment License">Entertainment License</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
              <input type="text" value={formData.license_number} onChange={e => setFormData({...formData, license_number: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <input type="date" value={formData.expiry_date} onChange={e => setFormData({...formData, expiry_date: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issued By</label>
              <input type="text" value={formData.issued_by} onChange={e => setFormData({...formData, issued_by: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
            </div>
            <div className="md:col-span-2 flex gap-4">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">Save License</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {licenses.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Licenses Yet</h3>
          <p className="text-gray-500 mb-6">Start adding your business licenses to track expiry dates</p>
          <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
            Add Your First License
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {licenses.map((license) => {
            const daysUntil = getDaysUntil(license.expiry_date);
            return (
              <div key={license.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{license.license_type}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(license.status, daysUntil)}`}>
                    {daysUntil <= 30 ? `${daysUntil} days` : 'Active'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{license.license_number}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-500">Issued by: {license.issued_by}</p>
                  <p className="text-gray-500">Expires: {license.expiry_date}</p>
                </div>
                {daysUntil <= 30 && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-xl">
                    <p className="text-sm text-yellow-800">Renewal needed soon!</p>
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