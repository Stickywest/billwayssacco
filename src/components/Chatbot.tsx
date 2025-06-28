import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import WhatsAppButton from "./WhatsAppButton";
import billwaysLogo from '../assets/logo.svg';

interface Message {
  sender: 'user' | 'bot';
  text: string;
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

  // Get API key from environment variables (works with both Vite and CRA)
  const API_KEY = import.meta.env?.VITE_GROQ_API_KEY || process.env.REACT_APP_GROQ_API_KEY;

  // Enhanced common questions fallback
  const commonQuestions: Record<string, string> = {
    'hello': 'Hello! Welcome to Billways Sacco. How can I assist you today?',
    'hi': 'Hi there! How can I help you with Billways Sacco services?',
    'membership': `Membership Requirements:
1. Copy of National ID
2. KRA Pin certificate
3. Membership fee: Ksh 700
4. Minimum share capital:
   - Individuals: Ksh 5,000
   - Groups: Ksh 10,000
   - Businesses: Ksh 15,000`,
    'loan': `Available Loan Products:
- Development Loan
- School Fees Loan
- Emergency Loan
- Business Loan
- Mama Mboga Loan
- Boda Boda Loan

Interest rates start from 12% p.a.`,
    'saving': `Savings Products:
1. Fixed Deposits
2. Junior Accounts
3. 52 Weeks Challenge
4. Goal Tiered Savings

Earn competitive interest on your savings!`,
    'contact': `Contact Information:
📞 Phone: 0700032800
📧 Email: info@billwayssacco.co.ke
📍 Location: Langalanga Market, Room 85, Nakuru`,
    'hours': `Working Hours:
Monday - Friday: 8:00 AM - 5:00 PM
Saturday: 9:00 AM - 1:00 PM
Sunday: Closed`,
    'thanks': "You're welcome! Is there anything else I can help you with?",
    'help': `How can I help you? You can ask about:
- Membership
- Loans
- Savings
- Contact information
- Working hours`
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

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userMessage: Message = { sender: 'user', text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    // Check for common questions first
    const lowerQuestion = question.toLowerCase();
    for (const [key, response] of Object.entries(commonQuestions)) {
      if (lowerQuestion.includes(key)) {
        setTimeout(() => {
          setMessages(prev => [...prev, { sender: 'bot', text: response }]);
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
                content: `You are Billways Assistant, the official AI chatbot for Billways Sacco Limited. Respond professionally and helpfully using these brand colors: Green (#4CAF50) and Purple (#7B1FA2).`
              },
              { role: 'user', content: question }
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
        setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      } catch (error) {
        console.error('API Error:', error);
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `I'm having trouble connecting to our services. For immediate assistance:\n\n📞 0700032800\n📧 info@billwayssacco.co.ke` 
        }]);
      } finally {
        setLoading(false);
      }
    } else {
      // No API key available
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `I can't process complex queries right now. Please contact us directly:\n\n📞 0700032800\n📧 info@billwayssacco.co.ke\n\nOr ask about:\n- Membership\n- Loans\n- Savings\n- Contact info` 
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
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 p-3 rounded-lg max-w-[90%] ${msg.sender === 'user' 
                  ? 'ml-auto bg-green-100 border border-green-200 text-gray-800' 
                  : 'mr-auto bg-white border border-gray-200 shadow-sm text-gray-700'}`}
              >
                {msg.text.split('\n').map((line, j) => (
                  <p key={j} className="mb-1 last:mb-0">{line}</p>
                ))}
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
                onClick={sendMessage}
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