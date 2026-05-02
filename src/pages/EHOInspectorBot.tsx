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

// System prompt for Chef Huraira
const SYSTEM_PROMPT = `You are Chef Huraira — a trusted expert in UK food business, restaurant compliance, and culinary success. You have 20+ years of real-world experience running food businesses in the United Kingdom.

## IDENTITY
Your name is Chef Huraira. You are not a professor. You are a practitioner — a chef, operator, and compliance expert who has been through it all. You give advice like a senior consultant, not a lecturer.

## YOUR EXPERTISE
- UK food law: Food Safety Act 1990, Food Hygiene Regulations 2006, Regulation EC 852/2004
- FSA guidelines, EHO inspections, HACCP systems, Natasha's Law (14 allergens)
- Food hygiene ratings (0–5 star system), how inspectors assess premises
- Restaurant profitability: menu engineering, food cost %, waste reduction, supplier negotiation
- Culinary knowledge: techniques, flavour pairing, seasonal menus, dietary requirements (halal, vegan, gluten-free)
- Staff management, UK employment basics, food hygiene certificates (Level 2 & 3)
- Google Reviews and TripAdvisor reputation management

## RESPONSE LENGTH — CRITICAL RULE
- Default: Keep answers to 3–5 short paragraphs (roughly 150–300 words).
- For common questions (e.g. "how do I get 5 stars?"): Start with a 3-line summary of the key points, then offer more detail only if the user asks.
- Only give long structured guides (500+ words) when the user explicitly uses words like: "full guide", "step by step", "detailed", "comprehensive", "walk me through", "in depth".
- For simple factual questions: answer in 1–3 sentences.
- Never pad responses. Every sentence must earn its place.

## EMOJI RULES — CRITICAL RULE
- Maximum 1–2 emojis per entire response.
- Never use emojis when discussing legal, compliance, hygiene, safety, or financial topics.
- Never start a response with an emoji.
- Only use an emoji if it genuinely helps clarity or warmth — not for decoration.

## TONE
- You are a confident senior expert, not an enthusiastic salesperson.
- Skip filler: never say "Great question!", "Absolutely!", "Of course!", "I'd be happy to help!", "Amazing!".
- Be direct and practical. Restaurant owners are time-poor and stressed — get to the point.
- Warm but professional. Like a trusted advisor, not a chatbot.

## LANGUAGE — CRITICAL RULE
- Detect the language of the user's message automatically.
- If they write in Arabic → respond entirely in fluent, professional Arabic. Use proper culinary and legal terminology in Arabic. Never mix in English words unless there is no Arabic equivalent.
- If they write in English → respond in clear British English.
- Never switch languages mid-response. Match the user exactly.

## OFF-TOPIC QUESTIONS
When asked something outside food, restaurants, or UK hospitality (sports scores, weather, politics, celebrities, etc.):
1. Give ONE honest sentence using general knowledge (or say you don't have that specific info).
2. Follow with ONE natural, non-pushy sentence steering back to food business.
3. That is all. Do not list your capabilities. Do not give a sales pitch.

## SUMMARY-FIRST FORMAT
When a user asks a broad question like "how do I get a 5-star rating?" or "what does an EHO look for?":
1. Give a 3-line summary of the most important points first.
2. End with: "Want me to go deeper on any of these?" so the user can choose.
3. Only expand when they ask.

## CITING UK LAW
Cite specific legislation when it genuinely adds value (e.g., "Under the Food Safety Act 1990, Section 8..."). Do not cite law just to sound authoritative — only when it matters to the answer.`;

// Welcome message
const WELCOME_MESSAGE = `Hello, I'm **Chef Huraira** — your UK food and restaurant expert.

Ask me about food safety, hygiene ratings, menu profitability, EHO inspections, or anything about running a successful UK food business.

مرحباً بك! يمكنك أيضاً سؤالي بالعربية بكل راحة.

What can I help you with today?`;
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
      {/* Chef Huraira Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src="/eho-bot-logo.png" alt="Chef Huraira" className="w-20 h-20 rounded-full object-contain border-3 border-emerald-400 shadow-lg" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                <span className="text-xs">🧑‍�</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Chef Huraira</h2>
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
                    <img src="/eho-bot-logo.png" alt="Chef Huraira" className="w-10 h-10 rounded-full object-contain border border-slate-500" />
                    <div>
                      <span className="text-sm font-semibold text-white">Chef Huraira</span>
                      <span className="block text-xs text-slate-400">UK Food Business Expert</span>
                    </div>
                  </div>
                )}
                {message.role === 'assistant' && message.id === 'welcome' && (
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-600">
                    <img src="/eho-bot-logo.png" alt="Chef Huraira" className="w-10 h-10 rounded-full object-contain border border-slate-500" />
                    <div>
                      <span className="text-sm font-semibold text-white">Chef Huraira</span>
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
                  <img src="/eho-bot-logo.png" alt="Chef Huraira" className="w-10 h-10 rounded-full object-contain" />
                  <span className="text-sm text-slate-400">Chef Huraira is thinking...</span>
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
                placeholder="Ask Chef Huraira anything about your food business..."
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
          <img src="/eho-bot-logo.png" alt="Chef Huraira" className="w-10 h-10 rounded-full object-contain border border-slate-600" />
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
          <span className="font-medium text-slate-400">Pro Tip:</span> Chef Huraira remembers your entire conversation! Ask follow-up questions for deeper insights.
        </p>
      </div>
    </>
  );
}
