import EventManager from './eventManager.js';
import './style.css';
import { formatDate } from './date.js';

const currentDate = new Date();
const formattedCurrentDate = formatDate(currentDate);

document.addEventListener('DOMContentLoaded', () => {
  const paperNames = [
    'Cougar',
    'Husky',
    'Supreme',
    'Creator',
    'Tango',
    'Anthem',
    'Orcherd',
    'Add',
  ];
  const list = document.getElementById('paper-name-list');
  if (!list) return;

  list.innerHTML = '';

  paperNames.forEach((name) => {
    const btn = document.createElement('button');
    btn.textContent = name;
    btn.classList.add('paper-name-btn');
    btn.dataset.name = name;

    btn.addEventListener('click', () => {
      // Prompt for Docket #
      const docketInput = prompt(`Enter Docket Number for ${name}.`);
      const docket =
        docketInput && docketInput.trim() !== '' ? Number(docketInput) : null;
      console.log(`${name} was Selected at `, formattedCurrentDate);
      console.log(currentDate);
      EventManager.emit('selectionUpdated', {
        paperName: name,
        docket: docket,
      });
      window.location.href = 'calipers.html';
    });
    list.appendChild(btn);
  });
  const state = EventManager.getState();
  console.log('Current selection state:', state);
  console.log('📦 Current selection state:', EventManager.getState());
});
