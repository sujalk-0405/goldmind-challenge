import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GameState, Player, LeaderboardEntry } from '../types';
import { LEADERBOARD_DATA } from '../constants';

interface GameContextType extends GameState {
  setPlayer: (player: Player) => void;
  startGame: () => void;
  passFFF: () => void;
  failGame: () => void;
  advanceRound: () => void;
  useLifeline: (lifeline: keyof GameState['lifelines']) => void;
  resetGame: () => void;
  completeGame: () => void;
  leaderboard: LeaderboardEntry[];
  addToLeaderboard: () => void;
}

const initialState: GameState = {
  player: null,
  currentRound: 0,
  score: 0,
  gameStatus: 'idle',
  highestRoundReached: 0,
  fffQualified: false,
  lifelines: {
    fiftyFifty: true,
    askAi: true,
    hint: true,
  },
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(initialState);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard from local storage or defaults on mount
  useEffect(() => {
    const stored = localStorage.getItem('gmc_leaderboard');
    if (stored) {
      setLeaderboard(JSON.parse(stored));
    } else {
      setLeaderboard(LEADERBOARD_DATA);
    }
  }, []);

  const setPlayer = (player: Player) => {
    setState((prev) => ({ ...prev, player }));
  };

  const startGame = () => {
    setState((prev) => ({
      ...initialState,
      player: prev.player, // Keep player info
      gameStatus: 'fff', // Go to Fastest Finger First
    }));
  };

  const passFFF = () => {
    setState((prev) => ({
      ...prev,
      gameStatus: 'playing',
      fffQualified: true,
      currentRound: 0,
      score: 0,
    }));
  };

  const failGame = () => {
    setState((prev) => ({ ...prev, gameStatus: 'lost' }));
  };

  const completeGame = () => {
    // Add points for the final question (Q12)
    setState((prev) => ({ 
      ...prev, 
      score: prev.score + 20,
      gameStatus: 'won', 
      highestRoundReached: 12 
    }));
  };

  const advanceRound = () => {
    setState((prev) => {
      // Calculate points based on the round JUST completed
      // Round 0-3 (Q1-4): 5 pts
      // Round 4-8 (Q5-9): 10 pts
      // Round 9-11 (Q10-12): 20 pts (Note: Q12 is handled in completeGame)
      
      let pointsToAdd = 0;
      if (prev.currentRound < 4) {
        pointsToAdd = 5;
      } else if (prev.currentRound < 9) {
        pointsToAdd = 10;
      } else {
        pointsToAdd = 20;
      }

      const nextRound = prev.currentRound + 1;
      return {
        ...prev,
        currentRound: nextRound,
        score: prev.score + pointsToAdd,
        highestRoundReached: nextRound,
      };
    });
  };

  const useLifeline = (lifeline: keyof GameState['lifelines']) => {
    setState((prev) => ({
      ...prev,
      lifelines: {
        ...prev.lifelines,
        [lifeline]: false,
      },
    }));
  };

  const resetGame = () => {
    setState(initialState);
  };

  const addToLeaderboard = () => {
    if (!state.player) return;

    const newEntry: LeaderboardEntry = {
      rank: 0, // Calculated below
      name: state.player.name,
      subject: state.player.subject,
      status: state.gameStatus === 'won' ? 'Completed' : `Reached Q${state.highestRoundReached}`,
      date: new Date().toISOString().split('T')[0],
    };

    setLeaderboard((prev) => {
      // Simple scoring for leaderboard based on status and calculated score could be added here
      // For now, we stick to the requested structure logic
      const getScoreVal = (status: string) => {
          if (status === 'Completed') return 1000; // High value for sorting
          const match = status.match(/Q(\d+)/);
          return match ? parseInt(match[1]) : 0;
      };

      const updatedList = [...prev, newEntry]
        .sort((a, b) => getScoreVal(b.status) - getScoreVal(a.status))
        .map((entry, index) => ({ ...entry, rank: index + 1 })); // Re-assign ranks

      // Keep top 20
      const sliced = updatedList.slice(0, 20);
      
      localStorage.setItem('gmc_leaderboard', JSON.stringify(sliced));
      return sliced;
    });
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        setPlayer,
        startGame,
        passFFF,
        failGame,
        advanceRound,
        useLifeline,
        resetGame,
        completeGame,
        leaderboard,
        addToLeaderboard
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};