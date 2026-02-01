import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { TIMER_RULES } from '../constants';

export const Rules: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-center mb-12 text-gold">Game Rules</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
                 {/* Steps */}
                <RuleStep number={1} title="Fastest Finger First" desc="Qualify for the main game by answering a rapid-fire question correctly in under 15 seconds." />
                <RuleStep number={2} title="12 Progressive Rounds" desc="Answer 12 questions of increasing difficulty in your chosen subject." />
                <RuleStep number={3} title="Use Lifelines" desc="Stuck? Use 50-50, Ask AI, or Hint. Available only until Question 10." />
                <RuleStep number={4} title="Claim Your Gold" desc="Complete all rounds to generate your personalized Certificate of Achievement." />
            </div>

            <div className="space-y-6">
                <div className="bg-deep/50 border border-gold/20 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">⏳</span> Timer Rules
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex justify-between border-b border-white/5 pb-2">
                            <span>Questions 1 - 4</span>
                            <span className="text-gold font-bold">{TIMER_RULES.Q1_4} seconds</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-2">
                            <span>Questions 5 - 7</span>
                            <span className="text-gold font-bold">{TIMER_RULES.Q5_7} seconds</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-2">
                            <span>Questions 8 - 9</span>
                            <span className="text-gold font-bold">{TIMER_RULES.Q8_9} seconds</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Questions 10 - 12</span>
                            <span className="text-gold font-bold">Unlimited</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="text-center">
            <Link to="/start">
                <Button className="px-12 py-4 text-lg">I'm Ready</Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

const RuleStep: React.FC<{ number: number, title: string, desc: string }> = ({ number, title, desc }) => (
    <div className="flex gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-deep font-bold flex items-center justify-center text-lg">
            {number}
        </div>
        <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-gray-400 text-sm">{desc}</p>
        </div>
    </div>
);