import type { GameState } from '../types';
import { createDigitValidator } from '../core/createDigitValidator';
import { isValidGuess } from '../core/isValidGuess';
import { evaluateGuess } from '../core/evaluateGuess';
import { addGuessResult, createInitialState } from '../core/gameState';

export const renderPlayingScreen = (
  state: GameState,
  onStateChange: (newState: GameState) => void
): HTMLElement => {
  const container = document.createElement('div');
  container.className = 'playing-screen';

  const title = document.createElement('h2');
  title.textContent = `🎮 Раунд: ${state.base.toUpperCase()} (длина ${state.length})`;
  container.appendChild(title);

  const inputGroup = document.createElement('div');
  inputGroup.className = 'input-group';

  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = state.length; // Ограничиваем длину ввода на уровне HTML
  input.placeholder = `Введи ${state.length} уник. цифр`;

  const isCharAllowed = createDigitValidator(state.base);

  input.addEventListener('keypress', (event: KeyboardEvent) => {
    if (event.key.length !== 1) return;

    if (!isCharAllowed(event.key)) {
      event.preventDefault();
    }
  });

  inputGroup.appendChild(input);

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Проверить';

  const errorText = document.createElement('p');
  errorText.className = 'error-message';
  errorText.style.color = 'red';

  submitButton.addEventListener('click', () => {
    const guessValue = input.value;

    if (!isValidGuess(guessValue, state.length, state.base)) {
      errorText.textContent = `⚠️ Ошибка! Нужно ровно ${state.length} уникальных символов для ${state.base.toUpperCase()}.`;
      return;
    }

    errorText.textContent = '';
    const score = evaluateGuess(state.secret, guessValue);

    const nextState = addGuessResult(state, {
      guess: guessValue,
      bulls: score.bulls,
      cows: score.cows,
    });

    onStateChange(nextState);
  });

  inputGroup.appendChild(submitButton);
  container.appendChild(inputGroup);
  container.appendChild(errorText);

  const abortButton = document.createElement('button');
  abortButton.textContent = '🏳️ Сдаться / К настройкам';
  abortButton.className = 'btn-abort';
  abortButton.style.marginTop = '10px';
  abortButton.style.display = 'block';

  abortButton.addEventListener('click', () => {
    const resetState = createInitialState();
    resetState.records = state.records;
    onStateChange(resetState);
  });
  container.appendChild(abortButton);

  if (state.history.length > 0) {
    const historyTitle = document.createElement('h3');
    historyTitle.textContent = '📜 История попыток:';
    container.appendChild(historyTitle);

    const table = document.createElement('table');
    table.className = 'history-table';

    const headerRow = document.createElement('tr');
    ['#', 'Попытка', 'Быки (Bulls)', 'Коровы (Cows)'].forEach((text) => {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    state.history.forEach((entry, index) => {
      const row = document.createElement('tr');

      const cellNum = document.createElement('td');
      cellNum.textContent = (index + 1).toString();

      const cellGuess = document.createElement('td');
      cellGuess.textContent = entry.guess.toUpperCase();

      const cellBulls = document.createElement('td');
      cellBulls.textContent = entry.bulls.toString();

      const cellCows = document.createElement('td');
      cellCows.textContent = entry.cows.toString();

      row.appendChild(cellNum);
      row.appendChild(cellGuess);
      row.appendChild(cellBulls);
      row.appendChild(cellCows);
      table.appendChild(row);
    });

    container.appendChild(table);
  }

  return container;
};
