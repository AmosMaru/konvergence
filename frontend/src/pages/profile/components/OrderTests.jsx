import React from "react";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const OrderTests = () => {
  const testKits = [
    {
      id: 1,
      name: "Complete Women's Health Panel",
      price: 400,
      description:
        "A comprehensive panel that tests for multiple hormones, vitamins, and mineral levels to provide a complete picture of your health.",
      features: [
        "Tests 15+ hormones including estrogen, progesterone, and testosterone",
        "Evaluates vitamin D, B12, iron levels",
      ],
      additionalBenefits: "+1 more Benefit",
    },
    {
      id: 2,
      name: "Hormone Balance Test",
      price: 500,
      description:
        "Evaluate your key reproductive hormones to better understand PCOS, irregular periods, fertility, or perimenopause symptoms.",
      features: [
        "Tests estrogen, progesterone, testosterone, and DHEA levels",
        "Measures cortisol for stress assessment",
      ],
      additionalBenefits: "+2 more Benefit",
    },
    {
      id: 3,
      name: "Fertility Readiness Test",
      price: 2200,
      description:
        "Assess your fertility potential with this comprehensive test that measures key markers related to egg quality and ovarian reserve.",
      features: [
        "AMH testing for ovarian reserve assessment",
        "FSH, LH, and antral levels",
      ],
      additionalBenefits: "+1 more Benefit",
    },
    {
      id: 4,
      name: "PCOS Assessment Kit",
      price: 400,
      description:
        "This specialized test evaluates key markers associated with Polycystic Ovary Syndrome to help with diagnosis or management.",
      features: [
        "Testosterone and androgen level testing",
        "Insulin and glucose evaluation",
      ],
      additionalBenefits: "+1 more Benefit",
    },
    {
      id: 5,
      name: "STI Comprehensive Panel",
      price: 400,
      description:
        "Tests for common sexually transmitted infections including chlamydia, gonorrhea, and more.",
      features: [
        "Tests 15+ hormones including estrogen, progesterone, and testosterone",
        "Evaluates vitamin D, B12, iron levels",
      ],
      additionalBenefits: "+1 more Benefit",
    },
    {
      id: 6,
      name: "Menopause Transition Kit",
      price: 400,
      description:
        "Evaluates hormone changes associated with perimenopause and menopause.",
      features: [
        "Tests 15+ hormones including estrogen, progesterone, and testosterone",
        "Evaluates vitamin D, B12, iron levels",
      ],
      additionalBenefits: "+1 more Benefit",
    },
  ];

  return (
    <div className="max-w-[1500px] mx-auto p-6">
      <div className="mb-8">
        <Link
          to="/profile"
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900 mt-4">
          At home test Kit
        </h1>
        <p className="text-gray-600 mt-2">
          Convenient, accurate testing from the privacy of your home. All kits
          include detailed instructions, free shipping, and lab analysis with
          results delivered securely to your account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testKits.map((kit) => (
          <div
            key={kit.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9 bg-pink-50">
              {/* Placeholder for test kit image */}
              <div className="p-4">
                <img
                  src={`/test-kit-${kit.id}.jpg`}
                  alt={kit.name}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {kit.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{kit.description}</p>

              <div className="mt-4 space-y-2">
                {kit.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
                <p className="text-sm text-gray-500">
                  {kit.additionalBenefits}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    KES {kit.price}
                  </span>
                  <button className="ml-4 text-sm text-pink-600 hover:text-pink-700 font-medium">
                    Details
                  </button>
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-pink-600 bg-pink-50 hover:bg-pink-100">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTests;
