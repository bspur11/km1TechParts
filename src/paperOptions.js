import EventManager from './eventManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const types = ['Gloss', 'Offset', 'Silk', 'Satin', 'Styrene', 'Custom'];

  const options = document.getElementById('itemsList');
  if (!options) return;

  types.forEach((type) => {
    const btn = document.createElement('button');
    btn.textContent = type;
    btn.addEventListener('click', () => {
      console.log(`Options Selected: ${type}`);
      EventManager.emit('sizeSelected', { type });
    });
    options.appendChild(btn);
  });
});
