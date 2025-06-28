import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronDown, ChevronUp, Smartphone, Mail, MapPin, Users, 
    PiggyBank, HandCoins, FileText, Banknote, Percent, ShieldCheck, 
    Home, ArrowRight, BadgeCheck, ClipboardList, DollarSign, 
    CreditCard, PieChart, BookOpen, HelpCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const FAQItem = ({ question, answer, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div 
            className="border-b border-gray-200/50 pb-4 mb-4 overflow-hidden"
            initial={false}
            animate={{ 
                backgroundColor: isOpen ? 'rgba(168, 85, 247, 0.05)' : 'transparent', // purple-600
                borderLeft: isOpen ? '4px solid #a855f7' : '0px solid transparent' // purple-600
            }}
            transition={{ duration: 0.3 }}
            style={{ paddingLeft: isOpen ? '12px' : '16px' }}
        >
            <button
                className="flex justify-between items-center w-full text-left py-4 focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <div className="relative">
                        <div className={`absolute -left-1 -top-1 w-8 h-8 rounded-full opacity-10 ${isOpen ? 'bg-purple-900' : 'bg-gray-400'} group-hover:bg-purple-600 group-hover:opacity-20 transition-all`}></div>
                        <Icon className={`h-5 w-5 mr-4 ${isOpen ? 'text-purple-900' : 'text-gray-600'} group-hover:text-purple-900 transition-colors`} />
                    </div>
                    <h3 className={`text-lg font-medium ${isOpen ? 'text-purple-900' : 'text-gray-800'} group-hover:text-purple-900 transition-colors`}>{question}</h3>
                </div>
                {isOpen ? (
                    <ChevronUp className={`h-5 w-5 ${isOpen ? 'text-purple-900' : 'text-gray-500'} group-hover:text-purple-600 transition-colors`} />
                ) : (
                    <ChevronDown className={`h-5 w-5 ${isOpen ? 'text-purple-900' : 'text-gray-500'} group-hover:text-purple-600 transition-colors`} />
                )}
            </button>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="pl-9"
                    >
                        <motion.div 
                            className="prose prose-sm text-gray-600 pt-2 pb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {answer}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const BillwaysFAQ = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');

    const faqs = [
        {
            question: "What is Billways Sacco Limited?",
            answer: "Billways Sacco is a savings and credit cooperative society in Kenya that provides a range of financial solutions, including savings accounts, low-interest loans, and financial literacy programs, to empower its members and support their economic growth.",
            icon: HelpCircle,
            category: "general"
        },
        {
            question: "Where is Billways Sacco Limited located?",
            answer: "Billways Sacco has its physical office located at LANGALANGA MARKET, Room 85, Nakuru, Kenya.",
            icon: MapPin,
            category: "general"
        },
        {
            question: "How can I become a member of Billways Sacco? What are the requirements?",
            answer: (
                <>
                    <p>To become a member, you typically need to fulfill certain requirements:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Copy of National Identity Card</li>
                        <li>Copy of KRA Pin certificate</li>
                        <li>Membership fee (Ksh 700)</li>
                        <li>Fully filled membership form</li>
                        <li>Minimum share capital (Ksh 5,000 for individual members, Ksh 10,000 for groups/micro members, Ksh 15,000 for businesses/MSMEs)</li>
                    </ul>
                    <p className="mt-2">Membership is open to eligible individuals, businesses, and MSMEs.</p>
                </>
            ),
            icon: ClipboardList,
            category: "membership"
        },
        {
            question: "What types of savings products does Billways Sacco offer?",
            answer: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                        "Fixed Deposits",
                        "Junior Accounts",
                        "Shared Capital Accounts",
                        "Chama Accounts (Group savings)",
                        "Benevolent Fund",
                        "52 weeks savings challenge",
                        "Billways goal tiered saving account"
                    ].map((item) => (
                        <div key={item} className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            ),
            icon: PiggyBank,
            category: "savings"
        },
        {
            question: "What are the different loan products available at Billways Sacco, and what are their general terms?",
            answer: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                        "Normal loan",
                        "Development Loan",
                        "School Fees Loan",
                        "Emergency Loan",
                        "Asset Financing Loan",
                        "Salary Advance",
                        "Group Loans",
                        "Business loans",
                        "Mama Mboga loan",
                        "Boda boda loan",
                        "Agri business loan",
                        "Health loan"
                    ].map((item) => (
                        <div key={item} className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            ),
            icon: HandCoins,
            category: "loans"
        },
        {
            question: "How do I apply for a loan at Billways Sacco?",
            answer: "To apply for a loan, you typically need to fill out a loan application form. Requirements may include providing a current payslip (for salaried individuals), sufficient guarantors, Logbook (for vehicles/motorbikes), title deed and ensuring your membership and deposit contributions meet the loan's eligibility criteria.",
            icon: CreditCard,
            category: "loans"
        },
        {
            question: "How do I deposit money into my Billways Sacco account?",
            answer: (
                <>
                    <p>Billways Sacco likely offers several convenient deposit methods:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>M-Pesa Paybill: Business Number 400200, Account Number 841698</li>
                        <li>Direct bank deposits</li>
                        <li>Standing orders through banks</li>
                    </ul>
                </>
            ),
            icon: DollarSign,
            category: "transactions"
        },
        {
            question: "What is the process for withdrawing funds from Billways Sacco?",
            answer: "For withdrawals, especially from non-withdrawable deposit savings accounts, a notice period of 60 days is often required. Shares are generally not withdrawable but can be transferred to another member.",
            icon: Banknote,
            category: "transactions"
        },
        {
            question: "How are dividends and interest on deposits (rebates) handled at Billways Sacco?",
            answer: "The declaration of dividends on shares and interest on SAVINGS (rebates) is usually determined by the management, approved by the Board of Directors, and confirmed at the Annual GENERAL Meeting. Factors like financial performance and liquidity influence these payouts. Unclaimed dividends may be capitalized or forwarded to the Unclaimed Assets Authority after a certain period.",
            icon: Percent,
            category: "dividends"
        },
        {
            question: "Is Billways Sacco regulated and by whom?",
            answer: "Billways Sacco operates under the regulatory framework of the commissioner of cooperatives which supervises SACCOs in Kenya to ensure compliance and protect members.",
            icon: ShieldCheck,
            category: "legal"
        },
        {
            question: "How can I contact Billways Sacco Limited for inquiries?",
            answer: (
                <div className="space-y-2">
                    <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-purple-900" />
                        <span>Email: info@billwayssacco.co.ke / Billwayssaccoltd@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-2 text-green-600" />
                        <span>Phone/WhatsApp: 0700032800</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-green-600" />
                        <span>Social media: @BILLWAYS SACCO LIMITED</span>
                    </div>
                </div>
            ),
            icon: Smartphone,
            category: "contact"
        }
    ];

    const filteredFaqs = activeCategory === 'all' 
        ? faqs 
        : faqs.filter(faq => faq.category === activeCategory);

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center justify-center px-4 py-2 bg-purple-50 rounded-full text-purple-900 mb-4">
                    <BadgeCheck className="h-5 w-5 mr-2" />
                    <span className="font-medium">Your Questions Answered</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-900 to-purple-400 bg-clip-text text-transparent">
                    Billways Sacco FAQs
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Everything you need to know about joining and benefiting from our SACCO
                </p>
            </motion.div>
            
            {/* Category Filter */}
            <motion.div 
                className="flex flex-wrap justify-center gap-2 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Button 
                    variant={activeCategory === 'all' ? 'default' : 'outline'}
                    onClick={() => setActiveCategory('all')}
                    className="px-4 py-2"
                >
                    All Questions
                </Button>
                <Button 
                    variant={activeCategory === 'membership' ? 'default' : 'outline'}
                    onClick={() => setActiveCategory('membership')}
                    className="px-4 py-2"
                >
                    <Users className="h-4 w-4 mr-2" />
                    Membership
                </Button>
                <Button 
                    variant={activeCategory === 'savings' ? 'default' : 'outline'}
                    onClick={() => setActiveCategory('savings')}
                    className="px-4 py-2"
                >
                    <PiggyBank className="h-4 w-4 mr-2" />
                    Savings
                </Button>
                <Button 
                    variant={activeCategory === 'loans' ? 'default' : 'outline'}
                    onClick={() => setActiveCategory('loans')}
                    className="px-4 py-2"
                >
                    <HandCoins className="h-4 w-4 mr-2" />
                    Loans
                </Button>
                <Button 
                    variant={activeCategory === 'transactions' ? 'default' : 'outline'}
                    onClick={() => setActiveCategory('transactions')}
                    className="px-4 py-2"
                >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Transactions
                </Button>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
                className="flex flex-wrap justify-center gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <Button 
                    className="px-8 py-6 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
                    onClick={() => navigate('/membership')}
                >
                    <Users className="h-5 w-5 mr-2" />
                    Join Now
                </Button>
                <Button 
                    className="px-8 py-6 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all"
                    onClick={() => navigate('/apply')}
                >
                    <HandCoins className="h-5 w-5 mr-2" />
                    Apply for a Loan
                </Button>
                <Button 
                    variant="outline"
                    className="px-8 py-6 border-gray-300 hover:bg-gray-50 shadow-sm"
                    onClick={() => navigate('/')}
                >
                    <Home className="h-5 w-5 mr-2" />
                    Back to Home
                </Button>
            </motion.div>

            {/* FAQ Container */}
            <motion.div 
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                {/* FAQ Header */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-5 border-b border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                        <span className="bg-purple-600 w-2 h-8 rounded-full mr-3"></span>
                        Frequently Asked Questions
                    </h3>
                </div>
                
                {/* FAQ Content */}
                <div className="divide-y divide-gray-200/50 px-6">
                    {filteredFaqs.map((faq, index) => (
                        <FAQItem 
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            icon={faq.icon}
                        />
                    ))}
                </div>

                {/* FAQ Footer */}
                <div className="bg-gray-50 px-6 py-5 border-t border-gray-200 text-center">
                    <p className="text-gray-600 mb-4">
                        Still have questions? We're here to help!
                    </p>
                    <Button 
                        variant="outline"
                        className="border-purple-600 text-purple-600 hover:bg-purple-50"
                        onClick={() => navigate('/contact')}
                    >
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Our Support Team
                    </Button>
                </div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div 
                className="mt-16 bg-gradient-to-r from-purple-900 to-purple-500 rounded-2xl p-8 text-center text-white shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <h3 className="text-2xl font-bold mb-3">Ready to Grow With Billways Sacco?</h3>
                <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                    Join thousands of members who are already benefiting from our financial solutions
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button 
                        className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 font-medium"
                        onClick={() => navigate('/membership')}
                    >
                        Become a Member Today
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button 
                        variant="outline" 
                        className="text-white border-white hover:bg-purple-700 hover:border-purple-700 px-8 py-4 font-medium"
                        onClick={() => navigate('/loans')}
                    >
                        Explore Loan Options
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default BillwaysFAQ;