import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { Button } from '../components/Button';

export const Result: React.FC = () => {
  const navigate = useNavigate();
  const { gameStatus, player, highestRoundReached, resetGame, addToLeaderboard } = useGame();

  // Add to leaderboard exactly once when result page mounts
  useEffect(() => {
    if (player && (gameStatus === 'won' || gameStatus === 'lost')) {
        addToLeaderboard();
    }
  }, []); // Empty dependency array ensures it runs once on mount

  if (!player) {
      navigate('/');
      return null;
  }

  const isWin = gameStatus === 'won';
  const heading = isWin ? `Congratulations, ${player.name}!` : `Game Over, ${player.name}`;
  const subtext = isWin 
    ? "You have conquered the GoldMind Challenge!" 
    : "You fought bravely. Try again to reach the top.";

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg bg-deep/80 backdrop-blur-xl border border-gold/20 p-10 rounded-3xl shadow-2xl text-center mb-8">
        
        <div className="text-6xl mb-6">
            {isWin ? '🏆' : '😐'}
        </div>

        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            {heading}
        </h1>
        <p className="text-gray-400 mb-8 text-lg">
            {subtext}
        </p>

        <div className="bg-midnight/50 rounded-xl p-6 mb-8 space-y-4">
            <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Subject</span>
                <span className="text-white font-bold">{player.subject}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Highest Round</span>
                <span className="text-gold font-bold text-xl">{highestRoundReached} / 12</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className={`font-bold ${isWin ? 'text-correct' : 'text-wrong'}`}>
                    {isWin ? 'Completed' : 'Failed'}
                </span>
            </div>
        </div>

        {/* Certificate Preview Section (Only for winners) */}
        {isWin && (
          <div className="mb-8 animate-fade-in">
             <p className="text-gold text-sm uppercase tracking-widest font-bold mb-2">Certificate Preview</p>
             <div className="bg-white/90 p-1 rounded-lg shadow-[0_0_20px_rgba(245,197,66,0.2)] transform hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => navigate('/certificate')}>
                <div className="border-2 border-gold p-4 text-center">
                   <h3 className="text-deep font-serif font-bold text-lg mb-1">Certificate of Achievement</h3>
                   <p className="text-gray-800 text-xs italic">Presented to</p>
                   <p className="text-gold-dark font-bold text-lg">{player.name}</p>
                   <p className="text-gray-600 text-[10px] mt-1">for completing the GoldMind Challenge</p>
                </div>
             </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
            {isWin && (
                <Button onClick={() => navigate('/certificate')} className="animate-pulse-gold">
                    View & Download Certificate
                </Button>
            )}
            
            <Button 
                variant={isWin ? 'secondary' : 'primary'} 
                onClick={() => { resetGame(); navigate('/start'); }}
            >
                Play Again
            </Button>
            
            <Button variant="secondary" onClick={() => { resetGame(); navigate('/'); }}>
                Back to Home
            </Button>
        </div>
      </div>
    </div>
  );
};