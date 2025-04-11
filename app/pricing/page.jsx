"use client";

import { useState } from "react";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showEnterpriseForm, setShowEnterpriseForm] = useState(false);

  // FAQ data
  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply at the start of your next billing cycle.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "All paid plans come with a 14-day free trial. No credit card required to start. You can explore all features and decide which plan works best for your needs.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards including Visa, Mastercard, and American Express. Enterprise customers can also pay via invoice.",
    },
    {
      question: "How secure is my data?",
      answer:
        "Your data security is our priority. We use enterprise-grade encryption, regular security audits, and comply with industry standards to ensure your data remains protected.",
    },
  ];

  return (
    <>
      <div className="bg-gray-900 min-h-screen text-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <style jsx>{`
              @keyframes gradient {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }

              .animated-gradient {
                background: linear-gradient(
                  90deg,
                  #a78bfa,
                  #ec4899,
                  #8b5cf6,
                  #d946ef,
                  #a78bfa
                );
                background-size: 300% 100%;
                animation: gradient 8s ease infinite;
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
              }
            `}</style>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl animated-gradient">
              Choose Your Plan
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
              Unlock the full potential of your data with our flexible pricing
              options
            </p>
          </div>

          {/* Billing toggle */}
          <div className="mt-12 flex justify-center">
            <div className="bg-gray-800 p-1 rounded-lg inline-flex">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === "annual"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setBillingCycle("annual")}
              >
                Annual{" "}
                <span className="text-xs text-purple-400 font-normal">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="mt-16 grid lg:grid-cols-3 gap-8">
            {/* Basic plan */}
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:translate-y-[-4px] transition-transform duration-300">
              <div className="p-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Basic</h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                    Free Forever
                  </span>
                </div>
                <p className="mt-4 text-gray-400">
                  Perfect for individuals just getting started with data
                  visualization
                </p>
                <div className="mt-6">
                  <p className="text-5xl font-extrabold text-white">$0</p>
                  <p className="text-gray-400 mt-1">No credit card required</p>
                </div>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Up to 5 visualizations</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>5 basic chart types</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>CSV import support</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Community support</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>1GB data storage</span>
                  </li>
                </ul>

                <button className="mt-8 w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  Get Started Free
                </button>
              </div>
            </div>

            {/* Pro plan */}
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform lg:scale-105 hover:translate-y-[-4px] transition-transform duration-300 border border-purple-500 relative">
              <div className="absolute top-0 inset-x-0">
                <div className="h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600"></div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900 text-purple-200">
                  Most Popular
                </span>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white">Pro</h2>
                <p className="mt-4 text-gray-400">
                  Ideal for professionals and growing teams
                </p>
                <div className="mt-6">
                  <div className="flex items-baseline">
                    <p className="text-5xl font-extrabold text-white">
                      {billingCycle === "monthly" ? "$9.99" : "$7.99"}
                    </p>
                    <span className="ml-1 text-xl text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-400 mt-1">
                    {billingCycle === "annual" &&
                      "Billed annually ($95.88/year)"}
                    {billingCycle === "monthly" && "Billed monthly"}
                  </p>
                </div>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Unlimited visualizations</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>15 advanced chart types</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Multiple data source support</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Priority email support</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>10GB data storage</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Dashboard sharing</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Automated reporting</span>
                  </li>
                </ul>

                <button className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  Start 14-day Free Trial
                </button>
              </div>
            </div>

            {/* Enterprise plan */}
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:translate-y-[-4px] transition-transform duration-300">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white">Enterprise</h2>
                <p className="mt-4 text-gray-400">
                  Custom solutions for organizations with advanced needs
                </p>
                <div className="mt-6">
                  <p className="text-5xl font-extrabold text-white">Custom</p>
                  <p className="text-gray-400 mt-1">
                    Tailored to your requirements
                  </p>
                </div>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Custom development</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>All chart types + custom visuals</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Full API access</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Dedicated support team</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Unlimited data storage</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-6 w-6 text-purple-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Advanced security features</span>
                  </li>
                </ul>

                <button
                  className="mt-8 w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  onClick={() => setShowEnterpriseForm(true)}
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>

          {/* Feature comparison */}
          <div className="mt-20 bg-gray-800 rounded-xl overflow-hidden">
            <div className="py-6 px-8 border-b border-gray-700">
              <h3 className="text-2xl font-bold">Compare Plans</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="py-6 px-8 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="py-6 px-8 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Basic
                    </th>
                    <th className="py-6 px-8 text-center text-sm font-medium text-purple-400 uppercase tracking-wider">
                      Pro
                    </th>
                    <th className="py-6 px-8 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="py-4 px-8 text-sm font-medium">
                      Visualizations
                    </td>
                    <td className="py-4 px-8 text-center">Up to 5</td>
                    <td className="py-4 px-8 text-center">Unlimited</td>
                    <td className="py-4 px-8 text-center">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-8 text-sm font-medium">
                      Chart Types
                    </td>
                    <td className="py-4 px-8 text-center">5 Basic</td>
                    <td className="py-4 px-8 text-center">15 Advanced</td>
                    <td className="py-4 px-8 text-center">All + Custom</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-8 text-sm font-medium">
                      Data Sources
                    </td>
                    <td className="py-4 px-8 text-center">CSV only</td>
                    <td className="py-4 px-8 text-center">Multiple types</td>
                    <td className="py-4 px-8 text-center">All + Custom</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-8 text-sm font-medium">
                      Data Storage
                    </td>
                    <td className="py-4 px-8 text-center">1GB</td>
                    <td className="py-4 px-8 text-center">10GB</td>
                    <td className="py-4 px-8 text-center">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-8 text-sm font-medium">
                      Dashboard Sharing
                    </td>
                    <td className="py-4 px-8 text-center">
                      <svg
                        className="h-5 w-5 text-gray-500 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </td>
                    <td className="py-4 px-8 text-center">
                      <svg
                        className="h-5 w-5 text-purple-400 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </td>
                    <td className="py-4 px-8 text-center">
                      <svg
                        className="h-5 w-5 text-purple-400 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-8 text-sm font-medium">
                      Automated Reports
                    </td>
                    <td className="py-4 px-8 text-center">
                      <svg
                        className="h-5 w-5 text-gray-500 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </td>
                    <td className="py-4 px-8 text-center">
                      <svg
                        className="h-5 w-5 text-purple-400 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </td>
                    <td className="py-4 px-8 text-center">
                      <svg
                        className="h-5 w-5 text-purple-400 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-8 text-sm font-medium">
                      API Access
                    </td>
                    <td className="py-4 px-8 text-center">
                      <svg
                        className="h-5 w-5 text-gray-500 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </td>
                    <td className="py-4 px-8 text-center">
                      <svg
                        className="h-5 w-5 text-gray-500 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </td>
                    <td className="py-4 px-8 text-center">
                      <svg
                        className="h-5 w-5 text-purple-400 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-8 text-sm font-medium">Support</td>
                    <td className="py-4 px-8 text-center">Community</td>
                    <td className="py-4 px-8 text-center">Priority Email</td>
                    <td className="py-4 px-8 text-center">Dedicated Team</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQs */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA section */}
          <div className="mt-20">
            <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl overflow-hidden shadow-xl">
              <div className="px-8 py-12 md:px-12 lg:flex lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Ready to transform your data?
                    <span className="block text-purple-300">
                      Start your free trial today.
                    </span>
                  </h2>
                  <p className="mt-3 max-w-lg text-lg text-purple-200">
                    Get started with a 14-day free trial of any paid plan. No
                    credit card required.
                  </p>
                </div>
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                  <div className="inline-flex rounded-md shadow">
                    <a
                      href="#"
                      className="bg-white text-purple-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Get started
                    </a>
                  </div>
                  <div className="ml-3 inline-flex rounded-md shadow">
                    <a
                      href="#"
                      className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Contact sales
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Our Customers Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-purple-800 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">A</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Acme Corp</h4>
                    <p className="text-sm text-gray-400">Marketing Team</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  "Vizulytics transformed how we analyze our campaign
                  performance. The visualizations are stunning and insights are
                  now accessible to everyone on the team."
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-purple-800 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">T</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">TechStart</h4>
                    <p className="text-sm text-gray-400">Data Science</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  "The Enterprise plan was exactly what we needed. The custom
                  integrations allow us to bring all our data sources together
                  for comprehensive analytics."
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-purple-800 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">G</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Global Research</h4>
                    <p className="text-sm text-gray-400">Research Department</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  "We started with the Pro plan and were impressed with the
                  flexibility. The automated reporting feature alone has saved
                  us countless hours."
                </p>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </>
  );
}
