import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-deep via-midnight to-deep/90 backdrop-blur-md border-b border-white/10 shadow-lg h-16 md:h-20 flex items-center">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex flex-col group">
          <span className="text-2xl md:text-3xl font-heading font-bold text-gold group-hover:text-white transition-colors">GMC</span>
          <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest hidden md:block">GoldMind Challenge</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium hover:text-gold transition-colors ${location.pathname === '/' ? 'text-gold' : 'text-gray-300'}`}>Home</Link>
          <Link to="/rules" className={`text-sm font-medium hover:text-gold transition-colors ${location.pathname === '/rules' ? 'text-gold' : 'text-gray-300'}`}>How to Play</Link>
          <Link to="/leaderboard" className={`text-sm font-medium hover:text-gold transition-colors ${location.pathname === '/leaderboard' ? 'text-gold' : 'text-gray-300'}`}>Leaderboard</Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
           <Link to="/start">
            <Button variant="primary" className="py-2 px-6 text-sm">Play Now</Button>
           </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-midnight border-b border-white/10 p-4 md:hidden flex flex-col gap-4 shadow-2xl animate-fade-in">
           <Link to="/" className="text-white hover:text-gold" onClick={() => setIsMenuOpen(false)}>Home</Link>
           <Link to="/rules" className="text-white hover:text-gold" onClick={() => setIsMenuOpen(false)}>How to Play</Link>
           <Link to="/leaderboard" className="text-white hover:text-gold" onClick={() => setIsMenuOpen(false)}>Leaderboard</Link>
           <Link to="/start" onClick={() => setIsMenuOpen(false)}>
             <Button variant="primary" fullWidth className="py-2">Play Now</Button>
           </Link>
        </div>
      )}
    </header>
  );
};