import React from 'react';
import { Link } from 'react-router-dom';

const ConsultationCTA = () => {
  return (
    <div className="mt-6 bg-pink-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Need more personalized help?
      </h3>
      <p className="text-gray-600 mb-4">
        Our chat assistant can provide general information, but for personalized medical advice, consider booking a virtual consultation with a healthcare professional.
      </p>
      <Link
        to="/consultation"
        className="inline-block bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
      >
        Book a Consultation
      </Link>
    </div>
  );
};

export default ConsultationCTA; 