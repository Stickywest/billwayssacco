import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import WhatsAppButton from "./WhatsAppButton";
import billwaysLogo from '../assets/logo.svg';


interface Message {
  sender: 'user' | 'bot';
  text: string;
  quickActions?: QuickAction[];
}

interface QuickAction {
  text: string;
  action: 'link' | 'call' | 'question';
  value: string;
}

interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
// Get the base URL dynamically
const baseUrl = window.location.href.includes('github.io') 
  ? window.location.href.split('/').slice(0, 3).join('/') + '/' + window.location.href.split('/')[3] 
  : '';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [showHelpBubble, setShowHelpBubble] = useState(false);
  const [scrollTimer, setScrollTimer] = useState<NodeJS.Timeout | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  // Color scheme
  const primaryColor = '#4CAF50'; // Green light
  const secondaryColor = '#7B1FA2'; // Purple 900
  const accentColor = '#8BC34A'; // Light green
  const textColor = '#212121'; // Dark gray

  // Get API key from environment variables
  const API_KEY = import.meta.env?.VITE_GROQ_API_KEY || process.env.REACT_APP_GROQ_API_KEY;

  // Enhanced common questions with quick actions
  const commonQuestions: Record<string, {text: string, quickActions?: QuickAction[]}> = {
    'hello': {
      text: 'Hello! Welcome to Billways Sacco. How can I assist you today?',
      quickActions: [
        { text: 'Membership', action: 'link', value: `${baseUrl}/#membership` },
        { text: 'Loan Products', action: 'question', value: 'What loan products do you offer?' },
        { text: 'Contact Us', action: 'call', value: '0700032800' }
      ]
    },
    'hi': {
      text: 'Hi there! How can I help you with Billways Sacco services?',
      quickActions: [
        { text: 'About Us', action: 'question', value: 'What is Billways Sacco?' },
        { text: 'Savings', action: 'question', value: 'What savings products do you offer?' },
        { text: 'Call Us', action: 'call', value: '0700032800' }
      ]
    },
    'membership': {
      text: `Membership Requirements:
1. Copy of National ID
2. KRA Pin certificate
3. Membership fee: Ksh 700
4. Minimum share capital:
   - Individuals: Ksh 5,000
   - Groups: Ksh 10,000
   - Businesses: Ksh 15,000`,
      quickActions: [
        { text: 'Join Now', action: 'link', value: `${baseUrl}/#membership` },
        { text: 'Contact', action: 'call', value: '0700032800' }
      ]
    },
    'loan': {
      text: `Available Loan Products:
- Development Loan
- School Fees Loan
- Emergency Loan
- Business Loan
- Mama Mboga Loan
- Boda Boda Loan

Interest rates start from 12% p.a.`,
      quickActions: [
        { text: 'Apply Now', action: 'link', value:`${baseUrl}/#apply` },
        { text: 'Loan Terms', action: 'question', value: 'What are the loan terms?' }
      ]
    },
    'saving': {
      text: `Savings Products:
1. Fixed Deposits
2. Junior Accounts
3. 52 Weeks Challenge
4. Goal Tiered Savings

Earn competitive interest on your savings!`,
      quickActions: [
        { text: 'Open Account', action: 'link', value: `${baseUrl}/#membership`},
        { text: 'Rates', action: 'question', value: 'What are your savings rates?' }
      ]
    },
    'contact': {
      text: `Contact Information:
Phone: 0700032800
Email: info@billwayssacco.co.ke
Location: Langalanga Market, Room 85, Nakuru`,
      quickActions: [
        { text: 'Call Now', action: 'call', value: '0700032800' },
        { text: 'WhatsApp', action: 'link', value: 'https://wa.me/254700032800' },
        { text: 'Email', action: 'link', value: 'mailto:info@billwayssacco.co.ke' }
      ]
    },
    'hours': {
      text: `Working Hours:
Monday - Friday: 8:00 AM - 5:00 PM
Saturday: 9:00 AM - 1:00 PM
Sunday: Closed`
    },
    'thanks': {
      text: "You're welcome! Is there anything else I can help you with?",
      quickActions: [
        { text: 'Membership', action: 'link', value: `${baseUrl}/#membership`},
        { text: 'Loans', action: 'link', value: `${baseUrl}/#apply`},
        { text: 'Savings', action: 'link', value: `${baseUrl}/#services` }
      ]
    },
    'help': { 
      text: `How can I help you? Here are some options:`,
      quickActions: [
        { text: 'About Billways', action: 'question', value: 'What is Billways Sacco?' },
        { text: 'Membership', action: 'question', value: 'How do I become a member?' },
        { text: 'Loan Products', action: 'question', value: 'What loans do you offer?' },
        { text: 'Contact', action: 'call', value: '0700032800' }
      ]
    },
    'what is billways': {
      text: `What is Billways Sacco Limited?
Billways Sacco is a savings and credit cooperative society in Kenya that provides a range of financial solutions, including savings accounts, low-interest loans, and financial literacy programs, to empower its members and support their economic growth.`,
      quickActions: [
        { text: 'Join Us', action: 'link', value: '/#membership' },
        { text: 'Our Services', action: 'question', value: 'What services do you offer?' }
      ]
    },
    'location': {
      text: `Where is Billways Sacco Limited located?
Billways Sacco has its physical office located at LANGALANGA MARKET, Room 85, Nakuru, Kenya.`,
      quickActions: [
        { text: 'Directions', action: 'link', value: 'https://maps.google.com?q=Langalanga+Market,Nakuru' },
        { text: 'Contact', action: 'call', value: '0700032800' }
      ]
    },
    'become a member': {
      text: `How can I become a member of Billways Sacco? What are the requirements?
To become a member, you typically need to fulfill these requirements:

1. Copy of National Identity Card
2. Copy of KRA Pin certificate
3. Membership fee (Ksh 700)
4. Fully filled membership form
5. Minimum share capital:
   - Ksh 5,000 for individual members
   - Ksh 10,000 for groups/micro members
   - Ksh 15,000 for businesses/MSMEs

Membership is open to eligible individuals, businesses, and MSMEs.`,
      quickActions: [
        { text: 'Apply Now', action: 'link', value: `${baseUrl}/#membership` },
        { text: 'Download Form', action: 'link', value: '/membership-form' }
      ]
    },
    'savings products': {
      text: `What types of savings products does Billways Sacco offer?
1. Fixed Deposits
2. Junior Accounts
3. Shared Capital Accounts
4. Chama Accounts (Group savings)
5. Benevolent Fund
6. 52 weeks savings challenge
7. Billways goal tiered saving account`,
      quickActions: [
        { text: 'Open Account', action: 'link', value: '/savings' },
        { text: 'Rates', action: 'question', value: 'What are your savings rates?' }
      ]
    },
    'loan products': {
      text: `What are the different loan products available at Billways Sacco?
1. Normal loan
2. Development Loan
3. School Fees Loan
4. Emergency Loan
5. Asset Financing Loan
6. Salary Advance
7. Group Loans
8. Business loans
9. Mama Mboga loan
10. Boda boda loan
11. Agri business loan
12. Health loan`,
      quickActions: [
        { text: 'Apply Now', action: 'link', value: '/#apply' },
        { text: 'Requirements', action: 'question', value: 'What are the loan requirements?' }
      ]
    },
    'apply for loan': {
      text: `How do I apply for a loan at Billways Sacco?
To apply for a loan, you typically need to:
1. Fill out a loan application form
2. Provide required documents:
   - Current payslip (for salaried individuals)
   - Sufficient guarantors
   - Logbook (for vehicles/motorbikes)
   - Title deed (where applicable)
3. Ensure your membership and deposit contributions meet the loan's eligibility criteria`,
      quickActions: [
        { text: 'Loan Form', action: 'link', value: `${baseUrl}/#apply` },
        { text: 'Eligibility', action: 'question', value: 'What are the loan eligibility criteria?' }
      ]
    },
    'deposit money': {
      text: `How do I deposit money into my Billways Sacco account?
You can deposit through:
1. M-Pesa Paybill: Business Number 400200, Account Number 841698
2. Direct bank deposits
3. Standing orders through banks`,
      quickActions: [
        { text: 'Paybill Help', action: 'question', value: 'How do I use the M-Pesa paybill?' },
        { text: 'Bank Details', action: 'question', value: 'What are your bank details?' }
      ]
    },
    'withdraw funds': {
      text: `What is the process for withdrawing funds from Billways Sacco?
For withdrawals, especially from non-withdrawable deposit savings accounts:
- A notice period of 60 days is often required
- Shares are generally not withdrawable but can be transferred to another member`,
      quickActions: [
        { text: 'Withdrawal Form', action: 'link', value: '/withdrawal-form' },
        { text: 'Contact', action: 'call', value: '0700032800' }
      ]
    },
    'dividends': {
      text: `How are dividends and interest on deposits (rebates) handled at Billways Sacco?
- Dividends on shares and interest on savings (rebates) are determined by management
- Approved by the Board of Directors
- Confirmed at the Annual General Meeting
- Financial performance and liquidity influence payouts
- Unclaimed dividends may be forwarded to the Unclaimed Assets Authority after a period`,
      quickActions: [
        { text: 'Financial Report', action: 'link', value: '/financial-reports' },
        { text: 'AGM Details', action: 'question', value: 'When is the next AGM?' }
      ]
    },
    'regulated': {
      text: `Is Billways Sacco regulated and by whom?
Billways Sacco operates under the regulatory framework of the commissioner of cooperatives which supervises SACCOs in Kenya to ensure compliance and protect members.`,
      quickActions: [
        { text: 'Compliance', action: 'question', value: 'What compliance standards do you follow?' }
      ]
    }
  };

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Help bubble on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowHelpBubble(true);
      if (scrollTimer) clearTimeout(scrollTimer);
      setScrollTimer(setTimeout(() => setShowHelpBubble(false), 1500));
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [scrollTimer]);

  // Initial load bubble
  useEffect(() => {
    if (initialLoad) {
      setShowHelpBubble(true);
      const timer = setTimeout(() => {
        setShowHelpBubble(false);
        setInitialLoad(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [initialLoad]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowHelpBubble(false);
  };

  const handleQuickAction = (action: QuickAction) => {
    if (action.action === 'question') {
      setQuestion(action.value);
      sendMessage(action.value);
    } else if (action.action === 'call') {
      window.open(`tel:${action.value}`, '_blank');
    } else if (action.action === 'link') {
      window.open(action.value, '_blank');
    }
  };

  const sendMessage = async (customQuestion?: string) => {
    const questionToSend = customQuestion || question;
    if (!questionToSend.trim()) return;

    const userMessage: Message = { sender: 'user', text: questionToSend };
    setMessages((prev) => [...prev, userMessage]);
    if (!customQuestion) setQuestion('');
    setLoading(true);

    // Check for common questions first
    const lowerQuestion = questionToSend.toLowerCase();
    for (const [key, response] of Object.entries(commonQuestions)) {
      if (lowerQuestion.includes(key)) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            sender: 'bot', 
            text: response.text,
            quickActions: response.quickActions 
          }]);
          setLoading(false);
        }, 800);
        return;
      }
    }

    // Only proceed with API call if we have an API key
    if (API_KEY) {
      try {
        const response = await axios.post<ChatCompletion>(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model: 'llama3-70b-8192',
            messages: [
              {
                role: 'system',
                content: `You are Billways Assistant, the official AI chatbot for Billways Sacco Limited. Respond professionally and helpfully using these brand colors: Green (#4CAF50) and Purple (#7B1FA2). 
                
                Important information about Billways Sacco:
                - Location: Langalanga Market, Room 85, Nakuru, Kenya
                - Contacts: 0700032800, info@billwayssacco.co.ke
                - Services: Savings accounts, loans, financial education
                
                Format responses clearly without using markdown symbols like ** or *. 
                Include relevant quick actions when appropriate (membership, loans, savings, contact).`
              },
              { role: 'user', content: questionToSend }
            ],
            temperature: 0.7,
            max_tokens: 500
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${API_KEY}`,
            },
            timeout: 10000
          }
        );

        const botReply = response.data.choices[0].message.content;
        
        // Add quick actions for certain responses
        let quickActions: QuickAction[] = [];
        if (botReply.toLowerCase().includes('member') || botReply.toLowerCase().includes('join')) {
          quickActions = [
            { text: 'Join Now', action: 'link', value: '/#membership' },
            { text: 'Requirements', action: 'question', value: 'What are the membership requirements?' }
          ];
        } else if (botReply.toLowerCase().includes('loan')) {
          quickActions = [
            { text: 'Apply Now', action: 'link', value: '/loans' },
            { text: 'Loan Products', action: 'question', value: 'What loan products do you offer?' }
          ];
        } else if (botReply.toLowerCase().includes('contact') || botReply.toLowerCase().includes('call')) {
          quickActions = [
            { text: 'Call Now', action: 'call', value: '0700032800' },
            { text: 'WhatsApp', action: 'link', value: 'https://wa.me/254700032800' }
          ];
        }

        setMessages((prev) => [...prev, { 
          sender: 'bot', 
          text: botReply,
          quickActions 
        }]);
      } catch (error) {
        console.error('API Error:', error);
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `I'm having trouble connecting to our services. For immediate assistance:\n\n📞 0700032800\n📧 info@billwayssacco.co.ke`,
          quickActions: [
            { text: 'Call Now', action: 'call', value: '0700032800' },
            { text: 'WhatsApp', action: 'link', value: 'https://wa.me/254700032800' }
          ]
        }]);
      } finally {
        setLoading(false);
      }
    } else {
      // No API key available
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `I can't process complex queries right now. Please contact us directly:\n\n📞 0700032800\n📧 info@billwayssacco.co.ke\n\nOr ask about:\n- Membership\n- Loans\n- Savings\n- Contact info`,
          quickActions: [
            { text: 'Membership', action: 'link', value: '#membership' },
            { text: 'Loans', action: 'link', value: '/loans' },
            { text: 'Call Us', action: 'call', value: '0700032800' }
          ]
        }]);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Help bubble */}
      {showHelpBubble && (
        <div 
          className="absolute -top-3 -left-32 bg-purple-900 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap animate-pulse shadow-md"
          style={{ minWidth: '140px' }}
        >
          Need financial help?
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-purple-900"></div>
        </div>
      )}

      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="p-4 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-110"
        aria-label="Open chat"
        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 left-4 sm:right-6 sm:left-auto w-full sm:w-96 h-[32rem] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div 
            className="bg-white text-purple-900 p-4 flex justify-between items-center"
            style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="flex items-center space-x-3">
              <img src={billwaysLogo} alt="Billways Sacco Logo" className="h-8 w-8 rounded-full object-cover" />
              <span className="font-semibold">Billways Assistant</span>
              <WhatsAppButton />
            </div>
            
            <button 
              onClick={toggleChat}
              className="text-black hover:text-gray-200 text-xl focus:outline-none"
            >
              &times;
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center p-4">
                <p className="font-medium text-purple-900 mb-2">Welcome to Billways Sacco!</p>
                <p className="text-gray-600 mb-4">How can I assist you today?</p>
                <div className="text-left bg-white p-3 rounded-lg border border-gray-200">
                  <p className="font-medium text-green-500 mb-2">Try asking:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>How do I become a member?</li>
                    <li>What loan options are available?</li>
                    <li>What are your working hours?</li>
                    <li>How can I contact you?</li>
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button 
                      onClick={() => handleQuickAction({ text: 'Membership', action: 'question', value: 'How do I become a member?' })}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition"
                    >
                      Membership
                    </button>
                    <button 
                      onClick={() => handleQuickAction({ text: 'Loans', action: 'question', value: 'What loans do you offer?' })}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition"
                    >
                      Loans
                    </button>
                    <button 
                      onClick={() => handleQuickAction({ text: 'Contact', action: 'call', value: '0700032800' })}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i}>
                <div
                  className={`mb-3 p-3 rounded-lg max-w-[90%] ${msg.sender === 'user' 
                    ? 'ml-auto bg-green-100 border border-green-200 text-gray-800' 
                    : 'mr-auto bg-white border border-gray-200 shadow-sm text-gray-700'}`}
                >
                  {msg.text.split('\n').map((line, j) => (
                    <p key={j} className="mb-1 last:mb-0">{line}</p>
                  ))}
                </div>
                {msg.quickActions && msg.sender === 'bot' && (
                  <div className="flex flex-wrap gap-2 mb-3 ml-2">
                    {msg.quickActions.map((action, k) => (
                      <button
                        key={k}
                        onClick={() => handleQuickAction(action)}
                        className={`px-3 py-1 rounded-full text-sm hover:opacity-90 transition ${
                          action.action === 'call' ? 'bg-red-100 text-red-800' :
                          action.action === 'link' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {action.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="mr-auto p-3 bg-white border border-gray-200 rounded-lg shadow-sm w-fit">
                <div className="flex space-x-2 items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 border-t border-gray-200 bg-gray-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about our services..."
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                disabled={loading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !question.trim()}
                className="p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded transition-colors flex items-center justify-center"
                style={{ minWidth: '40px' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="mt-2 text-center text-xs text-gray-500">
              <p>Powered by <a href="https://akiliedgesolutions.co.ke" target="_blank" rel="noopener noreferrer" className="text-purple-900 hover:underline">Akiliedge Solutions</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;