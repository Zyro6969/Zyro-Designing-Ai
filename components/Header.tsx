import React from 'react';
import { Hexagon, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Hexagon className="w-8 h-8 text-indigo-500 fill-indigo-500/20" />
            <Sparkles className="w-4 h-4 text-pink-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Zyro Designer AI
          </span>
        </div>
        
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Showcase</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm border border-white/5">
          Get Pro
        </button>
      </div>
    </header>
  );
};

export default Header;
