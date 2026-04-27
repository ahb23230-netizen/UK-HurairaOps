import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const quickReplies = [
  'What is UK HurairaOps?',
  'How much does it cost?',
  'Is it free during beta?',
  'What features are included?',
  'How do I start?'
];

const botResponses: Record<string, string> = {
  'what': 'UK HurairaOps is the compliance management platform built specifically for UK restaurants. We help you track food safety, licenses, insurance, and more - all in one dashboard. ✅',
  'cost': 'We offer 3 plans: Starter (£19/mo), Professional (£49/mo), and Business (£99/mo). But during beta, ALL plans are completely FREE! 🎁',
  'free': 'Yes! Beta users get full access to all features for FREE during the beta period. Plus, you lock in 50% off forever when we launch publicly. 🎉',
  'features': '🎯 Key Features:\n\n• Food Safety Tracking (temperature logs)\n• License Management (renewal reminders)\n• Insurance Tracking\n• Document Storage\n• EHO Inspection Prep Bot\n• SFBB Diary Generator\n• Seasonal Alerts\n\nEverything UK restaurants need!',
  'start': 'Getting started is easy:\n\n1️⃣ Go to our landing page\n2️⃣ Click "Join Beta"\n3️⃣ Create your free account\n4️⃣ Start tracking compliance\n\nNo credit card required! 🚀',
  'default': 'I am here to help! Our beta program is open for UK restaurants. Click the button below to join and lock in 50% off forever! 🎁'
};

export default function PublicChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Welcome to UK HurairaOps!\n\nI'm your compliance assistant. How can I help you today?",
      isBot: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('what') || lowerMessage.includes('uk hurairaops')) {
      return botResponses['what'];
    }
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('سعر')) {
      return botResponses['cost'];
    }
    if (lowerMessage.includes('free') || lowerMessage.includes('beta') || lowerMessage.includes('مجاني')) {
      return botResponses['free'];
    }
    if (lowerMessage.includes('feature') || lowerMessage.includes('مميزات') || lowerMessage.includes('does')) {
      return botResponses['features'];
    }
    if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('how') || lowerMessage.includes('بدأ')) {
      return botResponses['start'];
    }

    return botResponses['default'];
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot typing
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(text),
        isBot: true
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944v11.056a8 1 1 0 11-2 0v-1.944a11.955 11.955 0 01-5.618-4.132z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">UK HurairaOps Assistant</h3>
                <p className="text-blue-100 text-xs">Usually replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-white border-t">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    handleSendMessage(inputValue);
                    setInputValue('');
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={() => {
                  if (inputValue.trim()) {
                    handleSendMessage(inputValue);
                    setInputValue('');
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>

            {/* CTA */}
            <div className="mt-3 text-center">
              <Link
                to="/beta"
                onClick={() => setIsOpen(false)}
                className="inline-block text-sm bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                Join Beta - FREE!
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Floating notification when closed */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-lg p-3 max-w-[200px] animate-fade-in">
          <p className="text-sm text-gray-700">Have questions about UK HurairaOps?</p>
          <button
            onClick={() => setIsOpen(true)}
            className="text-blue-600 text-sm font-medium hover:underline mt-1"
          >
            Chat with us →
          </button>
        </div>
      )}
    </>
  );
}