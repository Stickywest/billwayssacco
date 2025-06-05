
import { Shield, Lightbulb, Users, Check } from "lucide-react";

const AboutValues = () => {
  const coreValues = [
    {
      title: "Integrity",
      description: "We uphold the highest standards of integrity in all of our actions.",
      icon: <Shield className="w-10 h-10 text-purple" />
    },
    {
      title: "Transparency",
      description: "We believe in being transparent and honest in all our dealings.",
      icon: <Shield className="w-10 h-10 text-purple" />
    },
    {
      title: "Innovation",
      description: "We foster innovation to drive growth and create value.",
      icon: <Lightbulb className="w-10 h-10 text-purple" />
    },
    {
      title: "Accountability",
      description: "We are accountable for delivering on our commitments.",
      icon: <Check className="w-10 h-10 text-purple" />
    },
    {
      title: "Trustworthy",
      description: "We build trust by consistently delivering on our promises.",
      icon: <Shield className="w-10 h-10 text-purple" />
    },
    {
      title: "Equity",
      description: "We ensure fairness and equity in all our interactions.",
      icon: <Users className="w-10 h-10 text-purple" />
    }
  ];

  return (
    <section id="values" className="py-20 bg-gradient-to-br from-purple/5 via-white to-green-50">
      <div className="container mx-auto">
        <div className="text-center mb-16 slide-up">
          <h2 className="text-3xl md:text-4xl font-bold font-jakarta mb-4">Our <span className="text-purple">Values</span></h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are guided by a set of core values that shape our culture and drive our success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation mb-16">
          {coreValues.map((value, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover-lift hover-glow"
            >
              <div className="mb-4 animate-float">{value.icon}</div>
              <h3 className="text-xl font-bold mb-3 font-jakarta">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover-lift hover-glow bounce-in">
            <div className="h-16 w-16 bg-purple/10 rounded-full flex items-center justify-center mb-6">
              <Lightbulb className="h-8 w-8 text-purple" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-purple font-jakarta">Our Vision</h3>
            <p className="text-gray-600 text-lg">
              An epitome of financial investment with the most rewarding returns.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover-lift hover-glow bounce-in delay-100">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 gradient-text font-jakarta">Our Mission</h3>
            <p className="text-gray-600 text-lg">
              Developing financial products suited towards meeting customer needs and uplifting member's social economic welfare.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover-lift hover-glow bounce-in delay-200">
            <div className="h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-secondary font-jakarta">Our Motto</h3>
            <p className="text-gray-600 text-lg font-medium italic">
              "Together changing lives."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
