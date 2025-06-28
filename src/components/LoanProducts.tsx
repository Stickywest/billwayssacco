import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Info, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HashLink as Link } from 'react-router-hash-link';

type LoanProduct = {
  id: string;
  name: string;
  interestRate: string;
  term: string;
  minAmount: string;
  maxAmount: string;
  multiplier: string;
  repayment: string;
  features: string[];
  fees: string;
  guarantors: boolean;
};

const loanProducts: LoanProduct[] = [
  {
    id: "normal-loans",
    name: "Normal Loans",
    interestRate: "1%",
    term: "48",
    minAmount: "5,000",
    maxAmount: "5,000,000",
    multiplier: "x3",
    repayment: "Monthly",
    features: [
      "General-purpose loan Triple Your Savings, Triple Your Possibilities",
      "3-member guarantor support",
      "Automatic top-up option without full clearance",
      "Credit history builds access to premium loans"
    ],
    fees: "2% processing fee",
    guarantors: true
  },
  {
    id: "emergency-loans",
    name: "Emergency Loans",
    interestRate: "2.50%",
    term: "6",
    minAmount: "5,000",
    maxAmount: "100,000",
    multiplier: "70% of savings",
    repayment: "Monthly",
    features: [
      "When life throws a storm, we bring the umbrella",
      "Mobile application and instant payout",
      "Repayment up to 3 months",
      "Priority processing in under 6 hours"
    ],
    fees: "2% processing fee",
    guarantors: false
  },
  {
    id: "education-loans",
    name: "Education Loans",
    interestRate: "1.20%",
    term: "12",
    minAmount: "10,000",
    maxAmount: "150,000",
    multiplier: "x3",
    repayment: "Monthly",
    features: [
      "Invest in Their Future, Not in Stress",
      "Requires school invoice/fee structure",
      "Flexible top-ups mid-term for boarding/transport",
      "Includes option for semester-based drawdowns"
    ],
    fees: "2% processing fee",
    guarantors: true
  },
  {
    id: "chama-loans",
    name: "Group/Chama Loan",
    interestRate: "1.50%",
    term: "12",
    minAmount: "30,000",
    maxAmount: "5,000,000",
    multiplier: "x4",
    repayment: "Weekly",
    features: [
      "Fueling Your Collective Dreams",
      "Group members as guarantors",
      "4X group savings limit",
      "Must hold 50 shares + 5 monthly share top-up",
      "Digital tracking dashboard per group"
    ],
    fees: "2% processing fee",
    guarantors: true
  },
  {
    id: "development-loans",
    name: "Development Loans",
    interestRate: "1.25%",
    term: "60",
    minAmount: "200,000",
    maxAmount: "5,000,000",
    multiplier: "x4",
    repayment: "Monthly",
    features: [
      "Build Your Future, Brick by Brick",
      "Buy that land. Start that project.",
      "Secured by logbook, title deed, or 3 guarantors",
      "90-day grace period on large investments"
    ],
    fees: "2% processing fee",
    guarantors: true
  },
  {
    id: "asset-finance",
    name: "Asset Finance",
    interestRate: "1.25% - 2.95%",
    term: "48",
    minAmount: "100,000",
    maxAmount: "3,000,000",
    multiplier: "x3",
    repayment: "Monthly",
    features: [
      "Turn Assets into Opportunities",
      "One has to be a member for 6 months to qualify",
      "Interest is 1.25% p/m for members, 2.95% for non-members",
      "Can use logbook to secure loans",
      "Assets include: car, truck, motorcycle, tractor, etc."
    ],
    fees: "2% processing fee",
    guarantors: true
  },
  {
    id: "salary-advance",
    name: "Salary Advance",
    interestRate: "4.00%",
    term: "6",
    minAmount: "10,000",
    maxAmount: "150,000",
    multiplier: "x3",
    repayment: "Monthly",
    features: [
      "End Month? Get Ahead Before the rest",
      "Up to 60% of net salary",
      "Payroll deduction or mobile payback",
      "Zero processing fees for returning applicants"
    ],
    fees: "2% processing fee",
    guarantors: true
  },
  {
    id: "health-loan",
    name: "Health Loan",
    interestRate: "2.00%",
    term: "6",
    minAmount: "30,000",
    maxAmount: "70,000",
    multiplier: "x4",
    repayment: "Monthly",
    features: [
      "Hospital admission proof required",
      "Priority emergency disbursement window",
      "Can be paid in 6 months",
      "NHIF supplement/cover advisory offered"
    ],
    fees: "2% processing fee",
    guarantors: true
  }
];

const LoanProducts = ({ selectedProduct }: { selectedProduct?: string | null }) => {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      setExpandedProduct(selectedProduct);
      // Scroll to the product after a slight delay to allow render
      setTimeout(() => {
        const element = document.getElementById(selectedProduct);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [selectedProduct]);

  const toggleExpand = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Our Loan Products
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loanProducts.map((product) => (
          <Card 
            key={product.id}
            id={product.id}
            className={`hover:shadow-lg transition-shadow ${expandedProduct === product.id ? 'ring-2 ring-primary' : ''}`}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{product.name}</span>
                <button 
                  onClick={() => toggleExpand(product.id)}
                  className="text-primary hover:text-primary/80"
                  aria-label={`Toggle ${product.name} details`}
                >
                  {expandedProduct === product.id ? <ChevronUp /> : <ChevronDown />}
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-medium">{product.interestRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Term:</span>
                  <span className="font-medium">{product.term} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Range:</span>
                  <span className="font-medium">Ksh {product.minAmount} - {product.maxAmount}</span>
                </div>
              </div>

              {expandedProduct === product.id && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold mb-2 flex items-center gap-1">
                    <Info size={16} /> Key Features
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-primary rounded-full mt-1.5 mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Multiplier:</span>
                      <span className="font-medium ml-1">{product.multiplier}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Repayment:</span>
                      <span className="font-medium ml-1">{product.repayment}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Fees:</span>
                      <span className="font-medium ml-1">{product.fees}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Guarantors:</span>
                      <span className="font-medium ml-1">
                        {product.guarantors ? "Required" : "Not Required"}
                      </span>
                    </div>
                  </div>

                  {/* Added Apply button inside each expanded product */}
                  <div className="mt-6 text-center">
                    <Link to={`/apply?product=${product.id}`} className="inline-block w-full">
                      <Button className="bg-primary hover:bg-primary/90 w-full py-2 rounded-md">
                        Apply for {product.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/apply" className="inline-block">
          <Button className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-full">
            Apply for a Loan Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoanProducts;