export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, systemPrompt, plan = 'starter' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Get the latest user message to classify complexity
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    const messageText = (lastUserMessage?.content || '').toString();

    const isComplex = classifyComplexity(messageText);
    const modelChoice = selectModel(plan, isComplex);

    let reply;
    if (modelChoice.provider === 'gemini') {
      reply = await callGemini(modelChoice.model, systemPrompt, messages);
    } else {
      reply = await callAnthropic(modelChoice.model, systemPrompt, messages);
    }

    return res.json({
      reply,
      meta: {
        model: modelChoice.model,
        provider: modelChoice.provider,
        complexity: isComplex ? 'complex' : 'general',
        plan
      }
    });

  } catch (error) {
    console.error('Chat handler error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

// ====================================================================
// Model routing based on subscription plan and question complexity
// ====================================================================
function selectModel(plan, isComplex) {
  // ALL general questions → Gemini 2.5 Flash (cheap and fast for everyone)
  if (!isComplex) {
    return { provider: 'gemini', model: 'gemini-2.5-flash' };
  }

  // Complex questions are routed by plan tier
  switch ((plan || '').toLowerCase()) {
    case 'business':
      return { provider: 'anthropic', model: 'claude-sonnet-4-5-20250929' };
    case 'pro':
      return { provider: 'anthropic', model: 'claude-haiku-4-5-20251001' };
    case 'starter':
    default:
      return { provider: 'gemini', model: 'gemini-2.5-flash' };
  }
}

// ====================================================================
// Lightweight complexity classifier (no extra API call)
// ====================================================================
function classifyComplexity(text) {
  if (!text) return false;
  const lower = text.toLowerCase();

  const complexKeywordsEn = [
    'haccp', 'compliance', 'regulation', 'regulatory', 'legal', 'law',
    'license', 'licence', 'audit', 'inspection', 'allergen', 'allergens',
    "natasha's law", 'natasha law', 'hygiene rating', 'eho', 'food safety act',
    'food standards', 'fsa', 'sfbb', 'temperature log', 'cross-contamination',
    'cross contamination', 'risk assessment', 'incident report', 'liability',
    'insurance claim', 'detailed', 'comprehensive', 'full guide',
    'step by step', 'step-by-step', 'complete guide', 'in detail',
    'thoroughly', 'walk me through', 'explain in depth'
  ];

  const complexKeywordsAr = [
    'حساسية', 'تفتيش', 'تصريح', 'رخصة', 'قانون', 'تشريع',
    'تفصيلي', 'شامل', 'بالتفصيل', 'كامل', 'مفصل',
    'دليل', 'سلامة الغذاء', 'مخاطر', 'تأمين', 'مطابقة',
    'حادث', 'تقرير', 'إجراءات', 'تدقيق'
  ];

  for (const kw of complexKeywordsEn) {
    if (lower.includes(kw)) return true;
  }
  for (const kw of complexKeywordsAr) {
    if (text.includes(kw)) return true;
  }

  // Long, detailed questions are usually complex
  if (text.length > 200) return true;

  return false;
}

// ====================================================================
// Anthropic (Claude) API caller
// ====================================================================
async function callAnthropic(model, systemPrompt, messages) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system: systemPrompt || 'You are a helpful assistant.',
      messages
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Anthropic API request failed');
  }
  return data.content[0].text;
}

// ====================================================================
// Google Gemini API caller
// ====================================================================
async function callGemini(model, systemPrompt, messages) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  // Convert Anthropic message format to Gemini format
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const body = {
    contents,
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.7
    }
  };

  if (systemPrompt) {
    body.systemInstruction = { parts: [{ text: systemPrompt }] };
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Gemini API request failed');
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}