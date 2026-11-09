import { describe, test, expect } from 'vitest';
import { createInitialState, updateSettings, startRound, addGuessResult } from '../gameState';

describe('Модуль управления состоянием игры (gameState)', () => {
  test('createInitialState должен возвращать корректное стартовое состояние', () => {
    const state = createInitialState();
    expect(state.status).toBe('setup');
    expect(state.length).toBe(4);
    expect(state.base).toBe('dec');
    expect(state.history).toEqual([]);
    expect(state.secret).toBe('');
  });

  test('updateSettings должен иммутабельно обновлять настройки', () => {
    const initialState = createInitialState();
    const newState = updateSettings(initialState, 2, 'bin');

    expect(newState.length).toBe(2);
    expect(newState.base).toBe('bin');

    expect(initialState.length).toBe(4);
    expect(initialState.base).toBe('dec');
    expect(initialState).not.toBe(newState);
  });

  test('startRound должен переводить игру в режим playing и генерировать секрет', () => {
    const initialState = createInitialState();
    const newState = startRound(initialState);

    expect(newState.status).toBe('playing');
    expect(newState.secret.length).toBe(initialState.length);
    expect(newState.startTime).not.toBeNull();
    expect(newState.history).toEqual([]);
  });

  test('addGuessResult должен иммутабельно добавлять попытку и переводить в won при успехе', () => {
    const state1 = startRound(createInitialState());
    const entry1 = { guess: '1234', bulls: 1, cows: 2 };
    const state2 = addGuessResult(state1, entry1);

    expect(state2.history.length).toBe(1);
    expect(state2.history[0]).toEqual(entry1);
    expect(state2.status).toBe('playing');
    expect(state1.history.length).toBe(0);

    const entry2 = { guess: state2.secret, bulls: state2.length, cows: 0 };
    const state3 = addGuessResult(state2, entry2);

    expect(state3.status).toBe('won');
    expect(state3.history.length).toBe(2);
  });
});
