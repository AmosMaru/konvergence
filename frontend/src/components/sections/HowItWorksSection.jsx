import { ArrowRight } from "lucide-react";

const StepCard = ({ image, title, description, link }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
    <div className="h-96 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-6">
      <h3 className="text-[30px] md:text-[32px] font-semibold mb-2">{title}</h3>
      <p className="text-[#383838] text-[18px] mb-4">{description}</p>
      <a
        href={link}
        className="inline-flex items-center text-[#FF97B0] text-lg rounded-lg font-bold border border-[#FF97B0] py-4 px-6"
      >
        Learn More <ArrowRight size={16} className="ml-1" />
      </a>
    </div>
  </div>
);

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Talk to LISA",
      description: "Get answers to your SRH questions in your own language",
      image: "/ai.png",
      link: "/chat",
    },
    {
      title: "Book a Gynecologist",
      description:
        "Choose from licensed experts. Pick a time that works for you.",
      image: "/book.png",
      link: "/consultation",
    },
    {
      title: "Order a Self-Test Kit",
      description: "Delivered to your doorstep, privately and safely.",
      image: "/order.png",
      link: "#",
    },
    {
      title: "Join Our Community",
      description:
        "Connect with others. Ask questions. Learn from verified health experts.",
      image: "/join.png",
      link: "#",
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-[40px] font-bold text-black mb-4 mb-2">
            How It Works
          </h2>
          <p className="text-[#383838] text-[20px] font-semibold w-full md:w-[50%] mx-auto">
            Getting the care you need is easier than ever
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              image={step.image}
              title={step.title}
              description={step.description}
              link={step.link}

            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
