import React from "react";

const CTASection = () => {
  return (
    <section className="h-[60vh] py-12 relative overflow-hidden flex items-center">
      <img
        src="/ControlHealth.png"
        alt="Woman with pink flowers"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      <div className="absolute inset-0 opacity-80 z-10"></div>

      <div className="absolute inset-0 z-20 max-w-[1500px] mx-auto px-6 flex items-center">
        <div className="flex flex-col items-start">
          <h2 className="text-3xl md:text-[40px] font-bold text-black mb-4 ">
            Ready to Take Control of Your Health?
          </h2>
          <p className="md:text-[18px] text-[#383838] mb-8 mt-4">
            Start with a chat, explore our resources, or book a consultation
            today.
          </p>
          <div className="flex flex-row gap-4 items-center">
            <button className="bg-white text-pink-500 px-4 md:px-6 py-3 rounded-lg font-bold shadow hover:bg-gray-100 transition-colors">
              Start chatting Now
            </button>
            <button className="bg-transparent border-2 border-white text-white px-4 md:px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-pink-500 transition-colors">
              Explore Test kits
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
