import React, { useState } from 'react';
import { FiArrowLeft, FiCalendar, FiClock, FiPackage, FiMessageSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointments: true,
    testResults: true,
    ordersShipping: true,
    communityActivity: false
  });

  const recentNotifications = [
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Reminder: Your virtual consultation with Dr. Sarah Chen is tomorrow at 2:00 PM.',
      date: 'April 02, 2023 - 4:00 PM',
      actions: ['View Details', 'Join Call']
    },
    {
      id: 2,
      type: 'test_results',
      title: 'Test Results Available',
      message: 'Your Hormone Panel results are now available. View them in your profile.',
      date: 'April 02, 2023 - 8:00 AM',
      actions: ['View Results']
    },
    {
      id: 3,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #GCH-432931 has been shipped and should arrive in 2-3 business days.',
      date: 'March 02, 2023 - 4:00 PM',
      actions: ['Track Order']
    },
    {
      id: 4,
      type: 'community',
      title: 'New Reply to Your Post',
      message: 'Susan replied to your discussion "PCOS Management Tips" in the Community Forum.',
      date: 'March 02, 2023 - 4:00 PM',
      actions: ['View Reply']
    }
  ];

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const getActionButton = (action) => {
    const baseClasses = "text-sm font-medium px-4 py-2 rounded-md";
    return action === "Join Call" 
      ? <button className={`${baseClasses} bg-pink-500 text-white hover:bg-pink-600`}>{action}</button>
      : <button className={`${baseClasses} text-pink-600 hover:text-pink-700`}>{action}</button>;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <Link to="/profile" className="flex items-center text-gray-600 hover:text-gray-800">
          <FiArrowLeft className="mr-2" />
          Back
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900 mt-4">Notifications</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Settings Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">Email Notifications</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Receive important updates via email</span>
                  <button 
                    onClick={() => handleToggle('emailNotifications')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.emailNotifications ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">SMS Notifications</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Receive text message alerts</span>
                  <button 
                    onClick={() => handleToggle('smsNotifications')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.smsNotifications ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">Notification Types</h3>
                <div className="space-y-4">
                  {[
                    { key: 'appointments', label: 'Appointments', desc: 'Reminders and scheduling updates' },
                    { key: 'testResults', label: 'Test Results', desc: 'Alerts when results are ready' },
                    { key: 'ordersShipping', label: 'Orders & Shipping', desc: 'Updates about your purchases' },
                    { key: 'communityActivity', label: 'Community Activity', desc: 'Replies to your posts and messages' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      <button 
                        onClick={() => handleToggle(item.key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings[item.key] ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="mt-6 w-full bg-pink-100 text-pink-600 py-2 px-4 rounded-md hover:bg-pink-200 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>

        {/* Recent Notifications */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            {recentNotifications.map(notification => (
              <div key={notification.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                  <span className="text-xs text-gray-500">{notification.date}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                <div className="flex space-x-3">
                  {notification.actions.map((action, index) => (
                    <React.Fragment key={index}>
                      {getActionButton(action)}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            <button className="w-full text-sm text-gray-600 hover:text-gray-800 py-2">
              Load More Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings; 