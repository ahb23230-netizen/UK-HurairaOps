import { useState, useEffect, useRef, useCallback } from 'react';
import { useSubscription } from '../contexts/SubscriptionContext';
// Simple markdown parser
const parseMarkdown = (text: string): string => {
  let html = text;

  // Headers (### and ##)
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-4 mb-2">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-4 mb-2">$1</h1>');

  // Bold (**text**)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');

  // Italic (*text*)
  html = html.replace(/\*(.+?)\*/g, '<em class="italic text-gray-300">$1</em>');

  // Bullet lists (- item)
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 text-gray-200">$1</li>');
  html = html.replace(/(<li class="ml-4 text-gray-200">.+<\/li>\n?)+/g, '<ul class="list-disc list-inside space-y-1 my-2">$&</ul>');

  // Numbered lists (1. item)
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-gray-200">$1</li>');
  html = html.replace(/(<li class="ml-4 text-gray-200">.+<\/li>\n?)+/g, '<ol class="list-decimal list-inside space-y-1 my-2">$&</ol>');

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p class="text-gray-200 mb-2">');
  html = html.replace(/\n/g, '<br/>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="border-slate-600 my-4"/>');

  // Wrap in paragraph if not already wrapped
  if (!html.startsWith('<')) {
    html = '<p class="text-gray-200 mb-2">' + html + '</p>';
  }

  return html;
};

// Message interface
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Quick Question interface
interface QuickQuestion {
  id: string;
  question: string;
  category: string;
  icon: string;
}

// System prompt for Professor Huraira
const SYSTEM_PROMPT = `You are Professor Huraira — the ultimate UK food business expert and restaurant success coach. You have deep mastery across every dimension of running a food business in the United Kingdom.

Your core expertise covers:

🏛️ UK LAW & COMPLIANCE
- Food Safety Act 1990, Food Hygiene Regulations 2006
- FSA (Food Standards Agency) guidelines
- EHO (Environmental Health Officer) inspection criteria
- HACCP implementation and food safety management systems
- Allergen regulations (Natasha's Law, the 14 mandatory allergens)
- Food labelling laws and Trading Standards
- Licensing laws (alcohol, late-night, premises)
- Planning permission and change-of-use for food premises
- Fire safety regulations relevant to food businesses
- Local council requirements and how to navigate them

📊 BUSINESS SUCCESS & PROFITABILITY
- Menu engineering and profit margin optimisation
- Food cost percentage control and waste reduction
- Dynamic pricing strategies
- Supplier negotiation and procurement
- Cash flow management for restaurants
- How to read and improve a P&L for a food business
- Upselling techniques and average spend per head
- How to survive and thrive in the current UK cost-of-living crisis

👨‍🍳 CULINARY EXPERTISE
- Food preparation techniques and best practices
- Flavour pairing and recipe development
- Cuisine-specific knowledge (British, South Asian, Middle Eastern, Italian, etc.)
- Food presentation and plating
- Kitchen workflow optimisation
- Seasonal menu planning
- Dietary trends (vegan, halal, gluten-free, etc.)

⭐ RATINGS & REPUTATION
- How to achieve and maintain a 5-star Food Hygiene Rating
- Google Reviews and TripAdvisor strategy
- Responding to negative reviews professionally
- Building customer loyalty in the UK market

👥 STAFF & OPERATIONS
- UK employment law basics for restaurant staff
- Staff training and food hygiene certification (Level 2, Level 3)
- Rota management and reducing labour costs
- Front-of-house vs back-of-house efficiency

🔓 FLEXIBLE MODE — BEHAVIOUR OUTSIDE YOUR EXPERTISE:
You are helpful and friendly by nature. If someone asks a question outside your food/restaurant expertise (for example: sports results, general knowledge, current news, travel, technology, etc.), you should:
1. Answer the question briefly and helpfully using your general knowledge
2. Then naturally remind them — in a warm and light-hearted way — that your real superpower is food and restaurant business in the UK
3. Invite them to ask you anything food-related

You respond in a warm, confident, expert tone — like a trusted professor who has seen it all. You give specific, actionable advice, not vague generalities. When relevant, you cite UK law or FSA guidelines. Use markdown formatting (bold, bullet points, numbered lists, emojis) to make your answers structured and professional.`;

