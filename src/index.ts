import type { GameState } from './types';
import { createInitialState } from './core/gameState';
import { renderSetupScreen } from './components/setupScreen';

const renderApp = (state: GameState): void => {
  const body = document.body;

  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }

  if (state.status === 'setup') {
    const setupView = renderSetupScreen(state, handleStateChange);
    body.appendChild(setupView);
  } else if (state.status === 'playing') {
    const playingPlaceholder = document.createElement('div');
    const text = document.createElement('h2');
    text.textContent = `🎮 Игра началась! Компьютер загадал секрет: ${state.secret}`;
    playingPlaceholder.appendChild(text);
    body.appendChild(playingPlaceholder);
  }
};

let globalState = createInitialState();

const handleStateChange = (newState: GameState): void => {
  globalState = newState;
  renderApp(globalState);
};

renderApp(globalState);
