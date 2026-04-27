import { useState } from 'react';


interface IncidentReport {
  id: string;
  date: string;
  type: 'food_poisoning' | 'customer_complaint' | 'staff_injury' | 'equipment_failure' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'draft' | 'submitted' | 'reviewed';
  description: string;
  affectedParties: string;
  actionsTaken: string;
  outcome: string;
}

interface IncidentType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  requiredFields: string[];
}

export default function AutoIncidentReportGenerator() {
  const [showNewReportForm, setShowNewReportForm] = useState(false);
  const [selectedIncidentType, setSelectedIncidentType] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<IncidentReport | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    location: '',
    description: '',
    affectedParties: '',
    symptoms: '',
    actionsTaken: '',
    witnesses: '',
    immediateActions: '',
    followUpRequired: false,
    followUpDate: '',
  });

  // Sample incident reports
  const [reports] = useState<IncidentReport[]>([
    {
      id: '1',
      date: '2024-04-10',
      type: 'customer_complaint',
      severity: 'medium',
      status: 'reviewed',
      description: 'Customer reported feeling unwell after consuming chicken dish',
      affectedParties: '1 customer',
      actionsTaken: 'Dish removed from menu, kitchen inspection conducted',
      outcome: 'Resolved - no further action required',
    },
    {
      id: '2',
      date: '2024-04-08',
      type: 'food_poisoning',
      severity: 'high',
      status: 'submitted',
      description: 'Two customers reported symptoms consistent with food poisoning',
      affectedParties: '2 customers (同一家庭)',
      actionsTaken: 'Food samples retained, incident logged',
      outcome: 'Under investigation by FSA',
    },
  ]);

  const incidentTypes: IncidentType[] = [
    {
      id: 'food_poisoning',
      name: 'Food Poisoning / Illness',
      description: 'Suspected foodborne illness or contamination',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      requiredFields: ['affectedParties', 'symptoms', 'foodConsumed'],
    },
    {
      id: 'customer_complaint',
      name: 'Customer Complaint',
      description: 'Formal complaint from customer regarding service or food',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      requiredFields: ['customerDetails', 'complaintDetails'],
    },
    {
      id: 'staff_injury',
      name: 'Staff Injury',
      description: 'Workplace injury or accident involving staff',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      requiredFields: ['staffDetails', 'injuryDescription', 'firstAidGiven'],
    },
    {
      id: 'equipment_failure',
      name: 'Equipment Failure',
      description: 'Failure of kitchen or refrigeration equipment',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      requiredFields: ['equipmentDetails', 'foodsAtRisk'],
    },
    {
      id: 'other',
      name: 'Other Incident',
      description: 'Any other reportable incident',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      requiredFields: ['incidentDetails'],
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'submitted': return 'bg-blue-100 text-blue-700';
      case 'reviewed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeName = (type: string) => {
    const found = incidentTypes.find(t => t.id === type);
    return found?.name || type;
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);

    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newReport: IncidentReport = {
      id: Date.now().toString(),
      date: formData.date,
      type: selectedIncidentType as IncidentReport['type'],
      severity: formData.followUpRequired ? 'high' : 'medium',
      status: 'draft',
      description: formData.description,
      affectedParties: formData.affectedParties,
      actionsTaken: formData.actionsTaken,
      outcome: 'Pending review',
    };

    setGeneratedReport(newReport);
    setIsGenerating(false);
    setShowPDFPreview(true);
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF report generated and downloaded!');
    setShowPDFPreview(false);
    setShowNewReportForm(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      location: '',
      description: '',
      affectedParties: '',
      symptoms: '',
      actionsTaken: '',
      witnesses: '',
      immediateActions: '',
      followUpRequired: false,
      followUpDate: '',
    });
    setSelectedIncidentType(null);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Instant UKFSA Compliant Reports</h2>
              <p className="text-white/80">Generate legally-compliant incident reports in seconds with auto-PDF generation</p>
            </div>
          </div>
          <button
            onClick={() => setShowNewReportForm(true)}
            className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Incident Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm text-gray-500">Total Reports</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{reports.length}</div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm text-gray-500">Pending Review</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{reports.filter(r => r.status === 'draft').length}</div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm text-gray-500">Reviewed</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{reports.filter(r => r.status === 'reviewed').length}</div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span className="text-sm text-gray-500">Critical Incidents</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{reports.filter(r => r.severity === 'high' || r.severity === 'critical').length}</div>
        </div>
      </div>

      {/* New Report Form Modal */}
      {showNewReportForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">New Incident Report</h2>
                <button
                  onClick={() => {
                    setShowNewReportForm(false);
                    setSelectedIncidentType(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Step 1: Select Incident Type */}
              {!selectedIncidentType ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Incident Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {incidentTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedIncidentType(type.id)}
                        className="p-4 bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl text-left transition-all"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-3">
                          {type.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">{type.name}</h4>
                        <p className="text-sm text-gray-500">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Step 2: Fill Report Details */
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <button
                      onClick={() => setSelectedIncidentType(null)}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {incidentTypes.find(t => t.id === selectedIncidentType)?.name}
                      </h3>
                      <p className="text-sm text-gray-500">Fill in the incident details below</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Incident</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time of Incident</label>
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location in Premises</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g., Main dining area, Kitchen prep station"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description of Incident *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        placeholder="Provide a detailed description of what happened..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    {/* Affected Parties */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Affected Parties</label>
                      <input
                        type="text"
                        value={formData.affectedParties}
                        onChange={(e) => setFormData({ ...formData, affectedParties: e.target.value })}
                        placeholder="e.g., 3 customers, 2 staff members"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Symptoms (for food poisoning) */}
                    {selectedIncidentType === 'food_poisoning' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms Reported</label>
                        <textarea
                          value={formData.symptoms}
                          onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                          rows={3}
                          placeholder="List symptoms experienced (e.g., nausea, vomiting, diarrhea)"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}

                    {/* Actions Taken */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Immediate Actions Taken</label>
                      <textarea
                        value={formData.actionsTaken}
                        onChange={(e) => setFormData({ ...formData, actionsTaken: e.target.value })}
                        rows={3}
                        placeholder="Describe any immediate actions taken in response to the incident"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Witnesses */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Witnesses (if any)</label>
                      <input
                        type="text"
                        value={formData.witnesses}
                        onChange={(e) => setFormData({ ...formData, witnesses: e.target.value })}
                        placeholder="Names and contact details of witnesses"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Follow-up Required */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.followUpRequired}
                          onChange={(e) => setFormData({ ...formData, followUpRequired: e.target.checked })}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div>
                          <span className="font-medium text-gray-900">Follow-up Action Required</span>
                          <p className="text-sm text-gray-600">This incident requires additional investigation or monitoring</p>
                        </div>
                      </label>
                      {formData.followUpRequired && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Date</label>
                          <input
                            type="date"
                            value={formData.followUpDate}
                            onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      )}
                    </div>

                    {/* UKFSA Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h4 className="font-semibold text-blue-900">UKFSA Reporting Requirements</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Certain incidents must be reported to the Food Standards Agency within 24 hours.
                            This system will help you generate compliant reports and track submissions.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => setSelectedIncidentType(null)}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleGenerateReport}
                        disabled={!formData.description || isGenerating}
                        className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isGenerating ? (
                          <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Generating Report...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Generate UKFSA Compliant Report
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {showPDFPreview && generatedReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Generated Report Preview</h2>
                <button
                  onClick={() => setShowPDFPreview(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* PDF Preview Content */}
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">UK FOOD STANDARDS AGENCY</h1>
                  <h2 className="text-xl font-semibold text-gray-700">Incident Report Form</h2>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4 border-b border-gray-300 pb-4">
                    <div>
                      <span className="font-semibold">Report ID:</span> #{generatedReport.id}
                    </div>
                    <div>
                      <span className="font-semibold">Date:</span> {generatedReport.date}
                    </div>
                    <div>
                      <span className="font-semibold">Incident Type:</span> {getTypeName(generatedReport.type)}
                    </div>
                    <div>
                      <span className="font-semibold">Severity:</span>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getSeverityColor(generatedReport.severity)}`}>
                        {generatedReport.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold">Description:</span>
                    <p className="mt-1 text-gray-700">{generatedReport.description}</p>
                  </div>

                  <div>
                    <span className="font-semibold">Affected Parties:</span>
                    <p className="mt-1 text-gray-700">{generatedReport.affectedParties}</p>
                  </div>

                  <div>
                    <span className="font-semibold">Actions Taken:</span>
                    <p className="mt-1 text-gray-700">{generatedReport.actionsTaken}</p>
                  </div>

                  <div>
                    <span className="font-semibold">Outcome:</span>
                    <p className="mt-1 text-gray-700">{generatedReport.outcome}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowPDFPreview(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Edit Report
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </button>
                <button
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Recent Incident Reports</h3>
            <p className="text-sm text-gray-500">Track and manage all incident reports</p>
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
            View All Reports
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  {incidentTypes.find(t => t.id === report.type)?.icon || (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{getTypeName(report.type)}</h4>
                  <p className="text-sm text-gray-500">{report.date} • {report.affectedParties}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getSeverityColor(report.severity)}`}>
                  {report.severity.toUpperCase()}
                </span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </span>
                <button className="p-2 text-gray-400 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
