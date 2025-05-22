import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[100vh] flex">
        <img
          src="/Contact.jpg"
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20 max-w-[1500px] mx-auto px-6 w-full flex items-end pb-16 md:pb-32">
          <div className="max-w-xl mb-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl font-semibold text-white">
              Have questions or need assistance? Our dedicated support team is
              here to help.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-2xl shadow border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Fill in the form to get your questions, feedback and messages to
              our support team.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-pink-600 text-white rounded-full font-bold hover:bg-pink-700 transition-colors duration-200"
              >
                Send
              </button>
            </form>
          </div>

          {/* Contact Options */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-2 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Contact Options</h2>
              <div className="space-y-6">
                {/* Chat Support */}
                <div className="flex items-start gap-3">
                  <span className="mt-1">
                    {/* Chat Icon */}
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M7 8h10M7 12h6" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-0.5">
                      Chat Support
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Available 24/7 for initial questions and guidance
                    </p>
                    <a
                      href="/chat"
                      className="text-pink-500 hover:underline text-sm"
                    >
                      Start Chatting
                    </a>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start gap-3">
                  <span className="mt-1">
                    {/* Email Icon */}
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-0.5">Email</h3>
                    <p className="text-gray-700 text-sm">
                      For detailed inquiries and non-urgent matters
                    </p>
                    <a
                      href="mailto:support@appointmentapp.com"
                      className="text-pink-500 hover:underline text-sm"
                    >
                      support@appointmentapp.com
                    </a>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <span className="mt-1">
                    {/* Phone Icon */}
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.23.72 3.28a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c1.05.35 2.15.59 3.28.72A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-0.5">Phone</h3>
                    <p className="text-gray-700 text-sm">
                      For immediate assistance during business hours
                    </p>
                    <a
                      href="tel:+2541234567234"
                      className="text-pink-500 hover:underline text-sm"
                    >
                      +254 123-4567 234
                    </a>
                  </div>
                </div>
                {/* Headquarters */}
                <div className="flex items-start gap-3">
                  <span className="mt-1">
                    {/* Location Icon */}
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21c-4.418 0-8-4.03-8-9a8 8 0 1 1 16 0c0 4.97-3.582 9-8 9z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-0.5">
                      Headquarters
                    </h3>
                    <p className="text-gray-700 text-sm">
                      123 Health Avenue
                      <br />
                      Suite 456
                      <br />
                      Kenya, KE 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Need Medical Advice?</h2>
              <p className="text-gray-700 text-base mb-2">
                While our support team can help with platform and service
                questions, for medical advice we recommend:
              </p>
              <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                <li>Using our AI chat for general information</li>
                <li>Booking a virtual consultation with a provider</li>
                <li>For emergencies, contact local emergency services</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
