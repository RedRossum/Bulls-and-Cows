import { describe, test, expect } from 'vitest';
import { createDigitValidator } from '../createDigitValidator';

describe('createDigitValidator', () => {
  test('должен корректно валидировать двоичную систему (bin)', () => {
    const isBinDigit = createDigitValidator('bin');
    expect(isBinDigit('0')).toBe(true);
    expect(isBinDigit('1')).toBe(true);
    expect(isBinDigit('2')).toBe(false);
    expect(isBinDigit('a')).toBe(false);
  });

  test('должен корректно валидировать восьмеричную систему (oct)', () => {
    const isOctDigit = createDigitValidator('oct');
    expect(isOctDigit('0')).toBe(true);
    expect(isOctDigit('7')).toBe(true);
    expect(isOctDigit('8')).toBe(false);
  });

  test('должен корректно валидировать десятичную систему (dec)', () => {
    const isDecDigit = createDigitValidator('dec');
    expect(isDecDigit('0')).toBe(true);
    expect(isDecDigit('9')).toBe(true);
    expect(isDecDigit('a')).toBe(false);
  });

  test('должен корректно валидировать шестнадцатеричную систему (hex) без учета регистра', () => {
    const isHexDigit = createDigitValidator('hex');
    expect(isHexDigit('0')).toBe(true);
    expect(isHexDigit('9')).toBe(true);
    expect(isHexDigit('a')).toBe(true);
    expect(isHexDigit('F')).toBe(true);
    expect(isHexDigit('g')).toBe(false);
  });
});
