import type { EvaluateGuess } from '../types';

export const evaluateGuess: EvaluateGuess = (secret, guess) => {
  if (!secret || !guess) {
    return { bulls: 0, cows: 0 };
  }

  return { bulls: 0, cows: 0 };
};
