import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1500px] mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[#FF97B0] font-bold text-[24px] leading-[32px] mb-4">
              appointment app
            </h3>
            <p className="text-[#FFFFFF] text-[18px] font-light leading-[30px] w-full md:w-[85%] mb-6">
              Providing accessible, compassionate gynecological care and
              resources for all women.
            </p>
            <div className="flex items-center">
              <img
                src="/logo_blue.png"
                alt="appointment app Logo"
                className="h-20 md:h-32 w-20 md:w-32"
              />
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-[24px] leading-[32px] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-5">
              <li>
                <a
                  href="#"
                  className="text-[18px] leading-[30px] font-light  hover:text-[#FF97B0] focus:text-[#FF97B0]"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[18px] leading-[30px] font-light  hover:text-[#FF97B0] focus:text-[#FF97B0]"
                >
                  Chat Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[18px] leading-[30px] font-light  hover:text-[#FF97B0] focus:text-[#FF97B0]"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[18px] leading-[30px] font-light  hover:text-[#FF97B0] focus:text-[#FF97B0]"
                >
                  Blog & Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-[24px] leading-[32px] mb-4">
              Services
            </h3>
            <ul className="space-y-5">
              <li>
                <a
                  href="#"
                  className="text-[18px] leading-[30px] font-light  hover:text-[#FF97B0] focus:text-[#FF97B0]"
                >
                  Virtual Consultation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[18px] leading-[30px] font-light  hover:text-[#FF97B0] focus:text-[#FF97B0]"
                >
                  Self-Test Kits
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[18px] leading-[30px] font-light  hover:text-[#FF97B0] focus:text-[#FF97B0]"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-[24px] leading-[32px] mb-4">
              Contact Us
            </h3>
            <p className="text-[18px] leading-[30px] font-light mb-5">
              Email: info@appointmentapp.com
            </p>
            <p className="text-[18px] leading-[30px] font-light mb-5">
              Phone: +1 (555) 123-4567
            </p>
            <p className="text-[18px] leading-[30px] font-light">
              Hours: Mon-Fri, 9am-5pm
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#FFFFFF]">
        <div className="max-w-[1500px] mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[18px] leading-[30px] font-light">
            © {new Date().getFullYear()} appointment app. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <a
              href="#"
              className="text-[18px] leading-[30px] font-light  hover:text-[#FF97B0] focus:text-[#FF97B0]"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[18px] leading-[30px] font-light  hover:text-[#FF97B0] focus:text-[#FF97B0]"
            >
              Terms Of Services
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
