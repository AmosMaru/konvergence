import React from "react";

const MissionVision = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1500px] mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="border-[1px] border-pink-300 rounded-lg p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To make virtual healthcare accessible for women and girls in
              Africa by providing a safe space for them to connect to safe,
              qualified doctors to professionally treat and care for them.
            </p>
          </div>
          <div className="border-[1px] border-pink-300 rounded-lg p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600">
              A world where no woman has to face health hurdles, where
              gynecological care is easily accessible, and where women are
              empowered and supported to succeed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
