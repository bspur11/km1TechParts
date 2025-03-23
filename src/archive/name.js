import EventManager from '../eventManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const paperBtn = document.getElementById('paper-name');

  paperBtn.addEventListener('click', () => {
    console.log('Paper button clicked');
    EventManager.emit('paperSelected', { paperType: 'Cougar' });
  });

  EventManager.on('sizeSelected', (data) => {
    console.log(`Size selected for paper: ${data.size}`);
  });
});
