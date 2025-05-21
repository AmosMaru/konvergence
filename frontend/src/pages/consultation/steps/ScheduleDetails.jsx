import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ScheduleDetails = ({ onNext, onBack }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Senior Gynecologist",
      image: "/doctors/sarah-johnson.jpg",
    },
    // Add more doctors as needed
  ];

  const handleSubmit = () => {
    onNext({
      date: selectedDate,
      time: selectedTime,
      doctorId: selectedDoctor?.id,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-pink-600 mr-4"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold">Choose date and time</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar and Time Selection */}
        <div>
          <div className="mb-6">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Available Times</h3>
            <div className="grid grid-cols-3 gap-3">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 text-sm rounded-lg border ${
                    selectedTime === time
                      ? "border-pink-500 bg-pink-50 text-pink-600"
                      : "border-gray-200 hover:border-pink-500"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctor Selection */}
        <div>
          <h3 className="text-lg font-medium mb-4">Select Doctor (Optional)</h3>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <button
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                className={`w-full p-4 border rounded-lg flex items-center space-x-4 ${
                  selectedDoctor?.id === doctor.id
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-200 hover:border-pink-500"
                }`}
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-12">
        <button
          onClick={handleSubmit}
          disabled={!selectedDate || !selectedTime}
          className="w-full md:w-auto px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continue Booking
        </button>
      </div>

      {/* How it Works */}
      <div className="mt-12">
        <h3 className="text-lg font-medium mb-4">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-3">
              1
            </div>
            <p className="text-sm">Book Your Appointment</p>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-3">
              2
            </div>
            <p className="text-sm">Confirmation & Reminders</p>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-3">
              3
            </div>
            <p className="text-sm">Join Your Consultation</p>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-3">
              4
            </div>
            <p className="text-sm">Follow-up Care</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetails;
