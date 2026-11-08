import type { IsValidGuess } from '../types';
import { createDigitValidator } from './createDigitValidator';

export const isValidGuess: IsValidGuess = (guess, length, base) => {
  if (guess.length !== length) {
    return false;
  }

  const chars = guess.split('');

  const isCorrectDigit = createDigitValidator(base);

  const allCharsValid = chars.every((char) => isCorrectDigit(char));
  if (!allCharsValid) {
    return false;
  }

  const lowerCasedChars = chars.map((char) => char.toLowerCase());

  const uniqueChars = new Set(lowerCasedChars);

  return uniqueChars.size === length;
};
