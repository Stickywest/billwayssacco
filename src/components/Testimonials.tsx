
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jane Muthoni",
      role: "Small Business Owner",
      image: "",
      content: "Billways Sacco provided the capital I needed to expand my business when traditional banks wouldn't. Their business loan changed everything for me - faster approval, better rates, and helpful financial advice.",
      rating: 5
    },
    {
      name: "David Kariuki",
      role: "Teacher",
      image: "",
      content: "I joined Billways Sacco 5 years ago, and their school fees loan program has consistently helped my children stay in quality schools. The staff treats me like family, not just another customer.",
      rating: 5
    },
    {
      name: "Sarah Omondi",
      role: "IT Professional",
      image: "",
      content: "The home loan process at Billways was the smoothest financial transaction I've ever experienced. Thanks to their competitive rates and flexible terms, I'm now a proud homeowner.",
      rating: 5
    },
    {
      name: "Peter Wanjiku",
      role: "Medical Professional",
      image: "",
      content: "What stands out about Billways is their educational approach. Through their financial literacy programs, I've learned to manage money better, invest wisely, and secure my future.",
      rating: 4
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-jakarta mb-4">What Our <span className="gradient-text">Members Say</span></h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our valued members have to say about their experience with Billways Sacco.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
              {[...Array(5 - testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-gray-300" />
              ))}
            </div>
            
            <p className="text-gray-700 text-lg mb-8 italic">
              "{testimonials[currentIndex].content}"
            </p>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary font-bold text-lg">
                  {testimonials[currentIndex].name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-600 text-sm">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden md:block absolute top-10 -left-10 -z-10 w-20 h-20 bg-primary/10 rounded-full"></div>
          <div className="hidden md:block absolute bottom-20 -right-14 -z-10 w-28 h-28 bg-secondary/10 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
