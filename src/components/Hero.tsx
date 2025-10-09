import { Button } from "@/components/ui/button";

import { HashLink as Link } from 'react-router-hash-link';
import { useState, useEffect } from "react";
import BusinessImage from "@/assets/hero2.png";
import CommunityImage from "@/assets/hero1.png";
import { Rocket, ArrowRight, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [activeHero, setActiveHero] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Financial Freedom";
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98 }
  };

  const heroSections = [
    {
      id: 0,
      content: (
        <div className="container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="max-w-3xl space-y-6 relative z-20">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Achieve{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-500">
                {displayText}
                {!isTypingComplete && <span className="animate-pulse">|</span>}
              </span>{" "}
              With Us
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 md:text-xl max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Join Billways Sacco today and take control of your financial
              future with our innovative savings and loan solutions.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/membership">
                <Button className="px-8 py-5 text-lg bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 text-white font-bold shadow-lg transition-all duration-300">
                  Get Started
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/faq">
                <Button variant="outline" className="px-8 py-5 text-lg border-2 border-gray-300 hover:border-primary hover:bg-primary/10 text-gray-800 font-medium">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      ),
      bg: "bg-gradient-to-br from-slate-50 via-white to-green-50"
    },
    {
      id: 1,
      content: (
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="lg:w-1/2 space-y-6">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Grow Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                  Business
                </span>
              </motion.h1>
              <motion.p
                className="text-lg text-gray-600 md:text-xl"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Get affordable business loans with flexible repayment terms to
                take your enterprise to the next level.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                  <Link to="/business-loan">
                    <Button className="px-8 py-5 text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold shadow-lg">
                      <Rocket className="h-5 w-5 mr-2" />
                      Business Loans
                    </Button>
                  </Link>
                </motion.div>
                <Link to="/#services">
                  <Button variant="outline" className="px-8 py-5 text-lg border-2 border-gray-300 hover:border-yellow-500 hover:bg-yellow-500/10 text-gray-800 font-medium">
                    View Products
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Desktop image */}
            <motion.div
              className="hidden lg:block lg:w-1/2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <img
                src={BusinessImage}
                alt="Business growth"
                className="w-full max-h-[400px] object-cover rounded-xl shadow-xl border border-gray-200"
              />
            </motion.div>
          </div>
        </div>
      ),
      bg: "lg:bg-none bg-cover bg-center",
      mobileBg: `bg-[url('@/assets/hero.png')]`
    },
    {
      id: 2,
      content: (
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Desktop image */}
            <motion.div
              className="hidden lg:block lg:w-1/2 order-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <img
                src={CommunityImage}
                alt="Community growth"
                className="w-full max-h-[400px] object-cover rounded-xl shadow-xl border border-gray-200"
              />
            </motion.div>

            <div className="lg:w-1/2 order-1 space-y-6">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Join Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
                  Community
                </span>
              </motion.h1>
              <motion.p
                className="text-lg text-gray-600 md:text-xl"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Become part of a thriving community of savers and investors
                helping each other achieve financial success.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                  <Link to="/membership">
                    <Button className="px-8 py-5 text-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold shadow-lg">
                      <UserPlus className="h-5 w-5 mr-2" />
                      Register Now
                    </Button>
                  </Link>
                </motion.div>
                <Link to="/blog">
                  <Button variant="outline" className="px-8 py-5 text-lg border-2 border-gray-300 hover:border-green-500 hover:bg-green-500/10 text-gray-800 font-medium">
                    Member Benefits
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      ),
      bg: "lg:bg-none bg-cover bg-center",
      mobileBg: `bg-[url('@/assets/hero1.png')]`
    }
  ];

  return (
    <section className={`relative overflow-hidden h-[32rem] md:h-[40rem] lg:h-[45rem]`}>
      {/* Mobile image background */}
      <div className="lg:hidden absolute inset-0 z-0">
        <div
          className={`w-full h-full bg-cover bg-center ${heroSections[activeHero].mobileBg}`}
          style={{ backgroundImage: `url(${[BusinessImage, CommunityImage][activeHero - 1] || ""})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/70 to-transparent"></div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setActiveHero(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeHero === index ? 'w-6 bg-gradient-to-r from-primary to-green-500' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Curved Bottom SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg
          className="relative block w-[calc(150%+1.3px)] h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 80"
        >
          <path
            d="M0,0V80H1200V0C1075,40,925,80,750,80S425,40,300,40,125,80,0,40Z"
            className="fill-current text-green-500"
          ></path>
        </svg>
      </div>

      {/* Hero section content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeHero}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className={`absolute inset-0 ${heroSections[activeHero].bg}`}
        >
          {heroSections[activeHero].content}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Hero;
