import React, { useState } from 'react';
import Header from './components/Header';
import LogoForm from './components/LogoForm';
import ResultDisplay from './components/ResultDisplay';
import { generateLogoImage } from './services/geminiService';
import { GenerationRequest, GeneratedLogo } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<GeneratedLogo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (request: GenerationRequest) => {
    setLoading(true);
    setError(null);
    try {
      const imageUrl = await generateLogoImage(request);
      
      const newLogo: GeneratedLogo = {
        id: crypto.randomUUID(),
        imageUrl,
        promptUsed: `Brand: ${request.brandName}, Style: ${request.style}, Desc: ${request.description}`,
        timestamp: Date.now()
      };
      
      setCurrentLogo(newLogo);
    } catch (err: any) {
      setError(err.message || "Something went wrong while generating the logo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#020617] to-[#020617] pointer-events-none"></div>
      
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 relative z-10">
        
        {/* Hero Text */}
        <div className="text-center mb-12 max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Design Logos in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">Seconds</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Professional branding powered by Gemini AI. Just describe your vision, and Zyro Designer will bring it to life.
          </p>
        </div>

        {error && (
          <div className="mb-8 max-w-4xl mx-auto bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-200">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-5 xl:col-span-4">
             <LogoForm onGenerate={handleGenerate} isLoading={loading} />
          </div>

          {/* Right Column: Display */}
          <div className="lg:col-span-7 xl:col-span-8">
             <ResultDisplay logo={currentLogo} isLoading={loading} />
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 mt-12 bg-slate-950 relative z-10">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Zyro Designer AI. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
