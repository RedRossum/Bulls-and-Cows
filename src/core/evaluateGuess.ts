import type { EvaluateGuess } from '../types';

export const evaluateGuess: EvaluateGuess = (secret, guess) => {
  const secretLower = secret.toLowerCase();
  const guessLower = guess.toLowerCase();

  const guessChars = guessLower.split('');

  const bulls = guessChars.filter((char, index) => char === secretLower[index]).length;

  const cows = guessChars.filter((char, index) => {
    const isPresentInSecret = secretLower.includes(char);
    const isNotAtSameIndex = char !== secretLower[index];

    return isPresentInSecret && isNotAtSameIndex;
  }).length;

  return { bulls, cows };
};
