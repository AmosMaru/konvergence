import React, { useState } from 'react';
import { FiDownload, FiEye, FiFileText, FiCalendar, FiClock } from 'react-icons/fi';

const MedicalRecords = () => {
  const [activeSection, setActiveSection] = useState('history');

  // Sample data - replace with actual API calls
  const medicalHistory = [
    {
      id: 1,
      condition: 'Polycystic Ovary Syndrome (PCOS)',
      diagnosedDate: '2023-08-15',
      doctor: 'Dr. Sarah Johnson',
      notes: 'Initial diagnosis following hormone level tests and ultrasound.',
      status: 'Active'
    },
    {
      id: 2,
      condition: 'Iron Deficiency Anemia',
      diagnosedDate: '2023-10-20',
      doctor: 'Dr. Michael Chen',
      notes: 'Prescribed iron supplements and dietary changes.',
      status: 'Managed'
    }
  ];

  const testResults = [
    {
      id: 1,
      name: 'Hormone Panel Test',
      date: '2024-03-10',
      type: 'Blood Test',
      doctor: 'Dr. Sarah Johnson',
      status: 'Completed',
      fileUrl: '#'
    },
    {
      id: 2,
      name: 'Pelvic Ultrasound',
      date: '2024-02-25',
      type: 'Imaging',
      doctor: 'Dr. Emily Brown',
      status: 'Completed',
      fileUrl: '#'
    }
  ];

  const prescriptions = [
    {
      id: 1,
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribedDate: '2024-03-15',
      duration: '3 months',
      doctor: 'Dr. Sarah Johnson',
      status: 'Active'
    },
    {
      id: 2,
      medication: 'Iron Supplements',
      dosage: '325mg',
      frequency: 'Once daily',
      prescribedDate: '2024-03-01',
      duration: '2 months',
      doctor: 'Dr. Michael Chen',
      status: 'Active'
    }
  ];

  const renderMedicalHistory = () => (
    <div className="space-y-4">
      {medicalHistory.map(item => (
        <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{item.condition}</h3>
              <p className="text-sm text-gray-600">Diagnosed by {item.doctor}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              item.status === 'Active' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
            }`}>
              {item.status}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 flex items-center">
              <FiCalendar className="mr-2" />
              Diagnosed on {new Date(item.diagnosedDate).toLocaleDateString()}
            </p>
            <p className="mt-2 text-sm text-gray-700">{item.notes}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTestResults = () => (
    <div className="space-y-4">
      {testResults.map(test => (
        <div key={test.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
              <p className="text-sm text-gray-600">{test.type} • {test.doctor}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:text-pink-600 rounded-full hover:bg-pink-50">
                <FiEye className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-pink-600 rounded-full hover:bg-pink-50">
                <FiDownload className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 flex items-center">
              <FiCalendar className="mr-2" />
              {new Date(test.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPrescriptions = () => (
    <div className="space-y-4">
      {prescriptions.map(prescription => (
        <div key={prescription.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{prescription.medication}</h3>
              <p className="text-sm text-gray-600">Prescribed by {prescription.doctor}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {prescription.status}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Dosage</p>
              <p className="text-sm text-gray-900">{prescription.dosage}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Frequency</p>
              <p className="text-sm text-gray-900">{prescription.frequency}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Prescribed Date</p>
              <p className="text-sm text-gray-900">{new Date(prescription.prescribedDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Duration</p>
              <p className="text-sm text-gray-900">{prescription.duration}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['history', 'tests', 'prescriptions'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`${
                activeSection === section
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm capitalize`}
            >
              {section}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeSection === 'history' && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Medical History</h2>
            {renderMedicalHistory()}
          </>
        )}
        {activeSection === 'tests' && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Test Results</h2>
            {renderTestResults()}
          </>
        )}
        {activeSection === 'prescriptions' && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Prescriptions</h2>
            {renderPrescriptions()}
          </>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords; 