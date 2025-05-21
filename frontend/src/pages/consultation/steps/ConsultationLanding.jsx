import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ConsultationLanding = ({ onNext }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const availableTimes = [
    "9:00AM",
    "10:00AM",
    "11:00AM",
    "2:00PM",
    "3:00PM",
    "4:00PM",
  ];

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

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onNext({ date: selectedDate, time: selectedTime });
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto py-8">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">
        Schedule Consultation
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Card: Calendar, Tabs, Time Slots */}
        <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow border border-gray-100">
          {/* Tabs inside card, left-aligned */}
          <div className="flex mb-8">
            <div className="px-6 py-2 rounded-lg font-semibold text-pink-600 bg-pink-100 border border-pink-200 mr-2">
              Choose date and Time
            </div>
            <div className="px-6 py-2 rounded-lg font-semibold text-gray-400 bg-gray-50 border border-gray-100 mr-2">
              Consultation Details
            </div>
            <div className="px-6 py-2 rounded-lg font-semibold text-gray-400 bg-gray-50 border border-gray-100">
              Review and confirm
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Calendar */}
            <div>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                minDate={new Date()}
                className="rounded-lg border border-gray-200"
              />
            </div>
            {/* Time Slots */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-3 mb-8">
                {availableTimes.map((time, idx) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    disabled={idx === 0 || idx === 1} // Example: disable first two slots
                    className={`p-3 rounded-lg border w-full text-center font-semibold transition-colors duration-150 text-sm mb-2 flex items-center justify-center
                      ${
                        selectedTime === time
                          ? "border-pink-500 bg-pink-50 text-pink-600"
                          : "border-gray-200 hover:border-pink-400"
                      }
                      ${
                        idx === 0 || idx === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : ""
                      }`}
                  >
                    <span className="mr-2">
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="inline-block align-middle"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          strokeWidth="2"
                          className={
                            idx === 0 || idx === 1
                              ? "stroke-gray-300"
                              : "stroke-pink-400"
                          }
                        />
                        <path
                          d="M12 6v6l4 2"
                          strokeWidth="2"
                          className={
                            idx === 0 || idx === 1
                              ? "stroke-gray-300"
                              : "stroke-pink-400"
                          }
                        />
                      </svg>
                    </span>
                    {time}
                  </button>
                ))}
              </div>
              <button
                onClick={handleContinue}
                disabled={!selectedDate || !selectedTime}
                className="w-full py-3 rounded-lg bg-pink-400 text-white font-semibold text-lg disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
              >
                Continue to Details
              </button>
            </div>
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

export default ConsultationLanding;
