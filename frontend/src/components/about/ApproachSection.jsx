import React from "react";

const ApproachCard = ({ title, description }) => (
  <div className="bg-transparent p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ApproachSection = () => {
  const approaches = [
    {
      title: "Holistic & Patient-Centered",
      description:
        "We take a holistic, patient-centered approach. Gynecological care isn't just about treating symptoms—it's about understanding each woman's unique needs, her overall health, her concerns, and how we can advocate support that completely benefits her.",
    },
    {
      title: "Evidence-Based & Up-to-Date",
      description:
        "As healthcare evolves and digital innovations shape today's solutions and experiences, we follow the latest research and stay current with new developments. We listen to our patients while also keeping alive when smart research is emerging.",
    },
    {
      title: "Technology with Heart",
      description:
        "While we leverage technology to increase accessibility, we ensure that every interaction retains its human touch. The power of our service, technology makes it possible, but the human connection makes it meaningful.",
    },
    {
      title: "Culturally Sensitive",
      description:
        "We recognize the importance of cultural sensitivity and healthcare and strive to provide culturally relevant care and support. Our trained diverse background helps us deliver care that resonates.",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-[1500px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Approach
        </h2>
        <div className="border-[1px] border-grey-300 bg-pink-50 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8">
          {approaches.map((approach, index) => (
            <ApproachCard
              key={index}
              title={approach.title}
              description={approach.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
