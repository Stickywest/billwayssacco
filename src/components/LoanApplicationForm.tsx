import { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type LoanApplicationFormProps = {
  onClose: () => void;
  selectedLoanType?: string;
};

const loanProducts = [
  { id: 'normal-loans', name: 'Normal Loans' },
  { id: 'emergency-loans', name: 'Emergency Loans' },
  { id: 'education-loans', name: 'Education Loans' },
  { id: 'chama-loans', name: 'Group/Chama Loan' },
  { id: 'development-loans', name: 'Development Loans' },
  { id: 'asset-finance', name: 'Asset Finance' },
  { id: 'salary-advance', name: 'Salary Advance' },
  { id: 'health-loan', name: 'Health Loan' }
];

const LoanApplicationForm = ({ 
  onClose,
  selectedLoanType = ""
}: LoanApplicationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    amount: '',
    loanType: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set the selected loan type when the component mounts or when selectedLoanType changes
  useEffect(() => {
    if (selectedLoanType) {
      const selectedProduct = loanProducts.find(product => product.id === selectedLoanType);
      if (selectedProduct) {
        setFormData(prev => ({
          ...prev,
          loanType: selectedProduct.name
        }));
      }
    }
  }, [selectedLoanType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleLoanTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      loanType: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const whatsappNumber = '+254700032800';
    const message = `*New Loan Application Request*%0A%0A
*Name:* ${formData.name}%0A
*Phone:* ${formData.phone}%0A
*Loan Amount:* Ksh ${formData.amount}%0A
*Loan Type:* ${formData.loanType || 'Not specified'}%0A
*Additional Message:* ${formData.message || 'None'}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Open WhatsApp in a new tab
    const newWindow = window.open(whatsappUrl, '_blank');
    
    // Check if the window was opened successfully
    if (newWindow) {
      // Show success message
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          amount: '',
          loanType: selectedLoanType ? 
            loanProducts.find(p => p.id === selectedLoanType)?.name || '' 
            : '',
          message: ''
        });
        setIsSubmitted(false);
      }, 3000);
    } else {
      // Handle case where popup was blocked
      setIsSubmitting(false);
      alert('Please allow popups to submit your application');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {isSubmitted ? 'Application Submitted!' : 'Loan Application'}
        </h2>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {isSubmitted ? (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Thank you for your application!</h3>
          <p className="text-gray-600 mb-6">
            We've opened WhatsApp for you to complete the process. 
            Our team will contact you shortly.
          </p>
          <Button 
            onClick={onClose} 
            className="bg-primary hover:bg-primary/90"
          >
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="07XX XXX XXX"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Loan Amount (Ksh) *</Label>
              <Input
                id="amount"
                type="number"
                required
                value={formData.amount}
                onChange={handleChange}
                placeholder="50,000"
                min="1000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loanType">Loan Type *</Label>
              <Select 
                onValueChange={handleLoanTypeChange} 
                required
                value={formData.loanType}
              >
                <SelectTrigger>
                  <SelectValue placeholder={formData.loanType || "Select loan type"} />
                </SelectTrigger>
                <SelectContent>
                  {loanProducts.map((product) => (
                    <SelectItem key={product.id} value={product.name}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <textarea
              id="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Tell us more about your loan needs..."
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit via WhatsApp'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoanApplicationForm;