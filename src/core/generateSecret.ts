import type { GenerateSecret, GameBase } from '../types';

const ALPHABETS: Record<GameBase, string[]> = {
  bin: ['0', '1'],
  oct: ['0', '1', '2', '3', '4', '5', '6', '7'],
  dec: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  hex: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
};

export const generateSecret: GenerateSecret = (length, base, random = Math.random) => {
  const alphabet = ALPHABETS[base];

  const generate = (acc: string[]): string[] => {
    if (acc.length === length) {
      return acc;
    }

    const randomIndex = Math.floor(random() * alphabet.length);
    const candidate = alphabet[randomIndex] as string;

    const nextAcc = acc.includes(candidate) ? acc : [...acc, candidate];

    return generate(nextAcc);
  };

  return generate([]).join('');
};
