import type { GameState } from './types';
import { createInitialState } from './core/gameState';
import { renderSetupScreen } from './components/setupScreen';
import { renderPlayingScreen } from './components/playingScreen';

const renderApp = (state: GameState): void => {
  const body = document.body;

  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }

  if (state.status === 'setup') {
    body.appendChild(renderSetupScreen(state, handleStateChange));
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
      handleStateChange(createInitialState());
    });

    wonContainer.appendChild(restartButton);
    body.appendChild(wonContainer);
  }
};

let globalState = createInitialState();

const handleStateChange = (newState: GameState): void => {
  globalState = newState;
  renderApp(globalState);
};

renderApp(globalState);
