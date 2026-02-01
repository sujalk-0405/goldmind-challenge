import React from 'react';

interface LifelineProps {
  type: '50-50' | 'Ask AI' | 'Hint';
  isAvailable: boolean;
  onClick: () => void;
}

export const LifelineButton: React.FC<LifelineProps> = ({ type, isAvailable, onClick }) => {
  // Icons using simple emojis for this code generation, ideally would be SVGs
  const icons = {
    '50-50': '⚖️',
    'Ask AI': '🤖',
    'Hint': '💡'
  };

  return (
    <button
      onClick={onClick}
      disabled={!isAvailable}
      className={`
        flex flex-col items-center justify-center gap-1 p-3 rounded-xl border transition-all duration-300
        ${isAvailable 
          ? 'bg-deep/50 border-gold text-white hover:bg-gold hover:text-deep hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(245,197,66,0.3)]' 
          : 'bg-gray-900 border-gray-700 text-gray-600 cursor-not-allowed opacity-50 grayscale'}
      `}
    >
      <span className="text-2xl">{icons[type]}</span>
      <span className="text-[10px] font-bold uppercase tracking-wider">{type}</span>
    </button>
  );
};