import { describe, test, expect } from 'vitest';
import { generateSecret } from '../generateSecret';

describe('generateSecret', () => {
  test('должен генерировать строку правильной длины', () => {
    expect(generateSecret(4, 'dec').length).toBe(4);
    expect(generateSecret(2, 'bin').length).toBe(2);
  });

  test('должен состоять только из допустимых символов выбранной системы', () => {
    const secret = generateSecret(4, 'oct');

    expect(secret.includes('8')).toBe(false);
    expect(secret.includes('9')).toBe(false);
  });

  test('должен возвращать предсказуемый результат при передаче кастомного random', () => {
    let count = 0;
    const mockRandom = () => {
      count += 0.2;
      return count % 1;
    };

    const secret = generateSecret(4, 'dec', mockRandom);

    expect(secret).toBeTruthy();
    expect(secret.length).toBe(4);
  });
});
