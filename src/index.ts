import type { GameState } from './types';
import type { GameRecord } from './types';
import { createInitialState } from './core/gameState';
import { renderSetupScreen } from './components/setupScreen';
import { renderPlayingScreen } from './components/playingScreen';
import { addAndSortRecords, saveRecordsToStorage, formatSettingsBadge } from './core/records';

const renderRecordsTable = (records: GameRecord[]): HTMLElement => {
  const container = document.createElement('div');
  container.className = 'records-container';

  const subtitle = document.createElement('h2');
  subtitle.textContent = '🏆 Таблица лучших результатов (ТОП-5)';
  container.appendChild(subtitle);

  if (records.length === 0) {
    const emptyText = document.createElement('p');
    emptyText.textContent = 'Рекордов пока нет. Будьте первым!';
    container.appendChild(emptyText);
    return container;
  }

  const table = document.createElement('table');
  table.className = 'records-table';

  const headerRow = document.createElement('tr');
  ['Место', 'Режим', 'Попытки', 'Время', 'Дата'].forEach((text) => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  records.forEach((rec, idx) => {
    const row = document.createElement('tr');

    const cIdx = document.createElement('td');
    cIdx.textContent = `#${idx + 1}`;

    const cBadge = document.createElement('td');
    cBadge.textContent = formatSettingsBadge(rec.base, rec.length);

    const cAttempts = document.createElement('td');
    cAttempts.textContent = rec.attempts.toString();

    const cTime = document.createElement('td');
    cTime.textContent = `${rec.time} сек`;

    const cDate = document.createElement('td');
    cDate.textContent = rec.date;

    row.appendChild(cIdx);
    row.appendChild(cBadge);
    row.appendChild(cAttempts);
    row.appendChild(cTime);
    row.appendChild(cDate);
    table.appendChild(row);
  });

  container.appendChild(table);
  return container;
};

const renderApp = (state: GameState): void => {
  const body = document.body;

  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }

  if (state.status === 'setup') {
    body.appendChild(renderSetupScreen(state, handleStateChange));
    body.appendChild(renderRecordsTable(state.records));
  } else if (state.status === 'playing') {
    body.appendChild(renderPlayingScreen(state, handleStateChange));
  } else if (state.status === 'won') {
    const wonContainer = document.createElement('div');
    wonContainer.className = 'won-screen';

    const winTitle = document.createElement('h1');
    winTitle.textContent = '🎉 Победа! Вы угадали число!';
    wonContainer.appendChild(winTitle);

    const secretText = document.createElement('p');
    secretText.textContent = `Тайное число было: ${state.secret.toUpperCase()}`;
    wonContainer.appendChild(secretText);

    const statsText = document.createElement('p');
    const timeSpent = state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : 0;
    statsText.textContent = `📊 Сделано попыток: ${state.history.length}, Затрачено времени: ${timeSpent} сек.`;
    wonContainer.appendChild(statsText);

    const restartButton = document.createElement('button');
    restartButton.textContent = '⚙️ К настройкам / Новая игра';
    restartButton.addEventListener('click', () => {
      const resetState = createInitialState();
      resetState.records = state.records;
      handleStateChange(createInitialState());
    });

    wonContainer.appendChild(restartButton);
    body.appendChild(wonContainer);
  }
};

let globalState = createInitialState();

const handleStateChange = (newState: GameState): void => {
  let finalState = newState;

  if (newState.status === 'won' && globalState.status === 'playing') {
    const timeSpent = newState.startTime ? Math.floor((Date.now() - newState.startTime) / 1000) : 0;

    const newRecord: GameRecord = {
      length: newState.length,
      base: newState.base,
      attempts: newState.history.length,
      time: timeSpent,
      date: new Date().toLocaleDateString('ru-RU'),
    };

    const updatedRecords = addAndSortRecords(newState.records, newRecord);
    saveRecordsToStorage(updatedRecords);

    finalState = {
      ...newState,
      records: updatedRecords,
    };
  }

  globalState = finalState;
  renderApp(globalState);
};

renderApp(globalState);
