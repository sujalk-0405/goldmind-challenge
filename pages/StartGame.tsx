import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useGame } from '../context/GameContext';
import { SUBJECTS } from '../constants';
import { Subject } from '../types';

export const StartGame: React.FC = () => {
  const navigate = useNavigate();
  const { setPlayer, startGame } = useGame();
  
  const [name, setName] = useState('');
  const [subject, setSubject] = useState<Subject>(SUBJECTS[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    setPlayer({ name, subject });
    startGame();
    navigate('/fastest-finger');
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-deep/80 backdrop-blur-md border border-gold/20 p-8 rounded-3xl shadow-2xl animate-fade-in-up">
        <h2 className="text-3xl font-heading font-bold text-center text-white mb-2">Start Your Challenge</h2>
        <p className="text-center text-gray-400 mb-8">Enter your details to begin.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              className="w-full bg-midnight border border-gray-700 focus:border-gold rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gold transition-all"
              placeholder="e.g. John Doe"
            />
            {error && <p className="text-wrong text-xs mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Choose Subject</label>
            <div className="relative">
                <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as Subject)}
                    className="w-full bg-midnight border border-gray-700 focus:border-gold rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-1 focus:ring-gold transition-all cursor-pointer"
                >
                    {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gold">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <Button variant="primary" fullWidth type="submit">Begin</Button>
            <Button variant="secondary" fullWidth type="button" onClick={() => navigate('/')}>Back</Button>
          </div>
        </form>
      </div>
    </div>
  );
};