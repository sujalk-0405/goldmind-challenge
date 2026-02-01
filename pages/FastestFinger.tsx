import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { FFF_QUESTION } from '../constants';
import { Timer } from '../components/Timer';
import { Button } from '../components/Button';

export const FastestFinger: React.FC = () => {
  const navigate = useNavigate();
  const { passFFF, player, failGame } = useGame();
  
  // Track selected options in order
  const [selectedSequence, setSelectedSequence] = useState<string[]>([]);
  const [status, setStatus] = useState<'playing' | 'checking' | 'qualified' | 'failed'>('playing');
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle options on mount
    const options = [...FFF_QUESTION.options];
    setShuffledOptions(options.sort(() => Math.random() - 0.5));
  }, []);

  const handleTimeUp = () => {
    if (status === 'playing') {
      setStatus('failed');
      failGame();
    }
  };

  const handleSelect = (option: string) => {
    if (status !== 'playing') return;
    
    // If already selected, do nothing
    if (selectedSequence.includes(option)) return;

    const newSequence = [...selectedSequence, option];
    setSelectedSequence(newSequence);

    // If 4 items selected, check answer
    if (newSequence.length === 4) {
      setStatus('checking');
      setTimeout(() => {
        const correctOrder = FFF_QUESTION.correctOrder || [];
        const isCorrect = newSequence.every((val, index) => val === correctOrder[index]);

        if (isCorrect) {
          setStatus('qualified');
          passFFF();
        } else {
          setStatus('failed');
          failGame();
        }
      }, 1500);
    }
  };

  const handleReset = () => {
    if (status === 'playing') {
        setSelectedSequence([]);
    }
  };

  if (!player) {
      navigate('/');
      return null;
  }

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-4">
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full bg-gold/5 blur-[100px] pointer-events-none"></div>

      <div className="relative w-full max-w-2xl bg-deep/60 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
            <div className="bg-gold px-3 py-1 rounded-full text-deep font-bold text-xs uppercase tracking-wider shadow-glow">
                Fastest Finger First
            </div>
            {status === 'playing' && (
                <Timer duration={15} onTimeUp={handleTimeUp} isActive={true} />
            )}
        </div>

        {/* Question */}
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-relaxed">
            {FFF_QUESTION.text}
        </h2>
        <p className="text-gray-400 text-sm mb-8">Select options in the correct order.</p>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {shuffledOptions.map((option) => {
                const selectionIndex = selectedSequence.indexOf(option);
                const isSelected = selectionIndex !== -1;
                
                let stateClass = "";
                
                if (status === 'playing') {
                    stateClass = isSelected 
                        ? 'bg-gold text-deep border-gold scale-105 shadow-lg' 
                        : 'bg-midnight/50 border-white/10 hover:border-gold hover:bg-deep text-white';
                } else if (status === 'checking') {
                    stateClass = isSelected ? 'bg-gold text-deep border-gold scale-105' : 'opacity-50';
                } else if (status === 'qualified') {
                    stateClass = 'bg-correct text-white border-correct';
                } else if (status === 'failed') {
                    stateClass = 'bg-wrong text-white border-wrong';
                }

                return (
                    <button
                        key={option}
                        onClick={() => handleSelect(option)}
                        disabled={status !== 'playing' || isSelected}
                        className={`
                            relative w-full p-4 rounded-xl text-left font-medium transition-all duration-300 border flex justify-between items-center
                            ${stateClass}
                        `}
                    >
                        <span>{option}</span>
                        {isSelected && (
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-deep text-gold font-bold text-xs border border-gold">
                                {selectionIndex + 1}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>

        {/* Status Messages */}
        <div className="h-16 flex items-center justify-center">
            {status === 'playing' && selectedSequence.length > 0 && selectedSequence.length < 4 && (
                 <button onClick={handleReset} className="text-xs text-gray-400 hover:text-white underline uppercase tracking-widest">
                    Reset Selection
                 </button>
            )}

            {status === 'checking' && <p className="text-gold animate-pulse text-lg">Checking order...</p>}
            
            {status === 'qualified' && (
                <div className="text-center animate-fade-in-up">
                    <p className="text-correct font-bold text-xl mb-2">Qualified! Welcome, {player.name}.</p>
                    <Button onClick={() => navigate('/play')}>Start Round 1</Button>
                </div>
            )}

            {status === 'failed' && (
                <div className="text-center animate-fade-in-up">
                    <p className="text-wrong font-bold text-xl mb-2">Incorrect order. You did not qualify.</p>
                    <Button variant="secondary" onClick={() => navigate('/start')}>Try Again</Button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};