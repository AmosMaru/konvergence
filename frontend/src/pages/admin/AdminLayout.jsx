import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: '/logo.png' },
  { name: 'Patients', path: '/admin/patients', icon: '/Patients.png' },
  { name: 'Appointment', path: '/admin/appointments', icon: '/Appointment.png' },
  { name: 'Doctors', path: '/admin/doctors', icon: '/doctor.png' },
  { name: 'Billings', path: '/admin/billings', icon: '/Billings.png' },
  { name: 'Settings', path: '/admin/settings', icon: '/Settings.png' },
  { name: 'Reports', path: '/admin/reports', icon: '/reports.png' },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen flex flex-col overflow-hidden">
        {/* Logo area with white background, flush with top/left */}
        <div className="bg-white pt-8 pb-4 flex items-center justify-center">
          <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
        </div>
        {/* Pink nav area with rounded bottom corners */}
        <div className="flex-1 bg-[#FF97B0] flex flex-col px-4 pt-4 rounded-bl-2xl rounded-br-2xl">
          <nav className="flex-1 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center px-4 py-2 rounded-lg font-medium text-base transition-colors duration-150 ${
                  location.pathname.startsWith(link.path)
                    ? 'bg-white text-pink-600'
                    : 'text-white hover:bg-pink-200'
                }`}
              >
                <img src={link.icon} alt={link.name + ' icon'} className="mr-3 w-6 h-6" />
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">Jane Doe</span>
            <img src="/Avatar.png" alt="User" className="h-10 w-10 rounded-full object-cover" />
          </div>
        </header>
        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 