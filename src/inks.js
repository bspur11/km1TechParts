import EventManager from './eventManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const inkList = ['Black', 'Cyan', 'Magenta', 'Yellow'];
  if (!inkList) return;

  const listItem = document.getElementById('inks-list');
  listItem.textContent = '';

  inkList.forEach((item) => {
    const btn = document.createElement('button');
    btn.textContent = item;
    btn.classList = 'ink-btn';
    btn.dataset.name = item;
    btn.addEventListener('click', () => {
      console.log(`Button Clicked: ${item}`);
      EventManager.emit('InkSelected', { item });
    });
    listItem.appendChild(btn);
  });
});
