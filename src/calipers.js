import EventManager from './eventManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const paperCalipers = [
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

  paperCalipers.forEach((caliper) => {
    const item = document.createElement('button');
    item.textContent = caliper;
    item.classList.add('paper-caliper-btn');
    item.dataset.name = caliper;
    item.addEventListener('click', () => {
      console.log(`Caliper Selected: ${caliper}`);
      EventManager.emit('caliperSelected', { caliper });
    });
    list.appendChild(item);
  });
});
