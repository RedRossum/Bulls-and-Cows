import type { CountPossibleSecrets, GameBase } from '../types';

const BASE_SIZES: Record<GameBase, number> = {
  bin: 2,
  oct: 8,
  dec: 10,
  hex: 16,
};

const cache: Record<string, number> = {};

export const countPossibleSecrets: CountPossibleSecrets = (length, base) => {
  const baseSize = BASE_SIZES[base];

  const cacheKey = `${length}-${base}`;

  if (cacheKey in cache) {
    return cache[cacheKey] as number;
  }

  const calculate = (l: number, bSize: number): number => {
    if (l === 0) {
      return 1;
    }

    if (l > bSize || bSize <= 0) {
      return 0;
    }

    return bSize * calculate(l - 1, bSize - 1);
  };

  const result = calculate(length, baseSize);

  cache[cacheKey] = result;

  return result;
};
