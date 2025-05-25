import React from "react";

const ValueCard = ({ title, description }) => (
  <div className="border-[1px] border-pink-300 rounded-lg flex flex-col items-center text-center p-6">
    <div className="w-12 h-12 flex items-center justify-center mb-4 text-pink-500">
      <img src="/heart.png" alt="Heart icon" className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const CoreValues = () => {
  const values = [
    {
      icon: "❤️",
      title: "Compassionate Care",
      description:
        "We approach every interaction with empathy and understanding to earn patient trust and loyalty.",
    },
    {
      icon: "📚",
      title: "Evidence-Based",
      description:
        "All our decisions and recommendations are grounded in medical science and regularly updated by our clinical team.",
    },
    {
      icon: "🔓",
      title: "Accessibility",
      description:
        "We're committed to making healthcare accessible through a combination of insights, empathy, and accessibility values.",
    },
    {
      icon: "👥",
      title: "Community",
      description:
        "We believe in building a supportive community where everyone's experience is respected, medical care and support.",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-[1500px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
