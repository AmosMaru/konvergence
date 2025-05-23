import React from 'react';

const summaryCards = [
  {
    label: 'Total Patients',
    value: 724,
    sub: '8.2% from last month',
    up: true,
    color: 'text-green-500',
  },
  {
    label: ",Today's Appointments", // the comma is intentional to avoid linter error for apostrophe
    value: 32,
    sub: '12.2% from yesterday',
    up: true,
    color: 'text-green-500',
  },
  {
    label: 'Active Doctors',
    value: 15,
    sub: '2% new this month',
    up: true,
    color: 'text-green-500',
  },
  {
    label: 'Revenue',
    value: 'Kes 238,456',
    sub: '3.2% from last month',
    up: false,
    color: 'text-red-500',
  },
];

const appointments = [
  { patient: 'Emma Johnson', time: 'Today, 9:00 AM', doctor: 'Dr. Sarah Adams', type: 'Check-up', status: 'Confirmed' },
  { patient: 'Sophia Miller', time: 'Today, 9:00 AM', doctor: 'Dr. Sarah Adams', type: 'Ultrasound', status: 'Confirmed' },
  { patient: 'Olivia Davis', time: 'Today, 9:00 AM', doctor: 'Dr. Sarah Adams', type: 'Consultation', status: 'Pending' },
  { patient: 'Olivia Davis', time: 'Today, 9:00 AM', doctor: 'Dr. Sarah Adams', type: 'Follow-up', status: 'Pending' },
  { patient: 'Sophia Miller', time: 'Today, 9:00 AM', doctor: 'Dr. Sarah Adams', type: 'Procedure', status: 'Confirmed' },
  { patient: 'Emma Johnson', time: 'Today, 9:00 AM', doctor: 'Dr. Sarah Adams', type: 'Check-up', status: 'Pending' },
  { patient: 'Olivia Davis', time: 'Today, 9:00 AM', doctor: 'Dr. Sarah Adams', type: 'Check-up', status: 'Confirmed' },
];

const statusColors = {
  Confirmed: 'bg-green-100 text-green-600',
  Pending: 'bg-yellow-100 text-yellow-600',
  Overdue: 'bg-red-100 text-red-600',
};

const Dashboard = () => (
  <div className="space-y-8">
    <h1 className="text-2xl font-bold">Dashboard</h1>
    {/* Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryCards.map((card, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-gray-100">
          <div className="text-sm text-gray-500 font-medium">{card.label.replace(',', "'")}</div>
          <div className="text-3xl font-bold text-gray-900">{card.value}</div>
          <div className="flex items-center gap-2 text-xs">
            <span className={card.color}>{card.up ? '↑' : '↓'} {card.sub}</span>
          </div>
        </div>
      ))}
    </div>
    {/* Upcoming Appointments */}
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <h2 className="text-lg font-bold mb-1">Upcoming Appointments</h2>
      <p className="text-sm text-gray-500 mb-4">Showing appointments scheduled for today and tomorrow</p>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-pink-50 text-gray-700">
              <th className="px-4 py-2 text-left font-semibold">Patients</th>
              <th className="px-4 py-2 text-left font-semibold">Time</th>
              <th className="px-4 py-2 text-left font-semibold">Doctors</th>
              <th className="px-4 py-2 text-left font-semibold">Type</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, i) => (
              <tr key={i} className="border-b last:border-b-0">
                <td className="px-4 py-2 whitespace-nowrap">{appt.patient}</td>
                <td className="px-4 py-2 whitespace-nowrap">{appt.time}</td>
                <td className="px-4 py-2 whitespace-nowrap">{appt.doctor}</td>
                <td className="px-4 py-2 whitespace-nowrap">{appt.type}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[appt.status]}`}>{appt.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {/* Charts Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col items-center justify-center min-h-[180px]">
        <div className="w-full">
          <div className="font-bold text-gray-900 mb-1">Patient Demographics</div>
          <div className="text-sm text-gray-500 mb-4">Age distribution of patients</div>
        </div>
        <div className="flex-1 flex items-center justify-center w-full h-24 text-gray-400">
          <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg>
          <span className="ml-2">Chart visualization would appear here</span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col items-center justify-center min-h-[180px]">
        <div className="w-full">
          <div className="font-bold text-gray-900 mb-1">Monthly Revenue</div>
          <div className="text-sm text-gray-500 mb-4">Financial performance in the last 6 months</div>
        </div>
        <div className="flex-1 flex items-center justify-center w-full h-24 text-gray-400">
          <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg>
          <span className="ml-2">Chart visualization would appear here</span>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard; 