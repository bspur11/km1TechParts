import EventManager from './eventManager.js';
import './style.css';
import { formatDate } from './date.js';
import { createModal } from './modal.js';

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

      createModal({
        message: `Enter Sheet Count for ${size}`,
        placeholder: 'e.g. 1000',
        onConfirm: (inputValue) => {
          const count = Number(inputValue);
          if (!isNaN(count)) {
            const previousState = EventManager.getState();
            EventManager.emit('selectionUpdated', {
              ...previousState,
              size,
              count,
            });
            console.log('After emitting size/count:', EventManager.getState());
            window.location.href = 'check.html';
          } else {
            alert('❌ Please enter a valid number!');
          }
        },
      });

      console.log(`${size} was selected `, formattedCurrentDate);
      console.log(currentDate);
    });
    sizes.appendChild(btn);
  });
});
