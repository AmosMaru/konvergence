import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FF97B0]  ">
      <div className="max-w-[1500px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-[32px] md:text-5xl font-bold text-black leading-relaxed md:leading-[1.1] md:w-[80%] mb-6">
            Compassionate Gynaecological Care at Your Fingertips
          </h1>
          <p className="text-[20px] text-[#00000] leading-relaxed md:w-[80%] mb-8">
            Access expert resources, community support, and professional care
            whenever you need it - all in one trusted hub
          </p>
          <div className="flex space-x-4">
            <button onClick={() => navigate("/auth/signup")} className="bg-pink-500 text-sm md:text-base text-white font-semibold px-4 md:px-8 py-4 rounded-md hover:bg-pink-600">
              GET STARTED
            </button>
            <button onClick={() => navigate("/consultation")} className="border border-[#FF4975] text-sm md:text-base text-white hover:text-pink-500 font-semibold  px-4 md:px-8 py-4 rounded-md  hover:bg-pink-50">
              BOOK CONSULTATION
            </button>
          </div>
        </div>
        <div className="relative flex justify-center">
          <img
            src="/HeroNurse.png"
            alt="Female doctor with stethoscope"
            className="w-full max-w-md object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
