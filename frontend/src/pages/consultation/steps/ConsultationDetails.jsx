import React, { useState, useEffect } from "react";
import axios from "axios";

// const consultationTypes = [
//   "General Gynecological Consultation",
//   "Prenatal Care Consultation",
//   "Menopause Management",
//   "Contraception Options",
//   "Fertility Consultation",
//   "Other Concerns",
// ];

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

const ConsultationDetails = ({ onNext, onBack }) => {
  // const [selectedType, setSelectedType] = useState(consultationTypes[0]);
  const [description, setDescription] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [medicalStaff, setMedicalStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicalStaff = async () => {
      try {
        const response = await axios.get(
          "https://gynocare.kilush.com/auth/v1/users/get_medical_staff"
        );
        if (response.data.success) {
          setMedicalStaff(response.data.response[0].details[0].data);
        }
      } catch (error) {
        console.error("Error fetching medical staff:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalStaff();
  }, []);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSubmit = () => {
    if (selectedDoctor) {
      onNext({
        doctor: selectedDoctor,
        description: description,
        // consultationType: "General Consultation",
      });
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto py-8">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">
        Schedule Consultation
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Card: Tabs, Form */}
        <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow border border-gray-100">
          {/* Tabs inside card, left-aligned */}
          <div className="flex mb-8">
            <div
              className="px-6 py-2 rounded-lg font-semibold text-gray-400 bg-gray-50 border border-gray-100 mr-2 cursor-pointer"
              onClick={onBack}
            >
              Choose date and Time
            </div>
            <div className="px-6 py-2 rounded-lg font-semibold text-pink-600 bg-pink-100 border border-pink-200 mr-2">
              Consultation Details
            </div>
            <div className="px-6 py-2 rounded-lg font-semibold text-gray-400 bg-gray-50 border border-gray-100">
              Review and confirm
            </div>
          </div>

          {/* Consultation Type */}
          {/* <div className="mb-8">
            <h3 className="font-semibold mb-4">Consultation type</h3>
            <div className="space-y-3">
              {consultationTypes.map((type) => (
                <label key={type} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="consultationType"
                    value={type}
                    checked={selectedType === type}
                    onChange={() => setSelectedType(type)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <span className="ml-3 text-gray-900">{type}</span>
                </label>
              ))}
            </div>
          </div> */}

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-semibold mb-2">Brief Description of Concern</h3>
            <textarea
              className="w-full min-h-[80px] p-4 border border-gray-200 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500 resize-none"
              placeholder="Please briefly describe your health concern or reasons for consultation."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="text-xs text-pink-400 mt-2">
              This information helps our doctor prepare for your appointment.
              All information is kept confidential.
            </div>
          </div>

          {/* Doctor Selection */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Select Doctor (Optional)</h3>
            {loading ? (
              <div className="text-center py-8">Loading doctors...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {medicalStaff.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`bg-white rounded-xl p-6 shadow border cursor-pointer transition-all ${
                      selectedDoctor?.id === doctor.id
                        ? "border-pink-400 bg-pink-50"
                        : "border-gray-100 hover:border-pink-200"
                    }`}
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        {doctor.profile_picture ? (
                          <img
                            src={doctor.profile_picture}
                            alt={doctor.first_name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl text-gray-500">
                            {doctor.first_name[0]}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Dr. {doctor.first_name} {doctor.last_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {doctor.profession || "General Practitioner"}
                        </p>
                      </div>
                    </div>
                    {/* {doctor.phone && (
                      <div className="mt-4 text-sm text-gray-600">
                        <span className="font-medium">Contact:</span>{" "}
                        {doctor.phone}
                      </div>
                    )} */}
                  </div>
                ))}
              </div>
            )}
            <div className="text-xs text-pink-400 mt-2">
              If you don't select a specific doctor, we'll match you with the
              first available specialist appropriate for your concern.
            </div>
          </div>

          {/* Review Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!selectedDoctor}
              className="px-8 py-2 rounded-lg bg-pink-400 text-white font-semibold text-base hover:bg-pink-500 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
            >
              Review appointment
            </button>
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

export default ConsultationDetails;
