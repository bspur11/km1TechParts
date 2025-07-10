import EventManager from './eventManager.js';
import './style.css';
import { formatDate } from './date.js';
import { createModal } from './modal.js';

const currentDate = new Date();
const formattedCurrentDate = formatDate(currentDate);

document.addEventListener('DOMContentLoaded', () => {
  const paperNames = [
    'Cougar',
    'Husky',
    'Supreme',
    'Creator',
    'Tango',
    'Anthem',
    'Orcherd',
    'Add',
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
      const paperName = btn.textContent;
      EventManager.emit('paperName', paperName);
      console.log('📄 Setting paperName to:', paperName);
      console.log('✅ Updated state:', EventManager.getState());

      // Prompt for Docket #
      createModal({
        title: `Enter Docket Number for ${name}`,
        message: `Please enter a valid docket number.`,
        onConfirm: (inputValue) => {
          const docket = Number(inputValue); // ✅ inputValue trimmed in modal.js

          if (!isNaN(docket)) {
            console.log(`${name} was Selected at`, formattedCurrentDate);
            EventManager.emit('selectionUpdated', {
              paperName: name,
              docketNumber: docket,
            });
            window.location.href = 'calipers.html';
          } else {
            alert('❌ Please enter a valid number!');
          }
        },
      });
    });
    list.appendChild(btn);
  });
  const state = EventManager.getState();
  console.log('60 Current selection state:', state);
  console.log(
    '📦 Current selection state:',
    EventManager.getState('paperSelected')
  );
});
