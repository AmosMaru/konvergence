import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const TestResults = () => {
  // Sample test results data - replace with actual API data
  const testResults = [
    {
      id: 1,
      type: 'Hormone Panel',
      date: 'March 5, 2025',
      physician: 'Dr. Sarah Chen',
      status: 'Normal',
      summary: 'All hormone levels are within normal range.'
    },
    {
      id: 2,
      type: 'Hormone Panel',
      date: 'March 5, 2025',
      physician: 'Dr. Sarah Chen',
      status: 'Normal',
      summary: 'All hormone levels are within normal range.'
    },
    {
      id: 3,
      type: 'Hormone Panel',
      date: 'March 5, 2025',
      physician: 'Dr. Sarah Chen',
      status: 'Normal',
      summary: 'All hormone levels are within normal range.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <Link to="/profile" className="flex items-center text-gray-600 hover:text-gray-800">
          <FiArrowLeft className="mr-2" />
          Back
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900 mt-4">Your Test Results</h1>
      </div>

      <div className="space-y-6">
        {testResults.map((test) => (
          <div key={test.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{test.type}</h3>
                <div className="mt-1 space-y-1">
                  <p className="text-sm text-gray-600">Test Date: {test.date}</p>
                  <p className="text-sm text-gray-600">Physician: {test.physician}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {test.status}
              </span>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-700 font-medium">Summary:</p>
              <p className="text-sm text-gray-600">{test.summary}</p>
            </div>

            <div className="mt-4">
              <button className="text-sm text-pink-600 hover:text-pink-700 font-medium">
                View full reports
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResults; 