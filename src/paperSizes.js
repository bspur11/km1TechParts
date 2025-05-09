import EventManager from './eventManager.js';
import './style.css';
import { formatDate } from './date.js';

const currentDate = new Date();
const formattedCurrentDate = formatDate(currentDate);

document.addEventListener('DOMContentLoaded', () => {
  const paperSizes = [
    '12.5x19',
    '13x19',
    '11x17',
    '17x22',
    '20x26',
    '20x28',
    '20x29',
    '8.5x11',
  ];

  const sizes = document.getElementById('paper-sizes-list');
  if (!sizes) return;

  sizes.innerHTML = '';

  // Listen for previous inputs
  const state = EventManager.getState();
  console.log('23 Currnet selection state:', state);
  console.log('📦 24 Current selection state:', EventManager.getState());

  paperSizes.forEach((size) => {
    const btn = document.createElement('button');
    btn.textContent = size;
    btn.classList.add('paper-size-btn');
    btn.dataset.name = size;
    btn.addEventListener('click', () => {
      console.log(`Size Selected: ${size}`);
      // Prompt for Count #
      let count;
      while (true) {
        const input = prompt(`Enter Sheet Count for ${size}!`);
        if (input === null) return; // user cancelled
        count = Number(input.trim());
        if (!isNaN(count) && input.trim() !== '') break;
        alert('❌ Please enter a valid number!');
      }

      console.log(`${size} was selected `, formattedCurrentDate);
      console.log(currentDate);

      EventManager.emit('selectionUpdated', { size, count });
      console.log('📦 After emitting caliper:', EventManager.getState());
      window.location.href = 'check.html';
    });
    sizes.appendChild(btn);
  });
});
