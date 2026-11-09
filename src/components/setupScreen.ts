import type { GameState, GameBase } from '../types';
import { updateSettings, startRound } from '../core/gameState';

export const renderSetupScreen = (
  state: GameState,
  onStateChange: (newState: GameState) => void
): HTMLElement => {
  const container = document.createElement('div');
  container.className = 'setup-screen';

  const title = document.createElement('h1');
  title.textContent = '🎯 Игра «Быки и Коровы»';
  container.appendChild(title);

  const baseGroup = document.createElement('div');
  baseGroup.className = 'form-group';

  const baseLabel = document.createElement('label');
  baseLabel.textContent = 'Выберите систему счисления: ';
  baseGroup.appendChild(baseLabel);

  const baseSelect = document.createElement('select');
  const bases: GameBase[] = ['bin', 'oct', 'dec', 'hex'];

  bases.forEach((b) => {
    const option = document.createElement('option');
    option.value = b;
    option.textContent = b.toUpperCase();
    option.selected = state.base === b;
    baseSelect.appendChild(option);
  });
  baseGroup.appendChild(baseSelect);
  container.appendChild(baseGroup);

  const lengthGroup = document.createElement('div');
  lengthGroup.className = 'form-group';

  const lengthLabel = document.createElement('label');
  lengthLabel.textContent = 'Длина секретного числа (2-6): ';
  lengthGroup.appendChild(lengthLabel);

  const lengthSelect = document.createElement('select');

  const updateLengthOptions = (currentBase: GameBase, currentLength: number) => {
    while (lengthSelect.firstChild) {
      lengthSelect.removeChild(lengthSelect.firstChild);
    }

    const availableLengths = [2, 3, 4, 5, 6];

    availableLengths.forEach((l) => {
      const option = document.createElement('option');
      option.value = l.toString();
      option.textContent = l.toString();

      if (currentBase === 'bin' && l > 2) {
        option.disabled = true;
      }

      if (l === currentLength && !option.disabled) {
        option.selected = true;
      } else if (currentBase === 'bin' && l === 2) {
        option.selected = true;
      }

      lengthSelect.appendChild(option);
    });
  };

  updateLengthOptions(state.base, state.length);
  lengthGroup.appendChild(lengthSelect);
  container.appendChild(lengthGroup);

  baseSelect.addEventListener('change', () => {
    const selectedBase = baseSelect.value as GameBase;
    let nextLength = parseInt(lengthSelect.value, 10);

    if (selectedBase === 'bin') {
      nextLength = 2;
    }

    updateLengthOptions(selectedBase, nextLength);
    const nextState = updateSettings(state, nextLength, selectedBase);
    onStateChange(nextState);
  });

  lengthSelect.addEventListener('change', () => {
    const selectedLength = parseInt(lengthSelect.value, 10);
    const nextState = updateSettings(state, selectedLength, state.base);
    onStateChange(nextState);
  });

  const startButton = document.createElement('button');
  startButton.textContent = '🚀 Начать раунд';
  startButton.className = 'btn-start';

  startButton.addEventListener('click', () => {
    const nextState = startRound(state);
    onStateChange(nextState);
  });

  container.appendChild(startButton);

  return container;
};
