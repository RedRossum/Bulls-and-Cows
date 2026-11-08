import type { CreateDigitValidator } from '../types';

export const createDigitValidator: CreateDigitValidator = (base) => {
  if (!base) {
    return () => false;
  }

  return (char) => {
    if (!char) {
      return false;
    }

    return false;
  };
};
