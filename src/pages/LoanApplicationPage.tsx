import { useLocation } from 'react-router-dom';
import LoanApplicationForm from '@/components/LoanApplicationForm';

const LoanApplicationPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const loanType = searchParams.get('loanType') || '';

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <LoanApplicationForm 
        selectedLoanType={loanType}
        onClose={() => window.history.back()}
      />
    </div>
  );
};

export default LoanApplicationPage;