import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Rocket, Handshake, PiggyBank, Users,
  Smartphone, Phone, MapPin, Award, Shield, TrendingUp, Mail
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import Footer from "@/components/Footer";
import SocialMediaIcons from "@/components/SocialMediaIcons";

const colors = {
  primary: "#54606E",
  accent1: "#9BD138",
  accent2: "#8DC63F",
  lightBg: "#F9FFF4"
};

const TestimonialCard = ({ name, role, story, avatarBg }) => (
  <motion.div 
    className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-start gap-4">
      <div className={`flex items-center justify-center h-12 w-12 rounded-full ${avatarBg} text-white`}>
        <Users className="h-6 w-6" />
      </div>
      <div>
        <h4 className="font-bold text-lg text-[#54606E]">{name}</h4>
        <p className="text-sm text-gray-600 mb-3">{role}</p>
        <p className="text-gray-700">"{story}"</p>
      </div>
    </div>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <motion.div 
    className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2 }}
  >
    <div className={`flex items-center justify-center h-12 w-12 rounded-full ${color} text-white mb-4`}>
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="font-bold text-xl mb-2 text-[#54606E]">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const BillwaysBlog = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9FFF4]">
        <SocialMediaIcons />

      {/* Hero Section */}
    <div className="relative bg-gradient-to-r from-[#9BD138] to-[#8DC63F] text-white overflow-hidden">
      <div className="absolute top-6 left-6 z-20">
        <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-full transition"
        aria-label="Back to Home"
        >
        <ArrowRight className="h-5 w-5 rotate-180" />
        <span className="font-medium">Home</span>
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 relative z-10">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
        >
        <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
          <Rocket className="h-4 w-4 mr-2" />
          Financial Empowerment
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          From Hustle to Stability
        </h1>
        <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
          How Billways SACCO is Powering Dreams Through Smart Saving and Affordable Loans
        </p>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
    </div>

      {/* Introduction */}
      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div 
          className="prose prose-lg text-[#54606E] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p>
            In the heart of Kenya, where dreams are bold and ambition runs deep, Billways SACCO Limited stands as a beacon of financial empowerment — a community-driven solution built for the hustler, the mama mboga, the boda rider, the chama investor, small scale traders, young professionals and the youth with fire in their eyes.
          </p>
        </motion.div>
      </div>

      {/* Why We Exist */}
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div className="inline-flex items-center px-4 py-2 bg-[#F0F9E8] text-[#54606E] rounded-full text-sm font-medium mb-4">
              <Handshake className="h-4 w-4 mr-2" />
              Our Purpose
            </div>
            <h2 className="text-3xl font-bold text-[#54606E] mb-4">Why We Exist</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At Billways SACCO, we saw the gap: banks were cold, inaccessible, and out of reach for everyday Kenyans.
            </p>
          </motion.div>

          <motion.div 
            className="bg-[#F0F9E8] rounded-2xl p-8 md:p-10 border border-green-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-xl text-center font-medium text-[#54606E]">
              "The need was urgent — for affordable loans, for safe saving options, and most importantly, for a partner who believes in the people. That's where we come in."
            </p>
          </motion.div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="py-16 bg-[#F9FFF4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#54606E] mb-4">What Makes Us Different?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another financial institution - we're your growth partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={TrendingUp}
              title="Fast & Flexible Loans"
              description="Tailored loans with fair interest and flexible repayment options"
              color="bg-[#9BD138]"
            />
            <FeatureCard 
              icon={PiggyBank}
              title="Smart Savings Plans"
              description="Purpose-built savings accounts for all your financial goals"
              color="bg-[#8DC63F]"
            />
            <FeatureCard 
              icon={Users}
              title="Chama & Group Support"
              description="Community-focused loan and savings models to grow together"
              color="bg-[#9BD138]"
            />
            <FeatureCard 
              icon={Smartphone}
              title="Digital Convenience"
              description="Mobile app coming soon to manage everything from your phone"
              color="bg-[#8DC63F]"
            />
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#F0F9E8] text-[#54606E] rounded-full text-sm font-medium mb-4">
              <Award className="h-4 w-4 mr-2" />
              Real Impact
            </div>
            <h2 className="text-3xl font-bold text-[#54606E] mb-4">Real People, Real Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These are not just stories. They are proof that financial inclusion works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard 
              name="Grace Wanjiku"
              role="Mama Mboga, Nakuru"
              story="I used a Billways Business Loan to expand my vegetable stall. Today, I employ one assistant and support my three children through school."
              avatarBg="bg-[#9BD138]"
            />
            <TestimonialCard 
              name="Joseph Omondi"
              role="Boda Boda Rider"
              story="I took a Boda Boda Loan and now own my motorbike free of debt. Billways gave me the boost I needed to be my own boss."
              avatarBg="bg-[#8DC63F]"
            />
          </div>
        </div>
      </div>

      {/* Promise */}
      <div className="py-16 bg-gradient-to-r from-[#9BD138] to-[#8DC63F] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Our Promise to You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <h3 className="font-bold text-xl mb-3">We're not just giving loans.</h3>
              <p>We're unlocking futures.</p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <h3 className="font-bold text-xl mb-3">We're not just collecting savings.</h3>
              <p>We're fueling visions.</p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <h3 className="font-bold text-xl mb-3">We're not just another SACCO.</h3>
              <p>We're your financial home.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#54606E] mb-6">Join the Billways Movement</h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you're just starting or looking to level up your finances, Billways SACCO is the place to grow. It's time to stop surviving and start thriving.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="px-8 py-4 bg-[#9BD138] hover:bg-[#8DC63F] text-white shadow-lg"
              onClick={() => navigate('/membership')}
            >
              Become a Member
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              className="px-8 py-4 border-[#9BD138] text-[#54606E] hover:bg-[#F0F9E8]"
              onClick={() => navigate('/loans')}
            >
              Explore Loan Options
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BillwaysBlog;
