import React from 'react';

const appointments = [
  { patient: 'Emma Johnson', doctor: 'Dr. Sarah Adams', date: 'Apr 15, 2025', time: '9:00 AM', type: 'Check-up', status: 'Schedule' },
  { patient: 'Sophia Miller', doctor: 'Dr. Sarah Adams', date: 'Apr 15, 2025', time: '10:30 AM', type: 'Ultrasound', status: 'Schedule' },
  { patient: 'Olivia Davis', doctor: 'Dr. Sarah Adams', date: 'Apr 15, 2025', time: '10:30 AM', type: 'Consultation', status: 'Schedule' },
  { patient: 'Olivia Davis', doctor: 'Dr. Sarah Adams', date: 'Apr 15, 2025', time: '10:30 AM', type: 'Follow-up', status: 'Schedule' },
  { patient: 'Sophia Miller', doctor: 'Dr. Sarah Adams', date: 'Apr 15, 2025', time: '10:30 AM', type: 'Procedure', status: 'Checked In' },
  { patient: 'Emma Johnson', doctor: 'Dr. Sarah Adams', date: 'Apr 15, 2025', time: '10:30 AM', type: 'Check-up', status: 'Schedule' },
  { patient: 'Olivia Davis', doctor: 'Dr. Sarah Adams', date: 'Apr 15, 2025', time: '10:30 AM', type: 'Consultation', status: 'Schedule' },
  { patient: 'Olivia Davis', doctor: 'Dr. Sarah Adams', date: 'Apr 15, 2025', time: '10:30 AM', type: 'Check-up', status: 'Schedule' },
];

const statusColors = {
  'Schedule': 'bg-green-100 text-green-600',
  'Checked In': 'bg-yellow-100 text-yellow-600',
};

const Appointments = () => (
  <div className="space-y-8">
    <h1 className="text-2xl font-bold">Appointments</h1>
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      {/* Top controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search appointment..."
            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="px-5 py-2 rounded-lg bg-pink-400 text-white font-semibold text-sm hover:bg-pink-500">Schedule appointment</button>
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
              <th className="px-4 py-2 text-left font-semibold">Patients</th>
              <th className="px-4 py-2 text-left font-semibold">Doctor</th>
              <th className="px-4 py-2 text-left font-semibold">Date</th>
              <th className="px-4 py-2 text-left font-semibold">Time</th>
              <th className="px-4 py-2 text-left font-semibold">Type</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={i} className="border-b last:border-b-0">
                <td className="px-4 py-2 whitespace-nowrap">{a.patient}</td>
                <td className="px-4 py-2 whitespace-nowrap">{a.doctor}</td>
                <td className="px-4 py-2 whitespace-nowrap">{a.date}</td>
                <td className="px-4 py-2 whitespace-nowrap">{a.time}</td>
                <td className="px-4 py-2 whitespace-nowrap">{a.type}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[a.status]}`}>{a.status}</span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                  {/* Edit icon */}
                  <button className="text-gray-500 hover:text-pink-500" title="Edit">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6" /></svg>
                  </button>
                  {/* Delete icon */}
                  <button className="text-gray-500 hover:text-red-500" title="Delete">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
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

export default Appointments; 