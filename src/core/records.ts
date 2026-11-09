import type { GameRecord } from '../types';

export const formatSettingsBadge = (base: string, length: number): string => {
  return `${base.toUpperCase()}-${length}`;
};

export const addAndSortRecords = (
  currentRecords: GameRecord[],
  newRecord: GameRecord
): GameRecord[] => {
  const updatedRecords = [...currentRecords, newRecord];

  updatedRecords.sort((a, b) => {
    if (a.attempts !== b.attempts) {
      return a.attempts - b.attempts;
    }
    return a.time - b.time;
  });

  return updatedRecords.slice(0, 5);
};

export const loadRecordsFromStorage = (): GameRecord[] => {
  try {
    const data = localStorage.getItem('bulls_cows_high_scores');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveRecordsToStorage = (records: GameRecord[]): void => {
  try {
    localStorage.setItem('bulls_cows_high_scores', JSON.stringify(records));
  } catch (e) {
    console.error('Ошибка сохранения в localStorage:', e);
  }
};
