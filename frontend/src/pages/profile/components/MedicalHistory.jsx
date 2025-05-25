import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MedicalHistory = () => {
  const medicalConditions = [
    {
      id: 1,
      condition: 'Polycystic Ovary Syndrome (PCOS)',
      diagnosisDate: 'March 5, 2025',
      physician: 'Dr. Sarah Chen',
      notes: 'Managed with diet changes and exercise. Follow-up every 6 months'
    },
    {
      id: 2,
      condition: 'Seasonal Allergies',
      diagnosisDate: 'March 5, 2025',
      physician: 'Dr. Sarah Chen',
      notes: 'Managed with over-the-counter antihistamines.'
    },
    {
      id: 3,
      condition: 'Polycystic Ovary Syndrome (PCOS)',
      diagnosisDate: 'March 5, 2025',
      physician: 'Dr. Sarah Chen',
      notes: 'Managed with diet changes and exercise. Follow-up every 6 months'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <Link to="/profile" className="flex items-center text-gray-600 hover:text-gray-800">
          <FiArrowLeft className="mr-2" />
          Back
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900 mt-4">Your Medical History</h1>
      </div>

      <div className="space-y-4">
        {medicalConditions.map((condition) => (
          <div key={condition.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{condition.condition}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Diagnosis Date:</p>
                  <p className="text-sm text-gray-900">{condition.diagnosisDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Treating Physician:</p>
                  <p className="text-sm text-gray-900">{condition.physician}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Notes:</p>
                <p className="text-sm text-gray-900">{condition.notes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalHistory; 