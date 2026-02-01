import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { QUESTIONS_DB, TIMER_RULES } from '../constants';
import { Question } from '../types';
import { Timer } from '../components/Timer';
import { Button } from '../components/Button';
import { LifelineButton } from '../components/Lifelines';
import { Modal } from '../components/Modal';
import { getAiHint } from '../services/geminiService';

const Confetti: React.FC = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex justify-center">
        {Array.from({ length: 50 }).map((_, i) => (
            <div 
                key={i} 
                className="absolute w-2 h-2 bg-gold rounded-full animate-confetti opacity-0"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    backgroundColor: ['#F5C542', '#EF4444', '#22C55E', '#3B82F6', '#FFFFFF'][Math.floor(Math.random() * 5)]
                }}
            />
        ))}
    </div>
);

export const Play: React.FC = () => {
  const navigate = useNavigate();
  const { 
    player, 
    currentRound, 
    lifelines, 
    score,
    useLifeline, 
    advanceRound, 
    failGame,
    completeGame 
  } = useGame();

  const [question, setQuestion] = useState<Question | null>(null);
  const [visibleOptions, setVisibleOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Modals
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('Thinking...');

  // Load question & Shuffle Options
  useEffect(() => {
    if (!player) {
      navigate('/');
      return;
    }
    const questions = QUESTIONS_DB[player.subject];
    // Safety check
    if (!questions || currentRound >= questions.length) {
      completeGame();
      navigate('/result');
      return;
    }
    const q = questions[currentRound];
    setQuestion(q);
    
    // Shuffle options
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    setVisibleOptions(shuffled);
    
    setSelectedOption(null);
    setAnswerStatus('idle');
    setShowCelebration(false);
  }, [currentRound, player, navigate]);

  // Handle Milestones Celebration
  useEffect(() => {
    // Milestones: Round 5 start (cleared 4), Round 10 start (cleared 9)
    if (currentRound === 4 || currentRound === 9) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [currentRound]);

  // Determine timer duration
  const getDuration = () => {
    const r = currentRound + 1;
    if (r <= 4) return TIMER_RULES.Q1_4;
    if (r <= 7) return TIMER_RULES.Q5_7;
    if (r <= 9) return TIMER_RULES.Q8_9;
    return TIMER_RULES.Q10_12;
  };

  const handleOptionClick = (option: string) => {
    if (answerStatus !== 'idle') return;
    setSelectedOption(option);
    
    if (option === question?.correctAnswer) {
      setAnswerStatus('correct');
      setTimeout(() => {
        if (currentRound === 11) { // 12th question
            completeGame();
            navigate('/result');
        } else {
            advanceRound();
        }
      }, 1500);
    } else {
      setAnswerStatus('wrong');
      setTimeout(() => {
        failGame();
        navigate('/result');
      }, 2000);
    }
  };

  const handleTimeUp = () => {
    if (answerStatus === 'idle') {
      failGame();
      navigate('/result');
    }
  };

  // Lifelines
  const handleFiftyFifty = () => {
    if (!question || !lifelines.fiftyFifty) return;
    
    const wrongOptions = visibleOptions.filter(o => o !== question.correctAnswer);
    if (wrongOptions.length < 2) return; 

    useLifeline('fiftyFifty');
    // Remove 2 wrong options randomly from visible set
    const toRemove = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    setVisibleOptions(prev => prev.filter(o => !toRemove.includes(o)));
  };

  const handleHint = () => {
    if (!lifelines.hint) return;
    useLifeline('hint');
    setHintModalOpen(true);
  };

  const handleAskAi = async () => {
    if (!question || !lifelines.askAi || !player) return;
    
    if (aiModalOpen) return;

    useLifeline('askAi');
    setAiModalOpen(true);
    setAiResponse("Connecting to AI...");
    
    const hint = await getAiHint(question.text, question.options, player.subject);
    setAiResponse(hint);
  };

  if (!question || !player) return null;

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 md:px-8 bg-game-gradient relative">
       {showCelebration && <Confetti />}

       {/* Top Bar */}
       <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-4">
            <div className="bg-deep border border-gold/20 px-4 py-2 rounded-full text-sm font-medium text-gold shadow-lg">
                Subject: <span className="text-white ml-1">{player.subject}</span>
            </div>
            <div className="bg-deep border border-gold/20 px-4 py-2 rounded-full text-sm font-medium text-gold shadow-lg">
                Score: <span className="text-white ml-1">{score} pts</span>
            </div>
          </div>
          
          <div className="text-2xl font-heading font-bold text-white tracking-widest">
            QUESTION <span className="text-gold text-3xl">{currentRound + 1}</span><span className="text-gray-500 text-lg">/12</span>
          </div>
          <div className="flex items-center gap-4">
             {/* Timer */}
             <Timer duration={getDuration()} onTimeUp={handleTimeUp} isActive={answerStatus === 'idle'} />
          </div>
       </div>

       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Game Area */}
          <div className="lg:col-span-3">
             {/* Question Card */}
             <div className="bg-deep/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl min-h-[200px] flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
                <h2 className="text-xl md:text-3xl font-bold leading-normal">{question.text}</h2>
             </div>

             {/* Options */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleOptions.map((option, idx) => {
                   let stateClass = "";
                   if (answerStatus === 'idle') {
                     stateClass = selectedOption === option ? 'bg-gold text-deep' : '';
                   } else if (answerStatus === 'correct') {
                     stateClass = option === question.correctAnswer ? 'bg-correct text-white border-correct' : 'opacity-40';
                   } else if (answerStatus === 'wrong') {
                     if (option === selectedOption) stateClass = 'bg-wrong text-white border-wrong';
                     else if (option === question.correctAnswer) stateClass = 'bg-correct text-white border-correct';
                     else stateClass = 'opacity-40';
                   }

                   return (
                      <Button 
                        key={idx} 
                        variant="option" 
                        onClick={() => handleOptionClick(option)}
                        className={`${stateClass} text-lg`}
                        disabled={answerStatus !== 'idle'}
                      >
                         <span className="text-gold font-bold mr-4 opacity-70">{String.fromCharCode(65 + idx)}.</span>
                         {option}
                      </Button>
                   );
                })}
             </div>
          </div>

          {/* Lifelines Sidebar */}
          <div className="lg:col-span-1">
             <div className="bg-midnight/50 border border-white/5 rounded-2xl p-6">
                <h3 className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-6 text-center">Lifelines</h3>
                {currentRound < 10 ? (
                    <div className="flex lg:flex-col gap-4 justify-center">
                        <LifelineButton 
                            type="50-50" 
                            isAvailable={lifelines.fiftyFifty} 
                            onClick={handleFiftyFifty} 
                        />
                        <LifelineButton 
                            type="Ask AI" 
                            isAvailable={lifelines.askAi} 
                            onClick={handleAskAi} 
                        />
                        <LifelineButton 
                            type="Hint" 
                            isAvailable={lifelines.hint} 
                            onClick={handleHint} 
                        />
                    </div>
                ) : (
                    <div className="text-center text-red-400 text-sm border border-red-900/50 bg-red-900/10 p-4 rounded-xl animate-pulse">
                        ⚠️ Lifelines disabled in high-stakes rounds!
                    </div>
                )}
             </div>
             
             {/* Progress Indicator */}
             <div className="mt-6 space-y-1">
                {Array.from({length: 12}).map((_, i) => {
                    const roundNum = 12 - i; // 12 down to 1
                    const isCurrent = roundNum === currentRound + 1;
                    const isPassed = roundNum <= currentRound;
                    
                    let points = 5;
                    if(roundNum >= 5) points = 10;
                    if(roundNum >= 10) points = 20;

                    return (
                        <div key={roundNum} className={`flex justify-between text-xs px-3 py-1 rounded transition-colors ${isCurrent ? 'bg-gold text-deep font-bold shadow-lg scale-105' : isPassed ? 'text-gray-500' : 'text-gray-300'}`}>
                             <span>{roundNum}</span>
                             <div className="flex gap-2">
                                <span>{roundNum >= 10 ? '👑 ' : ''}Level {roundNum}</span>
                                <span className={isCurrent ? 'text-deep' : 'text-gold'}>{points}pts</span>
                             </div>
                        </div>
                    )
                })}
             </div>
          </div>
       </div>

       {/* AI Modal */}
       <Modal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} title="Ask AI Assistant">
          <div className="flex flex-col items-center">
             <div className="text-4xl mb-4 animate-bounce">🤖</div>
             <p className="text-center text-lg italic leading-relaxed text-gold-light">
                "{aiResponse}"
             </p>
             <p className="mt-6 text-xs text-gray-500 text-center">
                AI can make mistakes. The final choice is yours.
             </p>
          </div>
       </Modal>

       {/* Hint Modal */}
       <Modal isOpen={hintModalOpen} onClose={() => setHintModalOpen(false)} title="Your Hint">
          <div className="flex flex-col items-center">
             <div className="text-4xl mb-4 animate-pulse">💡</div>
             <p className="text-center text-lg italic leading-relaxed text-gold-light">
                "{question.hint}"
             </p>
             <p className="mt-6 text-xs text-gray-500 text-center">
                Think carefully!
             </p>
          </div>
       </Modal>
    </div>
  );
};