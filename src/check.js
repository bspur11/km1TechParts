import EventManager from './eventManager.js';
import { formatDate } from './date.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const state = EventManager.getState();
  const reviewList = document.getElementById('review-list');
  const saveBtn = document.getElementById('saveBtn');
  const statusMessage = document.getElementById('statusMessage');

  // Display the review list.
  reviewList.innerHTML = '';
  console.log('🛠️ Final state before forEach:', state);
  Object.entries(state).forEach(([key, value]) => {
    const li = document.createElement('button');
    li.classList = 'check-btn';

    li.textContent = `${key}: ${value}`;
    reviewList.appendChild(li);
    console.log(key, value);
  });
  // Save to DB on click
  saveBtn.addEventListener('click', async () => {
    try {
      const currentDate = new Date();
      const formattedDate = formatDate(currentDate);

      if (!document.querySelector('.time-stamp')) {
        const timeStamp = document.createElement('button');
        timeStamp.innerHTML = '';
        timeStamp.classList = 'time-stamp';
        timeStamp.textContent = formattedDate;
        reviewList.appendChild(timeStamp);
      }

      const itemToSave = {
        ...state,
        savedAt: formattedDate, //formated date
        timestamp: currentDate, //raw date object
      };

      const res = await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(itemToSave),
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      statusMessage.textContent = `Saved! ID: ${data._id || 'unknown'}`;
      console.log('38Saved object', data);
      console.log('54', data.savedAt);
      EventManager.clear();
    } catch (err) {
      statusMessage.textContent = ` Failed to save: ${err.message}`;
      console.log('Save Error:', err);
    }
  });
});
