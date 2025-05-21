import { Check, ArrowRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-[1500px] mx-auto px-6 flex flex-col md:flex-row gap-12 md:gap-16">
        <div className="w-full md:w-1/2">
          <img
            src="/About.png"
            alt="Doctor and patient reviewing medical results"
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-[40px] font-bold text-black mb-6">
            About appointment app
          </h2>

          <p className="text-[18px] leading-relaxed w-full md:w-[80%] text-black mb-6">
            Founded by women's health specialists and patient advocates,
            appointment app combines technology with compassion to bring quality
            gynecological care to you.
          </p>

          <p className="text-[18px] leading-relaxed w-full md:w-[80%]  text-black mb-10">
            Our mission is to empower women through accessible healthcare
            resources, supportive community, and professional guidance -
            creating a world where no woman feels alone in her health journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 md:mb-8">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-[#fdc1d0] rounded-full flex items-center justify-center mr-3">
                <Check size={16} color="#000000" />
              </div>
              <div>
                <h3 className="font-semibold text-[18px] leading-relaxed mb-2">
                  Expert Care
                </h3>
                <p className="text-[16px] text-black">
                  Board-certified gynecologists
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 bg-[#fdc1d0] rounded-full flex items-center justify-center mr-3">
                <Check size={16} color="#000000" />
              </div>
              <div>
                <h3 className="font-semibold text-[18px] leading-relaxed mb-2">
                  Safe Space
                </h3>
                <p className="text-[16px] text-black">Judgment-free support</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 bg-[#fdc1d0] rounded-full flex items-center justify-center mr-3">
                <Check size={16} color="#000000" />
              </div>
              <div>
                <h3 className="font-semibold text-[18px] leading-relaxed mb-2">
                  Accessible
                </h3>
                <p className="text-[16px] text-black">
                  24/7 available resources
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 bg-[#fdc1d0] rounded-full flex items-center justify-center mr-3">
                <Check size={16} color="#000000" />
              </div>
              <div>
                <h3 className="font-semibold text-[18px] leading-relaxed mb-2">
                  Evidence-Based
                </h3>
                <p className="text-[16px] text-black">Up-to-date information</p>
              </div>
            </div>
          </div>

          <button className="bg-[#ff97b0] text-white text-lg font-bold px-6 py-4 rounded-lg flex items-center">
            Learn More
            <ArrowRight
              className="ml-2 font-bold text-lg"
              size={20}
              strokeWidth={1.5}
              color="white"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
