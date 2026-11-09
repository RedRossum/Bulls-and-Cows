export type GameBase = 'bin' | 'oct' | 'dec' | 'hex';
export type DigitValidator = (char: string) => boolean;
export type CreateDigitValidator = (base: GameBase) => DigitValidator;

export type IsValidGuess = (guess: string, length: number, base: GameBase) => boolean;

export type RandomSource = () => number;

export type GenerateSecret = (length: number, base: GameBase, random?: RandomSource) => string;

export type GuessScore = {
  bulls: number;
  cows: number;
};

export type EvaluateGuess = (secret: string, guess: string) => GuessScore;

export type CountPossibleSecrets = (length: number, base: GameBase) => number;

export type GameStatus = 'setup' | 'playing' | 'won';

export interface HistoryEntry {
  guess: string;
  bulls: number;
  cows: number;
}

export interface GameRecord {
  length: number;
  base: GameBase;
  attempts: number;
  time: number;
  date: string;
}

export interface GameState {
  status: GameStatus;
  length: number;
  base: GameBase;
  secret: string;
  history: HistoryEntry[];
  startTime: number | null;
  records: GameRecord[];
}
