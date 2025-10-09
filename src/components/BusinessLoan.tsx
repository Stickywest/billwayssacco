import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Briefcase, ChartBar, Clock, ShieldCheck,
  Handshake, Calculator, BadgeCheck, X, Check, Home
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";

const primaryColor = '#4CAF50'; // Green light
const secondaryColor = '#7B1FA2'; // Purple
const accentColor = '#8BC34A'; // Light green
const textColor = '#212121';
const BusinessLoan = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(6);

  const calculateMonthlyPayment = () => {
    const interestRate = 0.12;
    const monthlyRate = interestRate / 12;
    const payment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));
    return payment.toFixed(2);
  };

  const handleWhatsAppSubmit = () => {
    const message = `Hello, I would like to apply for a Business Loan.\n\nLoan Amount: Ksh ${loanAmount.toLocaleString()}\nRepayment Period: ${loanTerm} months\nMonthly Payment: Ksh ${calculateMonthlyPayment()}`;
    const whatsappURL = `https://wa.me/254700032800?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const features = [
    { icon: Briefcase, title: "Business Growth", description: "Fund expansion, inventory, or equipment" },
    { icon: Clock, title: "Quick Approval", description: "Decisions within 48 hours" },
    { icon: ChartBar, title: "Flexible Terms", description: "3-24 month repayment options" },
    { icon: ShieldCheck, title: "No Hidden Fees", description: "Clear terms, no surprises" },
  ];

  const requirements = [
    "Active business for 6+ months",
    "Monthly revenue of Ksh 20,000+",
    "Valid business license",
    "Bank statements for last 3 months",
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute top-6 left-6 z-20">
        <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-full transition"
            aria-label="Back to Home"
        >
            <img src={logo} alt="Logo" className="h-10 w-10" />
        </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side */}
            <div className="p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-[${accentColor}]/10 to-white">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[${primaryColor}] text-white mr-4">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold text-[${textColor}]">Business Loan</h2>
              </div>

              <p className="text-lg text-gray-700 mb-8">
                Fuel your business growth with our flexible financing solutions. Whether you need capital for expansion, inventory, or equipment, we've got you covered.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10"> {/* Changed from grid-cols-1 sm:grid-cols-2 to grid-cols-2 */}
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <feature.icon className={`h-6 w-6 mb-2`} style={{ color: secondaryColor }} />
                    <h3 className="font-bold text-base mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-xl mb-4">Requirements:</h3>
                <ul className="space-y-2">
                  {requirements.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[${primaryColor}] mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center">
                <Handshake className="h-5 w-5 text-[${secondaryColor}] mr-2" />
                <span className="text-sm text-gray-600">Competitive rates starting at 12% APR</span>
              </div>
            </div>

            {/* Right Side - Calculator */}
            <div className="p-8 sm:p-10 lg:p-12">
              <h3 className="text-2xl font-bold text-[${textColor}] mb-6">Loan Calculator</h3>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (Ksh)
                </label>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center mt-3">
                  <span className="text-3xl font-bold text-[${textColor}]">
                    {loanAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repayment Period (Months)
                </label>
                <input
                  type="range"
                  min="3"
                  max="24"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center mt-3">
                  <span className="text-3xl font-bold text-[${textColor}]">
                    {loanTerm}
                  </span>
                  <span className="text-gray-600"> months</span>
                </div>
              </div>

              <div className="bg-[${accentColor}]/10 rounded-lg p-5 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Monthly Payment:</span>
                  <span className="text-2xl font-bold text-[${primaryColor}]">
                    Ksh {calculateMonthlyPayment()}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Total repayment: Ksh {(Number(calculateMonthlyPayment()) * loanTerm).toFixed(2)}
                </div>
              </div>

              <Button
                className="w-full py-4 bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] hover:opacity-90 text-white text-lg"
                onClick={handleWhatsAppSubmit}
              >
                Apply Now on WhatsApp
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BusinessLoan;