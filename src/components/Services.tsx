import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PiggyBank, 
  Coins, 
  Users, 
  Calculator, 
  BookOpen, 
  Wallet, 
  Briefcase, 
  Heart,
  ArrowLeft,
  Target
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import LoanProducts from './LoanProducts';

const Services = () => {
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);
  const [showLoanDetails, setShowLoanDetails] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const savingsProducts = [
    {
      title: "Fixed Deposits",
      description: "Secure your future with high-interest fixed deposit accounts, insured and flexible.",
      details: "Earn competitive above-market rates. Terms of 3, 6, or 12 months available.",
      icon: <PiggyBank className="w-10 h-10 text-primary" />
    },
    {
      title: "Junior Account",
      description: "Save for your child's future while teaching financial literacy.",
      details: "Earn interest and receive free financial literacy content for kids.",
      icon: <BookOpen className="w-10 h-10 text-primary" />
    },
    {
      title: "Share Capital Account",
      description: "Own part of Billways SACCO with voting rights and dividends.",
      details: "Minimum KES 5,000 required. Earn annual dividends and participate in AGMs.",
      icon: <Coins className="w-10 h-10 text-primary" />
    },
    {
      title: "Chama Accounts",
      description: "Support group savings and investments with transparent tools.",
      details: "Multiple signatories supported. Ideal for investment groups and families.",
      icon: <Users className="w-10 h-10 text-primary" />
    },
    {
      title: "Benevolent Fund",
      description: "Contribute to a support system for members during loss.",
      details: "Provides dignified support to members' families during times of bereavement.",
      icon: <Heart className="w-10 h-10 text-primary" />
    },
    {
      title: "52-Week Challenge",
      description: "Grow your savings weekly with structured and rewarding targets.",
      details: "Start small and grow weekly deposits with end-of-year rewards.",
      icon: <Calculator className="w-10 h-10 text-primary" />
    },
    {
      title: "Goal Tiered Savings",
      description: "Save with tiered interest based on goal timelines (3, 6, 12 months).",
      details: "Tier 1: 4%, Tier 2: 6%, Tier 3: 8%. Save for weddings, school, business.",
      icon: <Target className="w-10 h-10 text-primary" />
    },
  ];

  const loanProducts = [
    {
      id: "normal-loans",
      title: "Normal Loans",
      description: "Funds for personal use with flexible terms.",
      icon: <Wallet className="w-10 h-10 text-primary" />
    },
    {
      id: "emergency-loans",
      title: "Emergency Loans",
      description: "Quick access during emergencies.",
      icon: <Calculator className="w-10 h-10 text-primary" />
    },
    {
      id: "education-loans",
      title: "Education Loans",
      description: "Finance your studies with low-interest education loans.",
      icon: <BookOpen className="w-10 h-10 text-primary" />
    },
    {
      id: "chama-loans",
      title: "Group/Chama Loan",
      description: "Power your group's financial goals with shared loans.",
      icon: <Users className="w-10 h-10 text-primary" />
    },
    {
      id: "development-loans",
      title: "Development Loans",
      description: "For infrastructure and personal development goals.",
      icon: <Briefcase className="w-10 h-10 text-primary" />
    },
    {
      id: "asset-finance",
      title: "Asset Finance",
      description: "Acquire assets for growth with friendly terms.",
      icon: <Wallet className="w-10 h-10 text-primary" />
    },
    {
      id: "salary-advance",
      title: "Salary Advance",
      description: "Bridge gaps between paydays with ease.",
      icon: <Calculator className="w-10 h-10 text-primary" />
    },
    {
      id: "health-loan",
      title: "Health Loan",
      description: "Special loans for medical expenses.",
      icon: <Heart className="w-10 h-10 text-primary" />
    }
  ];

  const handleViewMore = (loanId: string) => {
    setSelectedLoan(loanId);
    setShowLoanDetails(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToServices = () => {
    setShowLoanDetails(false);
    setSelectedLoan(null);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        {showLoanDetails ? (
          <div className="animate-fade-in">
            <Button 
              variant="ghost" 
              onClick={handleBackToServices}
              className="mb-6 flex items-center gap-2 text-primary hover:bg-primary/10"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Services
            </Button>
            <LoanProducts selectedProduct={selectedLoan} />
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-jakarta mb-4">
                Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Financial Services</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We offer a comprehensive range of financial products tailored to meet your unique needs and goals.
              </p>
            </div>

            <Tabs defaultValue="savings" className="w-full max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="savings" className="text-lg py-3 font-medium">Savings Products</TabsTrigger>
                <TabsTrigger value="loans" className="text-lg py-3 font-medium">Loan Products</TabsTrigger>
              </TabsList>
              
              <TabsContent value="savings">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {savingsProducts.map((product, index) => (
                    <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="mb-4">{product.icon}</div>
                        <CardTitle className="text-xl font-bold font-jakarta">{product.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{product.description}</p>
                        {expandedIndex === index && (
                          <p className="mt-2 text-sm text-gray-500">{product.details}</p>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="link" 
                          className="p-0 text-primary hover:text-primary/80"
                          onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        >
                          {expandedIndex === index ? "Hide details ←" : "View details →"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="loans">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {loanProducts.map((product, index) => (
                    <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="mb-4">{product.icon}</div>
                        <CardTitle className="text-xl font-bold font-jakarta">{product.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{product.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="link" 
                          className="p-0 text-primary hover:text-primary/80"
                          onClick={() => handleViewMore(product.id)}
                        >
                          View Details →
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-16 text-center">
              <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                Explore All Services
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Services;
