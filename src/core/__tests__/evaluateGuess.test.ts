import { describe, test, expect } from 'vitest';
import { evaluateGuess } from '../evaluateGuess';

describe('evaluateGuess', () => {
  test('должен возвращать 0 быков и 0 коров, если совпадений нет вообще', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
  });

  test('должен корректно считать только быков (цифры на своих местах)', () => {
    expect(evaluateGuess('1234', '1278')).toEqual({ bulls: 2, cows: 0 });
    expect(evaluateGuess('1234', '1539')).toEqual({ bulls: 2, cows: 0 });
  });

  test('должен корректно считать только коров (цифры угаданы, но места не те)', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
    expect(evaluateGuess('1234', '5126')).toEqual({ bulls: 0, cows: 2 });
  });

  test('должен одновременно и правильно считать и быков, и коров', () => {
    expect(evaluateGuess('1234', '1432')).toEqual({ bulls: 2, cows: 2 });
    expect(evaluateGuess('1234', '4271')).toEqual({ bulls: 1, cows: 2 });
  });

  test('должен возвращать максимум быков при полном угадывании', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
  });

  test('должен работать без учета регистра символов для шестнадцатеричной системы (hex)', () => {
    expect(evaluateGuess('a1b2', 'A12B')).toEqual({ bulls: 2, cows: 2 });
  });
});
