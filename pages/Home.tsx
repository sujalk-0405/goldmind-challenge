import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center overflow-hidden relative">
      
      {/* Global Background Ripples */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-gold/10 rounded-full animate-ripple-slow pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] border border-gold/5 rounded-full animate-ripple pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-32 h-32 border border-gold/20 rounded-full animate-ripple-delay-1 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 border border-gold/10 rounded-full animate-ripple-delay-2 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 md:py-20 text-center flex flex-col items-center relative z-10">
        <div className="relative mb-6 flex justify-center items-center">
            {/* Center Rings Animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border border-gold/30 rounded-full animate-ripple absolute"></div>
              <div className="w-64 h-64 border border-gold/20 rounded-full animate-ripple-delay-1 absolute"></div>
              <div className="w-64 h-64 border border-gold/10 rounded-full animate-ripple-delay-2 absolute"></div>
            </div>

            <div className="absolute inset-0 bg-gold blur-[60px] opacity-20 rounded-full w-full h-full animate-pulse-gold"></div>
            <h1 className="relative text-5xl md:text-7xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-light to-white drop-shadow-sm z-10">
            GoldMind Challenge
            </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-300 font-light mb-10 max-w-2xl relative z-10">
          Where Knowledge Turns Into <span className="text-gold font-serif italic font-bold">Gold</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16 relative z-10">
          <Link to="/start">
            <Button variant="primary" className="text-lg px-10 py-4 shadow-[0_0_30px_rgba(245,197,66,0.4)] hover:shadow-[0_0_50px_rgba(245,197,66,0.6)]">
              Start Challenge
            </Button>
          </Link>
          <Link to="/rules">
            <Button variant="secondary" className="text-lg px-10 py-4">
              How It Works
            </Button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left relative z-10 max-w-5xl">
          <FeatureCard 
            icon="🎯"
            title="12-Question Challenge"
            desc="Progressive difficulty levels testing your limits from basic facts to expert trivia."
          />
          <FeatureCard 
            icon="🧠"
            title="Choose Your Subject"
            desc="Play to your strengths in Technology, History, Science, or General Knowledge."
          />
          
          {/* Certificate Preview Card */}
          <div className="bg-deep/40 backdrop-blur border border-gold/10 p-6 rounded-2xl hover:border-gold/40 hover:bg-deep/60 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
             <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">🏆</div>
                <h3 className="text-xl font-bold text-white mb-2 font-heading">Earn a Certificate</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">Prove your intellect with a signed digital certificate.</p>
             </div>
             
             {/* Mini Certificate Preview */}
             <div className="absolute -bottom-8 -right-8 w-48 h-32 bg-white/10 backdrop-blur-md border border-gold/30 rotate-[-10deg] rounded-lg p-2 shadow-xl group-hover:rotate-0 group-hover:bottom-2 group-hover:right-2 transition-all duration-500">
                <div className="w-full h-full bg-white/90 rounded border border-gold p-2 flex flex-col items-center justify-center text-center">
                   <div className="text-[6px] text-deep font-bold uppercase tracking-widest border-b border-gold mb-1">Certificate</div>
                   <div className="text-[10px] text-gold-dark font-serif font-bold italic">John Doe</div>
                   <div className="text-[4px] text-gray-500 mt-1">Has successfully completed the challenge</div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-deep/40 backdrop-blur border border-gold/10 p-6 rounded-2xl hover:border-gold/40 hover:bg-deep/60 transition-all duration-300 group hover:-translate-y-1">
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2 font-heading">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);