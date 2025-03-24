import EventManager from './eventManager.js';

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

  paperSizes.forEach((size) => {
    const btn = document.createElement('button');
    btn.textContent = size;
    btn.classList.add('paper-size-btn');
    btn.dataset.name = size;
    btn.addEventListener('click', () => {
      console.log(`Size Selected: ${size}`);
      EventManager.emit('sizeSelected', { size });
    });
    sizes.appendChild(btn);
  });
});
