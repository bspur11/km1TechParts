import EventManager from './eventManager.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const supplies = ['Black', 'Cyan', 'Magenta', 'Yellow', 'Add To Supplies'];

  const list = document.getElementById('supplies-list');
  if (!list) return;

  list.innerHTML = '';

  supplies.forEach((supply) => {
    const btn = document.createElement('button');
    btn.textContent = supply;
    btn.classList.add('caliper-btn');
    btn.dataset.name = supply;
    btn.addEventListener('click', () => {
      console.log(`Caliper Selected: ${supply}`);
      EventManager.emit('CaliperSelected', { supply });
    });
    list.appendChild(btn);
  });
});
