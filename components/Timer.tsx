import React, { useEffect, useState } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive || duration === Infinity) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp, duration]);

  if (duration === Infinity) {
    return (
      <div className="flex items-center gap-2">
         <span className="text-2xl">∞</span>
         <span className="text-xs uppercase tracking-widest text-gold">No Limit</span>
      </div>
    );
  }

  const percentage = (timeLeft / duration) * 100;
  const isLow = timeLeft <= 5;

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {/* Background Circle */}
      <svg className="absolute w-full h-full transform -rotate-90">
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke={isLow ? '#EF4444' : '#F5C542'}
          strokeWidth="4"
          fill="none"
          strokeDasharray={175}
          strokeDashoffset={175 - (175 * percentage) / 100}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <span className={`text-xl font-bold font-heading ${isLow ? 'text-wrong animate-pulse' : 'text-white'}`}>
        {timeLeft}
      </span>
    </div>
  );
};