import EventManager from './eventManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const sizes = ['13x19', '23x29', '23x35', '25x38', '28x40', 'Custom'];

  const sizeContainer = document.getElementById('itemsList');

  sizes.forEach((size) => {
    const btn = document.createElement('button');
    btn.textContent = size;
    btn.addEventListener('click', () => {
      EventManager.emit('sizeSelected', { size });
    });
    sizeContainer.appendChild(btn);
  });
});
