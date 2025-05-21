import React from "react";

const TestimonialCard = ({
  image,
  name,
  role,
  quote,
  bg,
  widthClass,
  quoteSizeClass,
  contentShiftClass,
  avatarClass,
  avatarImgClass,
}) => (
  <div className="relative flex flex-col items-center">
    {/* Pink background shape PNG - make it larger */}
    <img
      src={bg}
      alt="background shape"
      className={`absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${widthClass} max-w-none h-auto pointer-events-none select-none`}
    />
    {/* Card content - no bg-white or shadow, add max-w and responsive padding */}
    <div
      className={`relative p-8 z-10 w-full flex flex-col items-center min-h-[320px] ${widthClass} mx-auto`}
    >
      {/* Avatar overlaps top edge */}
      <div className={`absolute z-20 ${avatarClass}`}>
        <img
          src={image}
          alt={name}
          className={`rounded-full border-4 border-white shadow-md object-cover ${avatarImgClass}`}
        />
      </div>
      <div className={`pt-12 text-center w-full ${contentShiftClass}`}>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
        <div className="flex flex-col items-center mt-2 mb-2">
          <span className="text-pink-400 text-2xl leading-none">&#10078;</span>
        </div>
        <p
          className={`text-gray-600 italic mt-2 leading-relaxed ${quoteSizeClass}`}
        >
          {quote}
        </p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Hannah Schmitt",
      role: "Engineer",
      image: "/avatar2.jpg",
      bg: "/Testimonal1.png",
      quote:
        "The chat support helped me understand my symptoms when I was too embarrassed to ask anyone else. The gynecologist I later consulted through the platform was incredibly kind and professional.",
    },
    {
      name: "Hannah Schmitt",
      role: "Marketer",
      image: "/avatar1.jpg",
      bg: "/Testimonial2.png",
      quote:
        "Being able to order test kits discreetly and get professional results has been a game-changer for my regular health monitoring. The community forums also provide so much valuable peer support.",
    },
    {
      name: "Hannah Schmitt",
      role: "Product designer",
      image: "/avatar3.jpg",
      bg: "/Testimonial3.png",
      quote:
        "As someone living in a rural area, the virtual consultations have given me access to specialists I couldn't otherwise see easily. This service is truly life-changing.",
    },
  ];

  return (
    <section className="py-12 md:py-24  bg-pink-50 min-h-[700px]">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="text-center mb-16 md:mb-32">
          <h2 className="text-3xl md:text-[40px] font-bold text-black mb-4">
            What Women Like You Are Saying
          </h2>
          <p className="text-[#383838] text-[20px] font-semibold w-full md:w-[50%] mx-auto">
            Hear from women who have found support, answers, and care through
            our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 gap-24">
          {testimonials.map((testimonial, index) => {
            const widthClass = index === 1 ? "w-[100%]" : "w-[100%]";
            const quoteSizeClass = index === 1 ? "text-[15px]" : "text-[12px]";
            const contentShiftClass =
              index === 0 ? "pl-8" : index === 2 ? "pr-8" : "";

            let avatarClass = "";
            let avatarImgClass = "";
            if (index === 0) {
              avatarClass = "-top-6 left-1/2 -translate-x-[40%]";
              avatarImgClass = "w-24 h-24";
            } else if (index === 1) {
              avatarClass = "-top-14 left-1/2 -translate-x-1/2";
              avatarImgClass = "w-32 h-32";
            } else if (index === 2) {
              avatarClass = "-top-6 left-1/2 -translate-x-[60%]";
              avatarImgClass = "w-24 h-24";
            }
            return (
              <TestimonialCard
                key={index}
                image={testimonial.image}
                name={testimonial.name}
                role={testimonial.role}
                quote={testimonial.quote}
                bg={testimonial.bg}
                widthClass={widthClass}
                quoteSizeClass={quoteSizeClass}
                contentShiftClass={contentShiftClass}
                avatarClass={avatarClass}
                avatarImgClass={avatarImgClass}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
