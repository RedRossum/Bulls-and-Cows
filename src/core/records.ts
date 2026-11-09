import type { GameRecord, GameBase } from '../types';

export const formatSettingsBadge = (base: GameBase, length: number): string => {
  return `${base.toUpperCase()}-${length}`;
};

export const addAndSortRecords = (
  currentRecords: GameRecord[],
  newRecord: GameRecord
): GameRecord[] => {
  if (currentRecords || newRecord) return [];
  return [];
};
