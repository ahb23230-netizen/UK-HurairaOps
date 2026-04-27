import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  const getBotResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();

    if (lower.includes('temperature') || lower.includes('fridge') || lower.includes('freezer')) {
      return `**Temperature Requirements:**

🥶 Fridge: 0°C to 5°C
🧊 Freezer: -18°C or below

Check twice daily and record in your SFBB diary.`;
    }

    if (lower.includes('allergen') || lower.includes('14')) {
      return `**14 Major Allergens:**

🍞 Gluten 🥚 Eggs 🐟 Fish
🥜 Peanuts 🥛 Milk 🦐 Crustaceans
🌰 Tree Nuts 🌾 Celery 🌱 Mustard
🌿 Sesame 🧄 Sulphites 🫘 Soya

You must display these on your menu!`;
    }

    if (lower.includes('inspect') || lower.includes('eho') || lower.includes('question')) {
      return `**EHO Inspection Questions:**

Common questions include:
- Temperature logs
- SFBB diary
- Handwashing facilities
- Staff training certificates
- Allergen information

Use the EHO Bot in Dashboard for detailed prep!`;
    }

    if (lower.includes('rating') || lower.includes('5 star') || lower.includes('hygiene')) {
      return `**5-Star Rating Tips:**

⭐ Confidence in Management (50%)
⭐ Hygiene (25%)
⭐ Structure (25%)

Keep records up to date, train staff, and maintain clean premises!`;
    }

    return `I can help with:
🔸 Temperature requirements
🔸 14 allergens
🔸 EHO inspection prep
🔸 5-star rating tips
🔸 Training requirements

Type your question or click "Full Chat" for more!`;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      content: getBotResponse(inputValue),
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSend(), 100);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group"
      >
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <div className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Need help? Chat with us!
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold">EHO Assistant</h3>
            <p className="text-blue-200 text-xs">Quick help for compliance</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/eho-bot')}
            className="text-xs text-blue-200 hover:text-white transition-colors"
          >
            Full Chat →
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Hi! I'm your EHO Assistant</h4>
            <p className="text-sm text-gray-600 mb-4">Ask me about UK food safety compliance</p>

            {/* Quick Questions */}
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleQuickQuestion('What temperature should my fridge be?')}
                className="text-left p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-xs text-blue-600 font-medium">Temperature</span>
                <p className="text-sm text-gray-700">Fridge temperature requirements?</p>
              </button>
              <button
                onClick={() => handleQuickQuestion('What are the 14 allergens?')}
                className="text-left p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-xs text-blue-600 font-medium">Allergens</span>
                <p className="text-sm text-gray-700">The 14 major allergens?</p>
              </button>
              <button
                onClick={() => handleQuickQuestion('How do I get a 5-star rating?')}
                className="text-left p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-xs text-blue-600 font-medium">Rating</span>
                <p className="text-sm text-gray-700">How to get 5-star rating?</p>
              </button>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200'
            } rounded-2xl px-4 py-3`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2.5 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
