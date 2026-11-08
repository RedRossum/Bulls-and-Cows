export type GameBase = 'bin' | 'oct' | 'dec' | 'hex';
export type DigitValidator = (char: string) => boolean;
export type CreateDigitValidator = (base: GameBase) => DigitValidator;
