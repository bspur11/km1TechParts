import EventManager from './eventManager.js';
document.addEventListener('DOMContentLoaded', () => {
  const list = [
    'Ink Heads',
    'Deaoration Module',
    'Wipe Cloths',
    'Synthetic Gloves',
    'Filters',
  ];
  const listElement = document.getElementById('maintenance-list');
  if (!listElement) return;

  listElement.textContent = '';

  list.forEach((item) => {
    const btn = document.createElement('button');
    btn.textContent = item;
    btn.classList.add('maintenance-btn');
    btn.dataset.name = item;

    btn.addEventListener('click', () => {
      console.log(`Event Handler: ${item}`);
      EventManager.emit('MaintenanceSelected', { item });
    });
    listElement.appendChild(btn);
  });
});
