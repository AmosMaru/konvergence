import {
  MessageCircle,
  Users,
  FileText,
  Monitor,
  RefreshCw,
  HelpCircle,
} from "lucide-react";

const ServiceCard = ({ icon, title, description }) => (
  <div className="border border-[#FF97B033] rounded-xl p-6 text-center">
    <div className="w-16 h-16 bg-[#ff97b0] rounded-full flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-[20px] font-semibold mb-3">{title}</h3>
    <p className="text-[#383838] text-lg leading-relaxed w-full md:w-[80%] mx-auto">
      {description}
    </p>
  </div>
);

const ServicesSection = () => {
  const services = [
    {
      title: "Chat Support",
      description:
        "Get immediate answers to your gynaecological concerns with our AI-powered chat assistant.",
      icon: <MessageCircle size={24} color="white" />,
    },
    {
      title: "Community Forum",
      description:
        "Connect with others, share experiences, and find support in our moderated community.",
      icon: <Users size={24} color="white" />,
    },
    {
      title: "Blog & Resources",
      description:
        "Access expert articles, testimonials, and evidence-based information on women's health.",
      icon: <FileText size={24} color="white" />,
    },
    {
      title: "Virtual Consultation",
      description:
        "Book private video consultations with certified gynaecologists from the comfort of home.",
      icon: <Monitor size={24} color="white" />,
    },
    {
      title: "Self-Test Kits",
      description:
        "Order discreet, easy-to-use home testing kits with professional lab analysis.",
      icon: <RefreshCw size={24} color="white" />,
    },
    {
      title: "Contact Support",
      description:
        "Reach our dedicated support team through multiple channels for personalized assistance.",
      icon: <HelpCircle size={24} color="white" />,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-[40px] leading-[48px] font-bold text-black mb-4">
            Our Services
          </h2>
          <p className="text-[18px] text-[#383838] w-full md:w-[60%] mx-auto">
            appointment app offers a comprehensive suite of services designed to
            address your gynecological health needs with privacy and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
