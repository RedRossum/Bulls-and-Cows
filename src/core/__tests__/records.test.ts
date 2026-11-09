import { describe, test, expect } from 'vitest';
import { addAndSortRecords } from '../records';
import type { GameRecord } from '../../types';

describe('Модуль таблицы рекордов (records)', () => {
  const mockRecord = (attempts: number, time: number): GameRecord => ({
    length: 4,
    base: 'dec',
    attempts,
    time,
    date: '2026-11-09',
  });

  test('должен правильно сортировать рекорды (сначала попытки, затем время)', () => {
    const existing: GameRecord[] = [mockRecord(5, 30), mockRecord(3, 40)];

    const newRec = mockRecord(3, 20);
    const result = addAndSortRecords(existing, newRec);

    expect(result.length).toBe(3);
    expect(result[0].time).toBe(20);
    expect(result[1].time).toBe(40);
    expect(result[2].attempts).toBe(5);
  });
  test('должен ограничивать список рекордов топ-5 результатами', () => {
    const existing = [
      mockRecord(1, 10),
      mockRecord(2, 10),
      mockRecord(3, 10),
      mockRecord(4, 10),
      mockRecord(5, 10),
    ];

    const worstRec = mockRecord(6, 10);
    const result = addAndSortRecords(existing, worstRec);

    expect(result.length).toBe(5);
    expect(result.map((r) => r.attempts)).not.toContain(6);
  });
});