// Welcome message
const WELCOME_MESSAGE = `Hello! I'm Professor Huraira — your all-in-one UK food business expert.

Whether you need help with:

✅ Passing your EHO inspection
✅ Boosting your profits
✅ Understanding UK food law
✅ Building a winning menu
✅ Managing your team

...just ask me anything. Food business is my passion — but I'm happy to chat about anything! 😊

---

**Quick tip:** Be specific with your questions for the best answers. For example, instead of "help with hygiene," try "What do I need for a 5-star hygiene rating?"`;

export default function EHOInspectorBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: WELCOME_MESSAGE,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { plan } = useSubscription();

  // New Quick Questions with icons
  const quickQuestions: QuickQuestion[] = [
    { id: '1', question: 'How do I get a 5-star hygiene rating?', category: 'Rating', icon: '🏆' },
    { id: '2', question: 'How can I increase my restaurant\'s profit margin?', category: 'Business', icon: '💰' },
    { id: '3', question: 'What are Natasha\'s Law allergen requirements?', category: 'Allergens', icon: '🌿' },
    { id: '4', question: 'What are the best flavour combinations for a winning menu?', category: 'Menu', icon: '🔥' },
    { id: '5', question: 'What documents must I have ready for an EHO inspection?', category: 'Compliance', icon: '📋' },
    { id: '6', question: 'How do I reduce food waste and save money?', category: 'Sustainability', icon: '📉' },
    { id: '7', question: 'What are my legal duties as a food business owner in the UK?', category: 'Legal', icon: '👨‍💼' },
    { id: '8', question: 'How do I respond to a bad Google review professionally?', category: 'Reputation', icon: '⭐' },
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Call Claude API through secure backend proxy
  const callClaudeAPI = async (userMessage: string, conversationHistory: Message[]): Promise<string> => {
    // Build messages array for Claude
    const claudeMessages = conversationHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }));

    // Add the new user message
    claudeMessages.push({
      role: 'user',
      content: userMessage
    });

    try {
      // Call our secure backend proxy - relative URL for same-origin deployment
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
          messages: claudeMessages,
          systemPrompt: SYSTEM_PROMPT,
          plan: plan
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `API error: ${response.status}`);
      }

      return data.reply;
    } catch (error) {
      console.error('Claude API Error:', error);
      throw error;
    }
  };

  // Handle send message
  const handleSendMessage = useCallback(async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

    // Clear input immediately
    setInputValue('');
    setError(null);

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Get current conversation history (excluding welcome message for cleaner context)
      const conversationHistory = messages.filter(m => m.id !== 'welcome');

      // Call Claude API
      const botResponse = await callClaudeAPI(messageToSend, conversationHistory);

      // Add bot response
      const botMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: botResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('API Error:', err);
      // Extract meaningful error message
      let errorMessage = 'Something went wrong. Please try again.';
      if (err instanceof Error) {
        const msg = err.message;
        // Clean up error message
        if (msg.includes('API error')) {
          errorMessage = msg.replace(/API error: \d+ - /, '');
        } else if (msg.includes('API key')) {
          errorMessage = 'API key issue. Please check configuration.';
        } else if (msg.includes('model')) {
          errorMessage = 'Model configuration issue. Please contact support.';
        } else {
          errorMessage = msg.substring(0, 100);
        }
      }
      setError(errorMessage);

      // Add error message to chat
      const errorBotMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `I apologize, but I encountered an error while processing your request. Please try again or rephrase your question.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [inputValue, messages]);

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  // Render markdown content
  const renderContent = (content: string) => {
    return (
      <div
        className="prose prose-sm max-w-none text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
      />
    );
  };

  return (
    <>
      {/* Professor Huraira Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src="/eho-bot-logo.png" alt="Professor Huraira" className="w-20 h-20 rounded-full object-contain border-3 border-emerald-400 shadow-lg" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                <span className="text-xs">🎓</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Professor Huraira</h2>
              <p className="text-emerald-200 text-sm">Your UK Food Business Expert — Ask me anything!</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">AI Powered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Chat Container */}
      <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 mb-6 overflow-hidden">
        <div
          ref={chatContainerRef}
          className="h-[500px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-slate-800 to-slate-900"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl rounded-br-md shadow-lg border border-blue-500'
                    : 'bg-slate-700 border border-slate-600 text-gray-100 rounded-2xl rounded-bl-md shadow-lg'
                } px-6 py-5`}
              >
                {message.role === 'assistant' && message.id !== 'welcome' && (
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-600">
                    <img src="/eho-bot-logo.png" alt="Professor Huraira" className="w-10 h-10 rounded-full object-contain border border-slate-500" />
                    <div>
                      <span className="text-sm font-semibold text-white">Professor Huraira</span>
                      <span className="block text-xs text-slate-400">UK Food Business Expert</span>
                    </div>
                  </div>
                )}
                {message.role === 'assistant' && message.id === 'welcome' && (
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-600">
                    <img src="/eho-bot-logo.png" alt="Professor Huraira" className="w-10 h-10 rounded-full object-contain border border-slate-500" />
                    <div>
                      <span className="text-sm font-semibold text-white">Professor Huraira</span>
                      <span className="block text-xs text-slate-400">Welcome!</span>
                    </div>
                  </div>
                )}
                <div className="text-sm leading-relaxed">
                  {renderContent(message.content)}
                </div>
                <div className={`text-xs mt-3 pt-2 border-t ${message.role === 'user' ? 'text-blue-200 border-white/20' : 'text-slate-400 border-slate-600'}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-700 border border-slate-600 rounded-2xl rounded-bl-md px-6 py-5 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <img src="/eho-bot-logo.png" alt="Professor Huraira" className="w-10 h-10 rounded-full object-contain" />
                  <span className="text-sm text-slate-400">Professor Huraira is thinking...</span>
                </div>
                <div className="flex items-center gap-1 ml-13">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-700 p-4 bg-slate-800">
          <div className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    handleSendMessage();
                  }
                }}
                placeholder="Ask Professor Huraira anything about your food business..."
                className="w-full px-5 py-4 bg-slate-700 border border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
              />
            </div>
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:shadow-none flex items-center gap-2"
            >
              {isTyping ? (
                <>
                  <span>Thinking...</span>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </>
              ) : (
                <>
                  <span>Send</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Questions - Professor's Special Topics */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl border border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-5">
          <img src="/eho-bot-logo.png" alt="Professor Huraira" className="w-10 h-10 rounded-full object-contain border border-slate-600" />
          <div>
            <h3 className="text-lg font-bold text-white">Popular Topics</h3>
            <p className="text-sm text-slate-400">Click to explore common food business questions</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickQuestions.map((q) => (
            <button
              key={q.id}
              onClick={() => handleSendMessage(q.question)}
              disabled={isTyping}
              className="text-left p-4 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 rounded-xl transition-all group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-2xl mb-2 block">{q.icon}</span>
              <span className="inline-flex items-center px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full mb-2">
                {q.category}
              </span>
              <p className="text-sm text-gray-300 font-medium leading-relaxed group-hover:text-white transition-colors">{q.question}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">
          <span className="font-medium text-slate-400">Pro Tip:</span> Professor Huraira remembers your entire conversation! Ask follow-up questions for deeper insights.
        </p>
      </div>
    </>
  );
}
