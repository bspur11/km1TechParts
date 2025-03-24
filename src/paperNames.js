import EventManager from './eventManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const paperNames = [
    'Cougar',
    'Husky',
    'Supreme',
    'Creator',
    'Gloss',
    'Offset',
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
      console.log(`Paper Selected ${name}`);
      EventManager.emit('paperSelected', { name });
    });
    list.appendChild(btn);
  });
});
