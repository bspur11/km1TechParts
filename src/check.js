import EventManager from './eventManager.js';
import { formatDate } from './date.js';
import './style.css';

const currentDate = new Date();
const formattedCurrentDate = formatDate(currentDate);

document.addEventListener('DOMContentLoaded', () => {
  const state = EventManager.getState();
  const reviewList = document.getElementById('review-list');
  const saveBtn = document.getElementById('saveBtn');
  const statusMessage = document.getElementById('statusMessage');

  // Render selections as list
  reviewList.innerHTML = '';
  console.log('🛠️ Final state before forEach:', state);
  Object.entries(state).forEach(([key, value]) => {
    const li = document.createElement('li');
    li.textContent = `${key}: ${value}`;
    reviewList.appendChild(li);
  });
  // Save to DB on click
  saveBtn.addEventListener('click', async () => {
    const state = EventManager.getState();
    console.log('🛠️ Final state before save:', state);
    try {
      const res = await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(state),
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      statusMessage.textContent = `Saved! ID: ${data._id || 'unknown'}`;
      console.log('38', data);
      EventManager.clear();
    } catch (err) {
      statusMessage.textContent = ` Failed to save: ${err.message}`;
      console.log('Save Error:', err);
    }
  });
});
