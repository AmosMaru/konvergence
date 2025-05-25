import React from "react";

const TeamMemberCard = ({ image, name, role, experience }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg">
    <div className="w-full aspect-[4/3] bg-gray-100">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover object-center rounded-t-lg"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-pink-500 font-medium mb-4">{role}</p>
      <p className="text-gray-600 text-sm">{experience}</p>
    </div>
  </div>
);

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Dr. Jane Doe",
      role: "Founder & Chief Medical Officer",
      image: "/JaneDoe.png",
      experience:
        "Board-certified gynecologist with over 15 years of experience in women's healthcare. Leading expert in women's health and technology integration.",
    },
    {
      name: "Dr. John Doe",
      role: "Founder & Chief Medical Officer",
      image: "/JaneDoe.png",
      experience:
        "Board-certified gynecologist with over 15 years of experience in women's healthcare and technology integration.",
    },
    {
      name: "Dr. Jane Doe",
      role: "Founder & Chief Medical Officer",
      image: "/JaneDoe.png",
      experience:
        "Board-certified gynecologist with over 15 years of experience in women's healthcare and technology integration.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1500px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              image={member.image}
              name={member.name}
              role={member.role}
              experience={member.experience}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
