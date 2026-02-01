export type Subject = 'General Knowledge' | 'Science' | 'History' | 'Technology';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string; // The correct option string for standard questions
  correctOrder?: string[]; // For FFF: the array of options in correct order
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
}

export interface Player {
  name: string;
  subject: Subject;
}

export interface GameState {
  player: Player | null;
  currentRound: number; // 0 to 11 (12 rounds)
  score: number;
  gameStatus: 'idle' | 'fff' | 'playing' | 'won' | 'lost';
  lifelines: {
    fiftyFifty: boolean; // true if available
    askAi: boolean;
    hint: boolean;
  };
  highestRoundReached: number;
  fffQualified: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  subject: Subject;
  status: string;
  date: string;
}