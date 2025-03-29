import EventManager from './eventManager.js';
import './style.css';
import { formatDate } from './date.js';

document.addEventListener('DOMContentLoaded', () => {
  const currentDate = new Date();
  const formattedCurrentDate = formatDate(currentDate);
  console.log(formattedCurrentDate);
});
