import React, { useState } from 'react';

const users = [
  { name: 'Admin User', email: 'admin@appointmentapp.com', role: 'Administrator', lastLogin: 'Apr 27, 2025, 9:15 AM', status: 'Active' },
  { name: 'Dr. Sarah Adams', email: 'admin@appointmentapp.com', role: 'Doctor', lastLogin: 'Apr 27, 2025, 9:15 AM', status: 'Active' },
  { name: 'Olivia Davis', email: 'admin@appointmentapp.com', role: 'Doctor', lastLogin: 'Apr 27, 2025, 9:15 AM', status: 'Active' },
  { name: 'Sophia Miller', email: 'admin@appointmentapp.com', role: 'Gynaecologist', lastLogin: 'Apr 27, 2025, 9:15 AM', status: 'Active' },
  { name: 'Emma Johnson', email: 'admin@appointmentapp.com', role: 'Gynaecologist', lastLogin: 'Apr 27, 2025, 9:15 AM', status: 'Active' },
];

const statusColors = {
  Active: 'bg-green-100 text-green-600',
  Inactive: 'bg-yellow-100 text-yellow-600',
};

const Settings = () => {
  const [tab, setTab] = useState('General');
  const [showAddUser, setShowAddUser] = useState(false);
  const [toggles, setToggles] = useState({
    newAppointment: true,
    rescheduling: true,
    cancellations: true,
    testResults: false,
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('General')} className={`px-6 py-2 rounded-t-lg font-semibold ${tab === 'General' ? 'bg-pink-200 text-pink-700' : 'bg-gray-100 text-gray-500'}`}>General</button>
          <button onClick={() => setTab('User Management')} className={`px-6 py-2 rounded-t-lg font-semibold ${tab === 'User Management' ? 'bg-pink-200 text-pink-700' : 'bg-gray-100 text-gray-500'}`}>User Management</button>
        </div>
        {/* General Tab */}
        {tab === 'General' && (
          <form className="space-y-8">
            {/* Practice Information */}
            <div>
              <h2 className="font-bold mb-4">Practice Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Practice Name</label>
                  <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Website</label>
                  <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                </div>
              </div>
            </div>
            {/* Business Hours */}
            <div>
              <h2 className="font-bold mb-4">Business Hours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Monday - Friday</label>
                  <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" defaultValue="9:00AM-5:00PM" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Saturday</label>
                  <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" defaultValue="10:00 AM - 2:00 PM" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sunday</label>
                  <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" defaultValue="Closed" />
                </div>
              </div>
            </div>
            {/* Email Notifications */}
            <div>
              <h2 className="font-bold mb-4">Email Notifications</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span>New Appointment</span>
                  <input type="checkbox" checked={toggles.newAppointment} onChange={() => setToggles(t => ({ ...t, newAppointment: !t.newAppointment }))} className="toggle toggle-success" />
                </div>
                <div className="flex items-center gap-3">
                  <span>Appointment Rescheduling</span>
                  <input type="checkbox" checked={toggles.rescheduling} onChange={() => setToggles(t => ({ ...t, rescheduling: !t.rescheduling }))} className="toggle toggle-success" />
                </div>
                <div className="flex items-center gap-3">
                  <span>Appointment Cancellations</span>
                  <input type="checkbox" checked={toggles.cancellations} onChange={() => setToggles(t => ({ ...t, cancellations: !t.cancellations }))} className="toggle toggle-success" />
                </div>
                <div className="flex items-center gap-3">
                  <span>Test Results Available</span>
                  <input type="checkbox" checked={toggles.testResults} onChange={() => setToggles(t => ({ ...t, testResults: !t.testResults }))} className="toggle toggle-success" />
                </div>
              </div>
            </div>
          </form>
        )}
        {/* User Management Tab */}
        {tab === 'User Management' && !showAddUser && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">User List</h2>
              <button onClick={() => setShowAddUser(true)} className="px-5 py-2 rounded-lg bg-pink-400 text-white font-semibold text-sm hover:bg-pink-500">Add user</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-pink-50 text-gray-700">
                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                    <th className="px-4 py-2 text-left font-semibold">Email</th>
                    <th className="px-4 py-2 text-left font-semibold">Role</th>
                    <th className="px-4 py-2 text-left font-semibold">Last Login</th>
                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i} className="border-b last:border-b-0">
                      <td className="px-4 py-2 whitespace-nowrap">{u.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{u.email}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{u.role}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{u.lastLogin}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[u.status]}`}>{u.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Add User Form */}
        {tab === 'User Management' && showAddUser && (
          <form className="space-y-8">
            <h2 className="font-bold mb-4">Add User</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
            </div>
            <div className="flex gap-4 justify-end">
              <button type="button" onClick={() => setShowAddUser(false)} className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2 rounded-lg bg-pink-400 text-white font-semibold hover:bg-pink-500">Add user</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings; 