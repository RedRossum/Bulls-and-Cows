import { describe, test, expect } from 'vitest';
import { countPossibleSecrets } from '../countPossibleSecrets';

describe('countPossibleSecrets', () => {
  test('должен возвращать правильное количество для базовых и крайних случаев', () => {
    expect(countPossibleSecrets(0, 'dec')).toBe(1);
    expect(countPossibleSecrets(2, 'bin')).toBe(2);
  });

  test('должен корректно считать перестановки для десятичной системы (dec)', () => {
    expect(countPossibleSecrets(1, 'dec')).toBe(10);
    expect(countPossibleSecrets(3, 'dec')).toBe(720);
    expect(countPossibleSecrets(4, 'dec')).toBe(5040);
  });

  test('должен корректно считать перестановки для шестнадцатеричной системы (hex)', () => {
    expect(countPossibleSecrets(4, 'hex')).toBe(43680);
  });
});
