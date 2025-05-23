import React from 'react';

const invoices = [
  { id: 'INV-001', patient: 'Emma Johnson', services: 'Consultation', amount: 'Kes 550.00', date: 'Apr 15, 2025', status: 'Paid' },
  { id: 'INV-002', patient: 'Emma Johnson', services: 'Consultation', amount: 'Kes 550.00', date: 'Apr 15, 2025', status: 'Paid' },
  { id: 'INV-003', patient: 'Emma Johnson', services: 'Consultation', amount: 'Kes 550.00', date: 'Apr 15, 2025', status: 'Overdue' },
  { id: 'INV-004', patient: 'Emma Johnson', services: 'Consultation', amount: 'Kes 550.00', date: 'Apr 15, 2025', status: 'Pending' },
  { id: 'INV-005', patient: 'Emma Johnson', services: 'Consultation', amount: 'Kes 550.00', date: 'Apr 15, 2025', status: 'Pending' },
  { id: 'INV-006', patient: 'Emma Johnson', services: 'Consultation', amount: 'Kes 550.00', date: 'Apr 15, 2025', status: 'Pending' },
  { id: 'INV-007', patient: 'Emma Johnson', services: 'Consultation', amount: 'Kes 550.00', date: 'Apr 15, 2025', status: 'Paid' },
  { id: 'INV-008', patient: 'Emma Johnson', services: 'Consultation', amount: 'Kes 550.00', date: 'Apr 15, 2025', status: 'Paid' },
];

const statusColors = {
  Paid: 'bg-green-100 text-green-600',
  Pending: 'bg-yellow-100 text-yellow-600',
  Overdue: 'bg-red-100 text-red-600',
};

const Billings = () => (
  <div className="space-y-8">
    <h1 className="text-2xl font-bold">Billing</h1>
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      {/* Top controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search Invoices..."
            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="px-5 py-2 rounded-lg bg-pink-400 text-white font-semibold text-sm hover:bg-pink-500">Create Invoice</button>
          <button className="px-4 py-2 rounded-lg border border-pink-200 text-pink-500 font-semibold text-sm bg-pink-50 hover:bg-pink-100 flex items-center gap-2">
            <span>Filter by dates</span>
          </button>
          <button className="px-4 py-2 rounded-lg border border-pink-200 text-pink-500 font-semibold text-sm bg-pink-50 hover:bg-pink-100 flex items-center gap-2">
            <span>Filter by Doctors</span>
          </button>
          <button className="px-4 py-2 rounded-lg border border-pink-200 text-pink-500 font-semibold text-sm bg-pink-50 hover:bg-pink-100 flex items-center gap-2">
            <span>Filter by status</span>
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-pink-50 text-gray-700">
              <th className="px-4 py-2 text-left font-semibold">Invoice #</th>
              <th className="px-4 py-2 text-left font-semibold">Patient</th>
              <th className="px-4 py-2 text-left font-semibold">Services</th>
              <th className="px-4 py-2 text-left font-semibold">Amount</th>
              <th className="px-4 py-2 text-left font-semibold">Date</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={i} className="border-b last:border-b-0">
                <td className="px-4 py-2 whitespace-nowrap">{inv.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{inv.patient}</td>
                <td className="px-4 py-2 whitespace-nowrap">{inv.services}</td>
                <td className="px-4 py-2 whitespace-nowrap">{inv.amount}</td>
                <td className="px-4 py-2 whitespace-nowrap">{inv.date}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[inv.status]}`}>{inv.status}</span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                  {/* View icon */}
                  <button className="text-gray-500 hover:text-pink-500" title="View">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9 0a9 9 0 0118 0a9 9 0 01-18 0z" /></svg>
                  </button>
                  {/* Download icon */}
                  <button className="text-gray-500 hover:text-pink-500" title="Download">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-2">
        <div className="text-sm text-gray-600">Showing 1 to 10 of 120 patients</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded border border-gray-200 bg-white text-gray-700">Previous</button>
          <button className="px-3 py-1 rounded border border-pink-400 bg-pink-100 text-pink-600 font-semibold">1</button>
          <button className="px-3 py-1 rounded border border-gray-200 bg-white text-gray-700">2</button>
          <button className="px-3 py-1 rounded border border-gray-200 bg-white text-gray-700">3</button>
          <button className="px-3 py-1 rounded border border-gray-200 bg-white text-gray-700">4</button>
          <button className="px-3 py-1 rounded border border-gray-200 bg-white text-gray-700">Next</button>
        </div>
      </div>
    </div>
  </div>
);

export default Billings; 