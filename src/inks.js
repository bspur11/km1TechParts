import './style.css';
import EventManager from './eventManager.js';
import { createModal } from './modal.js';
import { addInk } from './api/inks.js';
import { getInks } from './api/inks.js';

document.addEventListener('DOMContentLoaded', () => {
  const inkList = ['Black', 'Cyan', 'Magenta', 'Yellow'];

  const listItem = document.getElementById('inks-list');
  if (!inkList) return;
  listItem.textContent = '';

  // Listen for previous inputs
  const state = EventManager.getState();
  console.log('13 Current Selection State:', state);
  console.log('14 Current Selection State:', EventManager.getState());

  inkList.forEach((ink) => {
    const btn = document.createElement('button');
    btn.textContent = ink;
    btn.classList = 'ink-btn';
    btn.dataset.name = ink;
    btn.addEventListener('click', () => {
      console.log(`Ink Selected: ${ink}`);

      // Prompt For Count
      createModal({
        message: `Enter Ink Count for ${ink}`, // ✅ typo fixed here: messsage -> message
        placeholder: 'e.g. 100',
        onConfirm: async (inputValue) => {
          const count = Number(inputValue);
          if (!isNaN(count)) {
            const newInk = {
              color: ink,
              quantity: count,
              timestamp: new Date().toISOString(), // optional: for tracking
            };

            try {
              await addInk(newInk, true); // ✅ Send to DB
              EventManager.emit('inkSelected', { ink, count });
              console.log('✅ Ink saved:', ink);
              console.log(
                '📦 After emitting ink count:',
                EventManager.getState('inkSelected')
              );
              // Optionally redirect:
              // window.location.href = 'some-next-page.html';
            } catch (err) {
              console.error('❌ Failed to save ink:', err);
              alert('Something went wrong saving ink.');
            }
          } else {
            alert('Please enter a valid number!');
          }
        },
      });
    });
    listItem.appendChild(btn);
  });

  async function displayInkLog() {
    const logList = document.getElementById('ink-log');
    if (!logList) return;

    try {
      const inks = await getInks(); // 🔁 Fetch from DB
      logList.innerHTML = ''; // Clear previous entries

      if (inks.length === 0) {
        const noData = document.createElement('li');
        noData.textContent = 'No ink data available.';
        logList.appendChild(noData);
        return;
      }

      inks.forEach((ink) => {
        const li = document.createElement('li');
        li.textContent = `${ink.color} — ${ink.quantity} (added: ${new Date(
          ink.timestamp
        ).toLocaleString()})`;
        logList.appendChild(li);
      });
    } catch (err) {
      console.error('Error displaying ink log:', err);
    }
  }

  // ⏱ Run after page load
  displayInkLog();
});
