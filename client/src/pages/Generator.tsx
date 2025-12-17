import { useState } from 'react';
import { Send, Copy, RefreshCw, Check, Sparkles, ChevronDown } from 'lucide-react';
import { emailService } from '../services/api';

const Generator = () => {
  const [loading, setLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string, body: string } | null>(null);
  const [formData, setFormData] = useState({
    audience: '',
    product: '',
    valueProps: '',
    tone: 'Professional',
    length: 'Medium'
  });
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await emailService.generate(formData);
      setGeneratedEmail(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to generate. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedEmail) return;
    const text = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-6rem)] flex flex-col lg:flex-row gap-8">

      {/* Input Side */}
      <div className="w-full lg:w-5/12 overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Sparkles className="text-blue-600" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Generate Email</h2>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Target Audience</label>
              <input
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="e.g. Dentists in New York"
                value={formData.audience}
                onChange={e => setFormData({ ...formData, audience: e.target.value })}
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Product/Service</label>
              <input
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="e.g. SEO Services"
                value={formData.product}
                onChange={e => setFormData({ ...formData, product: e.target.value })}
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Value Proposition</label>
              <textarea
                rows={4}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 resize-none"
                placeholder="e.g. Get more patients, rank higher on Google..."
                value={formData.valueProps}
                onChange={e => setFormData({ ...formData, valueProps: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Tone</label>
                <div className="relative">
                  <select
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                    value={formData.tone}
                    onChange={e => setFormData({ ...formData, tone: e.target.value })}
                  >
                    <option>Professional</option>
                    <option>Casual</option>
                    <option>Persuasive</option>
                    <option>Enthusiastic</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Length</label>
                <div className="relative">
                  <select
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                    value={formData.length}
                    onChange={e => setFormData({ ...formData, length: e.target.value })}
                  >
                    <option>Short</option>
                    <option>Medium</option>
                    <option>Long</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 font-bold text-lg flex items-center justify-center gap-2 mt-4 transition-all shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
              {loading ? 'Crafting Magic...' : 'Generate Email'}
            </button>
          </form>
        </div>
      </div>

      {/* Preview Side */}
      <div className="w-full lg:w-7/12 flex flex-col h-full bg-white rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/50 overflow-hidden relative">
        <div className="p-6 border-b border-slate-100 bg-white/50 backdrop-blur-sm flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
            </div>
            <span className="font-semibold text-slate-600">Preview</span>
          </div>

          {generatedEmail && (
            <button
              onClick={copyToClipboard}
              className={`text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-full transition-all ${copied
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          )}
        </div>

        <div className="p-8 flex-1 overflow-y-auto bg-slate-50/50 relative">
          {/* Background design element */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          </div>

          {generatedEmail ? (
            <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-500">
              <div className="mb-8 pb-6 border-b border-slate-100">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Subject</div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">{generatedEmail.subject}</h1>
              </div>
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                  {generatedEmail.body}
                </div>
              </div>
              <div className="mt-12 pt-6 border-t border-slate-50 flex items-center gap-3 opacity-60">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div className="h-2.5 w-32 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center text-slate-400 p-8">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Send size={40} className="text-blue-200 ml-1 mt-1" />
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">Ready to create?</h3>
              <p className="text-slate-400 text-center max-w-xs">Fill out the details on the left and watch your personalized cold email appear here.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Generator;
