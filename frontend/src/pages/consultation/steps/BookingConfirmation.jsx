import React from "react";
import { Link } from "react-router-dom";

const howItWorks = [
  {
    title: "Book Your Appointment",
    description:
      "Select a date, time, and consultation type that works for you.",
  },
  {
    title: "Confirmation & Reminders",
    description:
      "Receive booking confirmation by email with appointment details and preparation instructions.",
  },
  {
    title: "Join Your Consultation",
    description:
      "Click the secure link in your email to join the video call at your scheduled time. No special software needed.",
  },
  {
    title: "Follow-Up Care",
    description:
      "Receive treatment plans, prescriptions, or referrals as needed, with easy options for follow-up appointments.",
  },
];

const BookingConfirmation = () => {
  return (
    <div className="max-w-[1500px] mx-auto py-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">
        Schedule Consultation
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Card: Confirmation */}
        <div className="md:col-span-2 bg-white rounded-2xl p-12 shadow border border-gray-100 flex flex-col items-center justify-center min-h-[420px]">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="mx-auto h-14 w-14 rounded-full bg-pink-100 flex items-center justify-center">
              <svg
                className="h-8 w-8 text-pink-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          {/* Confirmation Message */}
          <div className="mb-8 text-center">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Booking Confirmation
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Successful, Your appointment has been successfully booked
            </p>
          </div>
          {/* Action Buttons */}
          <div className="w-full flex flex-col items-center gap-3">
            <Link
              to="/"
              className="w-full md:w-1/2 px-8 py-2 rounded-lg bg-pink-400 text-white font-semibold text-base hover:bg-pink-500 transition-colors text-center"
            >
              Complete booking
            </Link>
            <Link
              to="/booking-details"
              className="w-full md:w-1/2 px-8 py-2 rounded-lg border border-pink-400 text-pink-500 font-semibold text-base bg-white hover:bg-pink-50 transition-colors text-center"
            >
              Back to Booking Details
            </Link>
          </div>
        </div>
        {/* Right Column: How it works and Important Information */}
        <div className="flex flex-col gap-8">
          {/* How it works */}
          <div className="bg-white rounded-2xl p-8 shadow border border-gray-100">
            <h3 className="text-xl font-semibold mb-6">How it works</h3>
            <div className="space-y-6">
              {howItWorks.map((step, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-4">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{step.title}</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Important Information */}
          <div className="bg-white rounded-2xl p-8 shadow border border-gray-100">
            <h3 className="text-xl font-semibold mb-6">
              Important Information
            </h3>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Cancellation Policy:</span> Free
                cancellation up to 24 hours before your appointment. Late
                cancellations may incur a fee.
              </div>
              <div>
                <span className="font-semibold">Connection Requirements:</span>{" "}
                A stable internet connection, and a device with a camera and
                microphone are required.
              </div>
              <div>
                <span className="font-semibold">Privacy:</span> All
                consultations are confidential and conducted through our secure,
                HIPAA-compliant platform.
              </div>
              <div>
                <span className="font-semibold">Emergencies:</span> Virtual
                consultations are not appropriate for medical emergencies.
                Please call emergency services if you need immediate care.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
