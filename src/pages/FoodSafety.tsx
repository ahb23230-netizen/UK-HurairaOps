import { useState, useEffect, useRef } from 'react';

interface TemperatureLog {
  id: string;
  food_item: string;
  temperature: number;
  fridge_or_freezer: string;
  logged_at: string;
  is_compliant: boolean;
}

export default function FoodSafety() {
  const [logs, setLogs] = useState<TemperatureLog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ food_item: '', temperature: '', fridge_or_freezer: 'fridge' });
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceSupported(true);
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'ar-SA';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceMessage(transcript);
        parseVoiceCommand(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setVoiceMessage('');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startVoiceInput = () => {
    if (recognitionRef.current) {
      setVoiceMessage('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const parseVoiceCommand = (transcript: string) => {
    const text = transcript.toLowerCase();

    // Parse temperature
    const tempMatch = text.match(/(\d+\.?\d*)/);
    const temperature = tempMatch ? tempMatch[1] : '';

    // Parse storage type (fridge or freezer)
    let storageType = 'fridge';
    if (text.includes('فريزر') || text.includes('تجميد') || text.includes('فريزر') || text.includes('freezer')) {
      storageType = 'freezer';
    }

    // Parse food item - extract words before temperature mention
    let foodItem = '';
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (words[i].match(/\d+\.?\d*/)) break;
      if (!['درجة', 'الحرارة', 'سجل', 'تسجيل', 'ل', 'في', 'من', 'إلى', 'و', 'ال', 'حرف', 'صوت'].includes(words[i])) {
        foodItem += (foodItem ? ' ' : '') + words[i];
      }
    }

    // Clean food item
    foodItem = foodItem.trim();
    if (!foodItem) {
      foodItem = 'Unknown Item';
    }

    setFormData({
      food_item: foodItem,
      temperature: temperature,
      fridge_or_freezer: storageType
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const temp = parseFloat(formData.temperature);
    const isCompliant = formData.fridge_or_freezer === 'fridge' ? temp <= 5 && temp >= 0 : temp <= -18;
    setLogs([...logs, {
      id: Date.now().toString(),
      food_item: formData.food_item,
      temperature: temp,
      fridge_or_freezer: formData.fridge_or_freezer,
      logged_at: new Date().toISOString().slice(0, 16).replace('T', ' '),
      is_compliant: isCompliant
    }]);
    setFormData({ food_item: '', temperature: '', fridge_or_freezer: 'fridge' });
    setShowForm(false);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div />
        <div className="flex gap-3">
          {voiceSupported && (
            <button onClick={startVoiceInput} disabled={isListening} className={`${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-green-600 hover:bg-green-700'} text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              {isListening ? 'Listening...' : 'Voice Input'}
            </button>
          )}
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Log Temperature
          </button>
        </div>
      </div>

      {voiceMessage && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Voice Recognized:</p>
                <p className="text-green-700">{voiceMessage}</p>
                {formData.food_item && (
                  <p className="text-sm text-green-600 mt-1">
                    Parsed: {formData.food_item} | {formData.temperature}°C | {formData.fridge_or_freezer === 'fridge' ? 'ثلاجة' : 'فريزر'}
                  </p>
                )}
              </div>
            </div>
            <button onClick={() => { setVoiceMessage(''); setFormData({ food_item: '', temperature: '', fridge_or_freezer: 'fridge' }); }} className="text-green-600 hover:text-green-800">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {isListening && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">Listening...</p>
              <p className="text-red-700">Speak now - e.g., "سجل درجة حرارة الدجاج 4"</p>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New Temperature Log</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Food Item</label>
              <input type="text" value={formData.food_item} onChange={e => setFormData({...formData, food_item: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="e.g., Chicken" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°C)</label>
              <input type="number" step="0.1" value={formData.temperature} onChange={e => setFormData({...formData, temperature: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="e.g., 4.5" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Storage Type</label>
              <select value={formData.fridge_or_freezer} onChange={e => setFormData({...formData, fridge_or_freezer: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl">
                <option value="fridge">Fridge (0-5°C)</option>
                <option value="freezer">Freezer (-18°C or below)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">Save Log</button>
            </div>
          </form>
        </div>
      )}

      {logs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944v11.056a8 1 1 0 11-2 0v-1.944a11.955 11.955 0 01-5.618-4.132z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Temperature Logs Yet</h3>
          <p className="text-gray-500 mb-6">Start logging your food temperatures to maintain compliance</p>
          <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
            Log Your First Temperature
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Food Item</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Temperature</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Storage</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Logged At</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 text-gray-900">{log.food_item}</td>
                  <td className="px-6 py-4 text-gray-900">{log.temperature}°C</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.fridge_or_freezer === 'fridge' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                      {log.fridge_or_freezer}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{log.logged_at}</td>
                  <td className="px-6 py-4">
                    {log.is_compliant ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Compliant</span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Non-Compliant</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}