import { useState } from 'react';


interface Invoice {
  id: string;
  supplier: string;
  category: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  recurring: boolean;
  recurringInterval?: 'weekly' | 'monthly' | 'quarterly' | 'annually';
}

interface Reminder {
  id: string;
  daysBefore: number;
  enabled: boolean;
  method: 'email' | 'sms' | 'both';
}

export default function InvoiceReminders() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: '1', supplier: 'Gas Safe Register', category: 'Equipment', amount: 150, dueDate: '2026-04-20', status: 'pending', recurring: true, recurringInterval: 'annually' },
    { id: '2', supplier: 'Pest Control Ltd', category: 'Maintenance', amount: 85, dueDate: '2026-04-22', status: 'pending', recurring: true, recurringInterval: 'monthly' },
    { id: '3', supplier: 'Food Safety Training Co', category: 'Training', amount: 250, dueDate: '2026-04-25', status: 'pending', recurring: false },
    { id: '4', supplier: 'Insurance Provider', category: 'Insurance', amount: 450, dueDate: '2026-04-28', status: 'pending', recurring: true, recurringInterval: 'quarterly' },
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', daysBefore: 7, enabled: true, method: 'email' },
    { id: '2', daysBefore: 3, enabled: true, method: 'both' },
    { id: '3', daysBefore: 1, enabled: true, method: 'both' },
  ]);

  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    supplier: '',
    category: 'Equipment',
    amount: '',
    dueDate: '',
    recurring: false,
    recurringInterval: 'monthly',
  });
  const [filter, setFilter] = useState<string>('all');

  const categories = ['Equipment', 'Maintenance', 'Training', 'Insurance', 'Safety', 'Supplies', 'Utilities'];
  const categoryColors: Record<string, string> = {
    Equipment: 'bg-blue-100 text-blue-700',
    Maintenance: 'bg-green-100 text-green-700',
    Training: 'bg-purple-100 text-purple-700',
    Insurance: 'bg-yellow-100 text-yellow-700',
    Safety: 'bg-red-100 text-red-700',
    Supplies: 'bg-gray-100 text-gray-700',
    Utilities: 'bg-cyan-100 text-cyan-700',
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === 'all') return true;
    return invoice.status === filter;
  });

  const totalPending = invoices.filter(i => i.status === 'pending').reduce((acc, i) => acc + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((acc, i) => acc + i.amount, 0);
  const upcomingCount = invoices.filter(i => {
    const daysUntil = Math.ceil((new Date(i.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 7 && daysUntil > 0 && i.status === 'pending';
  }).length;

  const markAsPaid = (id: string) => {
    setInvoices(prev => prev.map(inv =>
      inv.id === id ? { ...inv, status: 'paid' as const } : inv
    ));
  };

  const addInvoice = () => {
    if (!newInvoice.supplier || !newInvoice.amount || !newInvoice.dueDate) return;

    const invoice: Invoice = {
      id: Date.now().toString(),
      supplier: newInvoice.supplier,
      category: newInvoice.category,
      amount: parseFloat(newInvoice.amount),
      dueDate: newInvoice.dueDate,
      status: 'pending',
      recurring: newInvoice.recurring,
      recurringInterval: newInvoice.recurring ? newInvoice.recurringInterval as any : undefined,
    };

    setInvoices(prev => [...prev, invoice]);
    setNewInvoice({ supplier: '', category: 'Equipment', amount: '', dueDate: '', recurring: false, recurringInterval: 'monthly' });
    setShowAddInvoice(false);
  };

  const getDaysUntil = (date: string) => {
    return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-blue-100 text-blue-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-2">Pending Payments</div>
          <div className="text-3xl font-bold text-gray-900">£{totalPending.toFixed(0)}</div>
          <div className="text-sm text-gray-500 mt-1">{invoices.filter(i => i.status === 'pending').length} invoices</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-2">Overdue</div>
          <div className="text-3xl font-bold text-red-600">£{totalOverdue.toFixed(0)}</div>
          <div className="text-sm text-red-500 mt-1">{invoices.filter(i => i.status === 'overdue').length} invoices</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-2">Due This Week</div>
          <div className="text-3xl font-bold text-orange-600">{upcomingCount}</div>
          <div className="text-sm text-gray-500 mt-1">invoices</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-2">Recurring</div>
          <div className="text-3xl font-bold text-blue-600">{invoices.filter(i => i.recurring).length}</div>
          <div className="text-sm text-gray-500 mt-1">subscriptions</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Invoice List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-2">
                {['all', 'pending', 'overdue', 'paid'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      filter === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowAddInvoice(!showAddInvoice)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Invoice
              </button>
            </div>
          </div>

          {showAddInvoice && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Add New Invoice</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Supplier Name" value={newInvoice.supplier} onChange={(e) => setNewInvoice({...newInvoice, supplier: e.target.value})} className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
                <select value={newInvoice.category} onChange={(e) => setNewInvoice({...newInvoice, category: e.target.value})} className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                  {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                </select>
                <input type="number" placeholder="Amount (£)" value={newInvoice.amount} onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})} className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
                <input type="date" value={newInvoice.dueDate} onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})} className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex gap-3">
                <button onClick={addInvoice} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium">Add Invoice</button>
                <button onClick={() => setShowAddInvoice(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium">Cancel</button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {filteredInvoices.map((invoice) => {
              const daysUntil = getDaysUntil(invoice.dueDate);
              return (
                <div key={invoice.id} className={`bg-white rounded-2xl shadow-sm border ${invoice.status === 'overdue' ? 'border-red-200' : 'border-gray-100'} p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${categoryColors[invoice.category] || 'bg-gray-100 text-gray-700'}`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{invoice.supplier}</h4>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[invoice.category]}`}>{invoice.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">£{invoice.amount}</div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(invoice.status)}`}>{invoice.status}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500">Due: </span>
                      <span className={`font-medium ${daysUntil < 0 ? 'text-red-600' : daysUntil <= 3 ? 'text-orange-600' : 'text-gray-900'}`}>{new Date(invoice.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      {daysUntil > 0 && <span className="text-gray-500 ml-1">({daysUntil} days)</span>}
                      {daysUntil < 0 && <span className="text-red-600 ml-1">({Math.abs(daysUntil)} days overdue)</span>}
                    </div>
                    {invoice.status !== 'paid' && (
                      <button onClick={() => markAsPaid(invoice.id)} className="text-sm text-green-600 hover:text-green-700 font-medium">Mark as Paid</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Reminder Settings</h3>
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={reminder.enabled} onChange={() => setReminders(prev => prev.map(r => r.id === reminder.id ? { ...r, enabled: !r.enabled } : r))} className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <div>
                      <span className="text-sm font-medium text-gray-900">{reminder.daysBefore} day{reminder.daysBefore > 1 ? 's' : ''} before</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Upcoming Payments</h3>
            <div className="space-y-3">
              {invoices.filter(i => i.status === 'pending' && getDaysUntil(i.dueDate) >= 0).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).slice(0, 5).map((invoice) => {
                const daysUntil = getDaysUntil(invoice.dueDate);
                return (
                  <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center ${daysUntil <= 3 ? 'bg-red-100' : daysUntil <= 7 ? 'bg-orange-100' : 'bg-blue-100'}`}>
                        <span className={`text-xs font-medium ${daysUntil <= 3 ? 'text-red-600' : daysUntil <= 7 ? 'text-orange-600' : 'text-blue-600'}`}>{new Date(invoice.dueDate).toLocaleDateString('en-GB', { month: 'short' })}</span>
                        <span className={`text-lg font-bold ${daysUntil <= 3 ? 'text-red-600' : daysUntil <= 7 ? 'text-orange-600' : 'text-blue-600'}`}>{new Date(invoice.dueDate).getDate()}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{invoice.supplier}</p>
                        <p className="text-xs text-gray-500">£{invoice.amount}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium ${daysUntil <= 3 ? 'text-red-600' : daysUntil <= 7 ? 'text-orange-600' : 'text-gray-500'}`}>{daysUntil === 0 ? 'Today' : `${daysUntil}d`}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}