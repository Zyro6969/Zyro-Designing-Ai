import React, { useState } from 'react';
import { LogoStyle, ColorPalette, GenerationRequest } from '../types';
import { Wand2, Loader2 } from 'lucide-react';

interface LogoFormProps {
  onGenerate: (data: GenerationRequest) => void;
  isLoading: boolean;
}

const LogoForm: React.FC<LogoFormProps> = ({ onGenerate, isLoading }) => {
  const [brandName, setBrandName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState<LogoStyle>(LogoStyle.MINIMALIST);
  const [colors, setColors] = useState<ColorPalette>(ColorPalette.MODERN_DARK);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !description) return;
    onGenerate({ brandName, tagline, description, style, colors });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Create Your Brand</h2>
        <p className="text-slate-400 text-sm">Tell our AI about your business to get started.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Brand Name</label>
          <input
            type="text"
            required
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="e.g. Zyro Logic"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Tagline (Optional)</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Future of Design"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Description</label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your business, values, and target audience..."
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Visual Style</label>
          <div className="relative">
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as LogoStyle)}
              className="w-full appearance-none bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              {Object.values(LogoStyle).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Color Palette</label>
          <div className="relative">
            <select
              value={colors}
              onChange={(e) => setColors(e.target.value as ColorPalette)}
              className="w-full appearance-none bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              {Object.values(ColorPalette).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/25 ${
          isLoading 
            ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transform hover:-translate-y-0.5'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating Identity...
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5" />
            Generate Logo
          </>
        )}
      </button>
    </form>
  );
};

export default LogoForm;
