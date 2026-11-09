import type { GameState, GameBase, HistoryEntry } from '../types';
import { generateSecret } from './generateSecret';
import { loadRecordsFromStorage } from './records';

export const createInitialState = (): GameState => ({
  status: 'setup',
  length: 4,
  base: 'dec',
  secret: '',
  history: [],
  startTime: null,
  records: loadRecordsFromStorage(),
});

export const updateSettings = (state: GameState, length: number, base: GameBase): GameState => ({
  ...state,
  length,
  base,
});

export const startRound = (state: GameState): GameState => ({
  ...state,
  status: 'playing',
  secret: generateSecret(state.length, state.base),
  history: [],
  startTime: Date.now(),
});

export const addGuessResult = (state: GameState, entry: HistoryEntry): GameState => {
  const isWon = entry.bulls === state.length;

  return {
    ...state,
    status: isWon ? 'won' : state.status,
    history: [...state.history, entry],
  };
};
