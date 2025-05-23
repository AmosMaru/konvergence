import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <img 
            src="/logo.png" 
            alt="appointment app Logo" 
            className="h-12 w-auto mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h1>
          <p className="text-lg text-gray-600">
            We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-pink-600 bg-pink-50 border border-transparent rounded-md hover:bg-pink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500"
          >
            <FiHome className="w-4 h-4 mr-2" />
            Return Home
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Need help? <a href="/contact" className="text-pink-600 hover:text-pink-700">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage; 