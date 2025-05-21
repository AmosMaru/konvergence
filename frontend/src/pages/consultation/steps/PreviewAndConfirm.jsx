import React, { useState } from "react";
import { useAuth } from "../../../lib/context/AuthContext";
import { useEffect } from "react";
import API from "../../../lib/api";

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

const PreviewAndConfirm = ({ bookingData, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const { user } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlecardInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.first_name || "",
        lastName: user?.last_name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        dateOfBirth: user?.date_of_birth || "",
        bio: user?.bio || "",
      });
    }
  }, [user]);

  const handleSubmit = async () => {
    const payload = {
      medical_staff: bookingData.doctor.id, // Ensure this is a valid UUID
      start_time: new Date(bookingData.date).toISOString(), // Convert to ISO 8601 datetime
      is_active: true, // Correct boolean type
      duration: "00:45:00", // Valid format: HH:MM:SS
      status: "new", // Assuming this matches enum/choices
      description: bookingData.description, // String description
      patient: user.id, // Ensure this is a valid UUID
    };

    try {
      const response = await API.post("/appointments/v1/appointments", payload);
      console.log("Appointment created successfully:", response.data);
      const paymentUrl =
        response.data?.response?.[0]?.details?.[0]?.payment_url;

      if (paymentUrl) {
        // Redirect user to payment page
        window.location.href = paymentUrl;
      } else {
        console.error("Payment URL not found in response:", response.data);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      // You might want to show an error message to the user here
    }
  };

  // Format date and time for summary
  const formattedDate = bookingData.date
    ? new Date(bookingData.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const formattedTime = bookingData.time || "";

  return (
    <div className="max-w-[1500px] mx-auto py-8">
      {/* Heading and Stepper Tabs for mobile */}
      <div className="mb-8 md:mb-0">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center md:text-left mb-4 md:mb-8">
          Schedule Consultation
        </h2>
        {/* Mobile stepper pill */}
        <div className="md:hidden w-full flex justify-center">
          <div className="bg-pink-100 rounded-xl px-4 py-3 w-full max-w-xs flex justify-center">
            <span className="bg-white rounded shadow px-8 py-2 font-semibold text-lg text-center">
              Review and confirm
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Card: Tabs, Summary, Form */}
        <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow border border-gray-100">
          {/* Stepper Tabs for desktop */}
          <div className="hidden md:flex mb-8">
            <div
              className="px-6 py-2 rounded-lg font-semibold text-gray-400 bg-gray-50 border border-gray-100 mr-2 cursor-pointer"
              onClick={onBack}
            >
              Choose date and Time
            </div>
            <div
              className="px-6 py-2 rounded-lg font-semibold text-gray-400 bg-gray-50 border border-gray-100 mr-2 cursor-pointer"
              onClick={onBack}
            >
              Consultation Details
            </div>
            <div className="px-6 py-2 rounded-lg font-semibold text-pink-600 bg-pink-100 border border-pink-200">
              Review and confirm
            </div>
          </div>

          {/* Appointment Summary */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-6">Appointment Summary</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="pt-1">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-pink-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <div>
                  <div className="text-xs text-gray-500 font-medium">
                    Date & Time
                  </div>
                  <div className="text-sm text-gray-900 font-semibold">
                    {formattedDate} at {formattedTime}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="pt-1">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-pink-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z"
                    />
                  </svg>
                </span>
                <div>
                  <div className="text-xs text-gray-500 font-medium">
                    Consultation Type
                  </div>
                  <div className="text-sm text-gray-900 font-semibold">
                    {bookingData.consultationType}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="pt-1">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-pink-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A2 2 0 0021 6.382V6a2 2 0 00-2-2H5a2 2 0 00-2 2v.382a2 2 0 001.447 1.342L9 10m6 0v10a2 2 0 01-2 2H7a2 2 0 01-2-2V10m6 0V4m0 6h.01"
                    />
                  </svg>
                </span>
                <div>
                  <div className="text-xs text-gray-500 font-medium">
                    Consultation Format
                  </div>
                  <div className="text-sm text-gray-900 font-semibold">
                    Secure Video Call (45 minutes)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Information */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4">Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.firstName + " " + formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-pink-500 focus:border-pink-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-pink-500 focus:border-pink-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-pink-500 focus:border-pink-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-pink-500 focus:border-pink-500 text-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
            <div className="space-y-4">
              <div
                className={`border rounded-lg p-4 ${
                  paymentMethod === "card"
                    ? "border-pink-400 bg-pink-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="ml-3 font-semibold text-gray-900">
                    Credit or Debit Card
                  </span>
                </label>
                <div className="text-xs text-gray-500 mt-1 mb-4 ml-7">
                  Pay securely with your card
                </div>
                {paymentMethod === "card" && (
                  <div className="space-y-3 ml-7">
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handlecardInputChange}
                      placeholder="1234 1234 1234 1234"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-pink-500 focus:border-pink-500 text-sm"
                      required
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardData.expiryDate}
                        onChange={handlecardInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-pink-500 focus:border-pink-500 text-sm"
                        required
                      />
                      <input
                        type="text"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handlecardInputChange}
                        placeholder="123"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-pink-500 focus:border-pink-500 text-sm"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`border rounded-lg p-4 ${
                  paymentMethod === "paypal"
                    ? "border-pink-400 bg-pink-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="ml-3 font-semibold text-gray-900">
                    Paypal
                  </span>
                </label>
                <div className="text-xs text-gray-500 mt-1 ml-7">
                  Pay using your PayPal account
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Consultation fee</span>
                <span className="font-semibold text-pink-600">Kes 250.00</span>
              </div>
              <div className="flex justify-between">
                <span>Consultation</span>
                <span className="font-semibold text-pink-600">Kes 250.00</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t">
                <span>Total</span>
                <span className="text-pink-600">Kes 500.00</span>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSubmit}
              disabled={
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.phone ||
                !formData.dateOfBirth
              }
              className="px-8 py-2 rounded-lg bg-pink-400 text-white font-semibold text-base hover:bg-pink-500 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
            >
              Confirm Booking
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

export default PreviewAndConfirm;
