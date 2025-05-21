import React, { useState } from "react";
import ConsultationLanding from "./steps/ConsultationLanding";
import ConsultationDetails from "./steps/ConsultationDetails";
import PreviewAndConfirm from "./steps/PreviewAndConfirm";
import BookingConfirmation from "./steps/BookingConfirmation";

const ConsultationPage = () => {
  const [step, setStep] = useState(0);
  const [bookingData, setBookingData] = useState({});

  const handleNext = (data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[88vh] bg-gray-900 flex items-end">
        <img
          src="/consultation.jpg"
          alt="Blog Hero"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl py-12 mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Virtual <span className="text-white">Consultation</span>
            </h1>
            <p className="text-lg text-white">
              Access expert articles on gynecological health and read real
              experiences from our community members.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === 0 && <ConsultationLanding onNext={handleNext} />}
        {step === 1 && (
          <ConsultationDetails onNext={handleNext} onBack={handleBack} />
        )}
        {step === 2 && (
          <PreviewAndConfirm
            bookingData={bookingData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 3 && <BookingConfirmation />}
      </div>
    </div>
  );
};

export default ConsultationPage;
