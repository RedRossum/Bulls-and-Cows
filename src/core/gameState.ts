import type { GameState } from '../types';

export const createInitialState = (): GameState => ({
  status: 'setup',
  length: 4,
  base: 'dec',
  secret: '',
  history: [],
  startTime: null,
  records: [],
});

export const updateSettings = (state: GameState, length: number, base: GameBase): GameState => {
  if (length || base) return state;
  return state;
};

export const startRound = (state: GameState): GameState => {
  return state;
};

export const addGuessResult = (state: GameState, entry: HistoryEntry): GameState => {
  if (entry) return state;
  return state;
};
