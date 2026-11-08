import type { GenerateSecret } from '../types';

export const generateSecret: GenerateSecret = (length, base, random = Math.random) => {
  if (!length || !base || !random) {
    return '';
  }
  return '';
};
