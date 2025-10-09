import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const JoinCTA = () => {
  const benefits = [
    "Lower fees than traditional banks",
    "Higher returns on your savings",
    "Affordable loans with flexible terms",
    "Member-focused financial education",
    "Digital banking for convenience",
    "Community investment initiatives"
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interested: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappNumber = "+254700032800";
    const message = `New Membership Interest Form Submission:
    
First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Interested In: ${formData.interested || 'Not specified'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="join" className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-jakarta mb-6">
              Ready to Take Control of Your <span className="gradient-text">Financial Future?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of members who are already benefiting from our innovative financial solutions and supportive community.
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 font-jakarta">Membership Benefits:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <Link to="/membership">
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 rounded-lg">
                  Become a Member Today
                </Button>
              </Link>
              <p className="text-sm text-gray-500">
                Already a member? <Link to="/login" className="text-primary hover:underline">Login to your account</Link>
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 font-jakarta">Quick Interest Form</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label htmlFor="interested" className="block text-sm font-medium text-gray-700 mb-1">
                  I'm interested in
                </label>
                <select
                  id="interested"
                  value={formData.interested}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                >
                  <option value="">Select an option</option>
                  <option value="Savings Account">Savings Account</option>
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Home Loan">Home Loan</option>
                  <option value="Business Financing">Business Financing</option>
                  <option value="Other Services">Other Services</option>
                </select>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg"
              >
                Submit via WhatsApp
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCTA;