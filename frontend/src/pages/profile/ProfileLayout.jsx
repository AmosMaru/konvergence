import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";
import { User } from "lucide-react";
const ProfileLayout = () => {
  const location = useLocation();
  const { user } = useAuth();

  const sidebarLinks = [
    { icon: "📅", label: "Book Appointment", to: "/consultation" },
    { icon: "📋", label: "View Test Results", to: "/profile/test-results" },
    { icon: "🛒", label: "Order Test Kits", to: "/profile/order-tests" },
    { icon: "📝", label: "Medical History", to: "/profile/medical-records" },
    { icon: "🔔", label: "Notifications", to: "/profile/notifications" },
    { icon: "🔒", label: "Privacy Policy", to: "/profile/privacy" },
  ];

  const tabs = [
    { label: "Profile", to: "/profile" },
    { label: "Appointments", to: "/profile/appointments" },
    // { label: "Test Results", to: "/profile/test-results" },
    // { label: "Orders", to: "/profile/orders" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              {/* User Info */}
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={user?.avatar || "/default-avatar.jpg"}
                    alt={user?.first_name + " " + user?.last_name}
                    className="w-24 h-24 rounded-full mx-auto"
                  />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">
                  {user?.first_name + " " + user?.last_name}
                </h3>
                <p className="text-sm text-pink-600">{user?.email}</p>
                <Link
                  to="/profile/settings"
                  className="mt-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Account Settings
                </Link>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Quick Links
                </h4>
                <nav className="space-y-2">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-lg"
                    >
                      <span className="mr-3">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9">
            <div className="bg-white rounded-lg shadow">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {tabs.map((tab) => (
                    <Link
                      key={tab.label}
                      to={tab.to}
                      className={`px-6 py-4 text-sm font-medium ${
                        location.pathname === tab.to
                          ? "border-b-2 border-pink-500 text-pink-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Content */}
              <div className="p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
