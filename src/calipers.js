import EventManager from './eventManager.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const calipers = [
    '80',
    '100',
    '110',
    '8',
    '10',
    '12',
    '130-12',
    '130-14',
    '14',
    '16',
    '18',
    '20',
    '22',
    '24',
  ];

  const list = document.getElementById('paper-caliper-list');
  if (!list) return;

  list.innerHTML = '';

  // Optional: Listen to previous paperName + docket
  const prevSelections = EventManager.getState();
  console.log('Previous Selections:', prevSelections);
  console.log('📦 Current selection state:', EventManager.getState());

  calipers.forEach((caliper) => {
    const item = document.createElement('button');
    item.textContent = caliper;
    item.classList.add('paper-caliper-btn');
    item.dataset.name = caliper;
    item.addEventListener('click', () => {
      console.log(`Caliper Selected: ${caliper}`);
      EventManager.emit('selectionUpdated', { caliper });
      console.log('📦 After emitting caliper:', EventManager.getState());
      window.location.href = 'paperSizes.html';
    });
    list.appendChild(item);
  });
});
