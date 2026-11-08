import type { CreateDigitValidator } from '../types';

export const createDigitValidator: CreateDigitValidator = (base) => {
  const validators: Record<typeof base, RegExp> = {
    bin: /^[0-1]$/,
    oct: /^[0-7]$/,
    dec: /^[0-9]$/,
    hex: /^[0-9a-f]$/,
  };

  const regex = validators[base];

  return (char: string): boolean => {
    if (char.length !== 1) {
      return false;
    }

    return regex.test(char.toLowerCase());
  };
};
