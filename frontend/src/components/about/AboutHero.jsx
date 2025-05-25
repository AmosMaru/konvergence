import React, { useState, useEffect } from "react";

const images = ["/about-us.png", "/about-us2.png", "/about-us3.jpg"];

const AboutHero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] flex items-end justify-start bg-black">
      <img
        src={images[current]}
        alt="Medical diagram on tablet"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
      />

      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

      <div className="relative z-20 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl py-12 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About US
          </h1>
          <p className="text-lg text-white">
            appointment app provides women and girls with trusted SRH information,
            virtual consultations, and self-test kits—all in one safe,
            accessible, and supportive space.
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              current === idx ? "bg-pink-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default AboutHero;
