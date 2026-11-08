import { describe, test, expect } from 'vitest';
import { isValidGuess } from '../isValidGuess';

describe('isValidGuess', () => {
  test('должен возвращать true для полностью корректной попытки', () => {
    expect(isValidGuess('1234', 4, 'dec')).toBe(true);
    expect(isValidGuess('10', 2, 'bin')).toBe(true);
    expect(isValidGuess('abcdef', 6, 'hex')).toBe(true);
  });

  test('должен возвращать false, если длина не совпадает с заданной', () => {
    expect(isValidGuess('123', 4, 'dec')).toBe(false);
    expect(isValidGuess('12345', 4, 'dec')).toBe(false);
  });

  test('должен возвращать false, если используются недопустимые символы для системы счисления', () => {
    expect(isValidGuess('123a', 4, 'dec')).toBe(false);
    expect(isValidGuess('102', 3, 'bin')).toBe(false);
    expect(isValidGuess('89', 2, 'oct')).toBe(false);
  });

  test('должен возвращать false, если символы повторяются', () => {
    expect(isValidGuess('1123', 4, 'dec')).toBe(false);
    expect(isValidGuess('1232', 4, 'dec')).toBe(false);
  });

  test('должен учитывать регистр символов как повтор в шестнадцатеричной системе (hex)', () => {
    expect(isValidGuess('aA34', 4, 'hex')).toBe(false);
  });
});
