
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
  Heart 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const Services = () => {
  const savingsProducts = [
    {
      title: "Fixed Deposits",
      description: "Secure your future with our high-interest fixed deposit accounts.",
      icon: <PiggyBank className="w-10 h-10 text-primary" />
    },
    {
      title: "Junior Account",
      description: "Start saving for your child's future with our Junior Accounts.",
      icon: <BookOpen className="w-10 h-10 text-primary" />
    },
    {
      title: "Shared Capital Account",
      description: "Invest in our shared capital accounts and watch your money grow.",
      icon: <Coins className="w-10 h-10 text-primary" />
    },
    {
      title: "Chama Accounts",
      description: "Empower your group savings with our Chama Accounts.",
      icon: <Users className="w-10 h-10 text-primary" />
    },
    {
      title: "Benevolent Fund",
      description: "Support for your loved ones in times of need.",
      icon: <Heart className="w-10 h-10 text-primary" />
    }
  ];

  const loanProducts = [
    {
      title: "Normal Loans",
      description: "Get the funds you need for any personal use with our normal loan products.",
      icon: <Wallet className="w-10 h-10 text-primary" />
    },
    {
      title: "Emergency Loans",
      description: "Access quick funds in times of emergency with minimal documentation.",
      icon: <Calculator className="w-10 h-10 text-primary" />
    },
    {
      title: "Education Loans",
      description: "Invest in your future with our flexible education loan options.",
      icon: <BookOpen className="w-10 h-10 text-primary" />
    },
    {
      title: "Group/Chama Loan",
      description: "Support your group savings goals with our specialized Chama Loans.",
      icon: <Users className="w-10 h-10 text-primary" />
    },
    {
      title: "Development Loans",
      description: "Finance your development projects with our long-term loan products.",
      icon: <Coins className="w-10 h-10 text-primary" />
    },
    {
      title: "Asset Finance",
      description: "Get the financing you need to purchase assets for personal or business use.",
      icon: <Wallet className="w-10 h-10 text-primary" />
    },
    {
      title: "Salary Advance",
      description: "Bridge the gap between paydays with our convenient salary advance loans.",
      icon: <Calculator className="w-10 h-10 text-primary" />
    },
    {
      title: "Health Loan",
      description: "Offered in collaboration with trusted insurance providers.",
      icon: <Heart className="w-10 h-10 text-primary" />
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto">
        <div className="text-center mb-12 slide-up">
          <h2 className="text-3xl md:text-4xl font-bold font-jakarta mb-4">Our <span className="gradient-text">Financial Services</span></h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of financial products tailored to meet your unique needs and goals.
          </p>
        </div>

        <Tabs defaultValue="savings" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="savings" className="text-lg py-3 font-medium">Savings Products</TabsTrigger>
            <TabsTrigger value="loans" className="text-lg py-3 font-medium">Loan Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="savings" className="stagger-animation">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savingsProducts.map((product, index) => (
                <Card key={index} className="border border-gray-100 shadow-sm hover-lift hover-glow">
                  <CardHeader>
                    <div className="mb-4 animate-float">{product.icon}</div>
                    <CardTitle className="text-xl font-bold font-jakarta">{product.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{product.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="p-0 text-primary hover:text-primary/80">
                      Learn more →
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="loans" className="stagger-animation">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loanProducts.map((product, index) => (
                <Card key={index} className="border border-gray-100 shadow-sm hover-lift hover-glow">
                  <CardHeader>
                    <div className="mb-4 animate-float">{product.icon}</div>
                    <CardTitle className="text-xl font-bold font-jakarta">{product.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{product.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="p-0 text-primary hover:text-primary/80">
                      View More →
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center bounce-in">
          <Button className="bg-purple hover:bg-purple-dark text-white font-medium px-8 py-6 rounded-lg hover-lift hover-purple-glow">
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
