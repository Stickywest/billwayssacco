import { CheckCircle } from "lucide-react";
import community1 from "../assets/study-group-african-people.jpg";
import community2 from "../assets/bodariders.jpg";
import community3 from "../assets/scholar.jpg";
import community4 from "../assets/sme.jpg";

const Features = () => {
  const features = [
    {
      title: "Easy Digital Banking",
      description: "Access your accounts, make transactions, and apply for loans from anywhere through our secure mobile app.",
      icon: "💳"
    },
    {
      title: "Higher Savings Returns",
      description: "Enjoy competitive interest rates on your savings that help your money grow faster than traditional banks.",
      icon: "📈"
    },
    {
      title: "Affordable Loans",
      description: "Access quick loans with flexible repayment terms and lower interest rates compared to commercial banks.",
      icon: "🏡"
    },
    {
      title: "Financial Education",
      description: "Benefit from workshops and resources designed to improve your financial literacy and management skills.",
      icon: "📚"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16 slide-up">
          <h2 className="text-3xl md:text-4xl font-bold font-jakarta mb-4">Why Choose <span className="gradient-text">Billways Sacco</span></h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're committed to our members' financial success through innovative products, exceptional service, and community focus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover-lift hover-glow"
            >
              <div className="text-4xl mb-4 animate-float">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 font-jakarta">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-50 rounded-2xl p-8 md:p-10 bounce-in">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-jakarta">Our Community Impact</h3>
              <p className="text-gray-600 mb-6">
                For over 6 years, Billways Sacco has been more than a financial institution. We've been a pillar of community development, supporting:
              </p>
              <ul className="space-y-3 stagger-animation">
                {["Education scholarships for deserving students", 
                  "Small business growth through microfinance initiatives",
                  "Community development projects",
                  "Financial literacy programs"].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="grid grid-cols-2 gap-4 stagger-animation">
              <div className="rounded-lg overflow-hidden shadow-sm aspect-[4/3] bg-gradient-to-br from-primary/80 to-primary hover-scale">
                <img
                  src={community1}
                  alt="Community Impact 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm aspect-[4/3] bg-gradient-to-br from-secondary/80 to-secondary hover-scale">
                <img
                  src={community2}
                  alt="Community Impact 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm aspect-[4/3] bg-gradient-to-br from-accent/80 to-accent hover-scale">
                <img
                  src={community3}
                  alt="Community Impact 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm aspect-[4/3] bg-gradient-to-tr from-gray-800 to-gray-600 hover-scale">
                <img
                  src={community4}
                  alt="Community Impact 4"
                  className="w-full h-full object-cover"
                />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
