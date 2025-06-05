
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Financial Freedom";
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [progressValues, setProgressValues] = useState([0, 0, 0]);

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
    // Start animating progress bars after typing is complete
    if (isTypingComplete) {
      const animateProgress = () => {
        const targetValues = [75, 50, 33]; // Target percentages for each bar
        const duration = 2000; // 2 seconds
        const steps = 60; // 60 frames for smooth animation
        const stepDuration = duration / steps;
        
        let currentStep = 0;
        const progressInterval = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          
          setProgressValues(targetValues.map(target => 
            Math.min(target, Math.floor(target * progress))
          ));
          
          if (currentStep >= steps) {
            clearInterval(progressInterval);
          }
        }, stepDuration);
      };
      
      // Small delay before starting progress animation
      setTimeout(animateProgress, 500);
    }
  }, [isTypingComplete]);

  return (
    <section className="py-20 bg-gradient-to-br from-white via-slate-50 to-green-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 mb-10 md:mb-0 slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-jakarta leading-tight">
              Building <span className="gradient-text">
                {displayText}
                {!isTypingComplete && <span className="animate-pulse">|</span>}
              </span> Together
            </h1>
            <p className="text-lg text-gray-600 md:pr-10">
              Billways Sacco provides innovative financial solutions to help our members achieve their dreams through savings and affordable loans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/membership">
                <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 rounded-lg hover-lift">
                  Become a Member
                </Button>
              </Link>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 font-medium px-8 py-6 rounded-lg hover-lift">
                Learn More
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-8 stagger-animation">
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 p-2 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" className="text-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-gray-700">Trusted by 10,000+ members</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 p-2 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" className="text-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-gray-700">Regulated financial institution</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative bounce-in">
            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover-glow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Your Savings Growth</h3>
                  <p className="text-sm text-gray-500">Last 12 months</p>
                </div>
                <div className="bg-green-100 text-primary text-sm px-3 py-1 rounded-full">
                  +12.4%
                </div>
              </div>
              
              <div className="space-y-4 stagger-animation">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">December</span>
                    <span className="font-medium text-gray-800">KES 124,500</span>
                  </div>
                  <Progress value={progressValues[0]} className="h-3" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">September</span>
                    <span className="font-medium text-gray-800">KES 82,300</span>
                  </div>
                  <Progress value={progressValues[1]} className="h-3" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">June</span>
                    <span className="font-medium text-gray-800">KES 52,700</span>
                  </div>
                  <Progress value={progressValues[2]} className="h-3" />
                </div>
              </div>
              
              <div className="mt-6 flex justify-between text-sm text-gray-500">
                <span>Jan</span>
                <span>Apr</span>
                <span>Jul</span>
                <span>Oct</span>
                <span>Dec</span>
              </div>
            </div>
            
            <div className="absolute top-1/2 -right-6 transform translate-x-1/4 -translate-y-1/2 w-32 h-32 bg-secondary/30 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/3 -left-6 transform -translate-x-1/4 translate-y-1/2 w-32 h-32 bg-primary/30 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
