// import { start } from "./odds.js";
// const isoDate = '2024-12-08T21:08:00Z'; // ISO 8601 date string
// console.log(data)
// Create a Date object from the ISO string

export function formatDate(isoDate) {
  const date = new Date(isoDate);

  // Define an array of month names
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Define an array of weekday names
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // Extract individual components
  const dayOfWeek = weekdays[date.getUTCDay()]; // Day of the week (e.g., "Sunday")
  const abrevDate = dayOfWeek.slice(0, 3);

  const month = months[date.getUTCMonth()]; // Month (e.g., "December")
  const abrevMonth = month.slice(0, 3);
  const day = date.getUTCDate(); // Day of the month (e.g., "8")
  const year = date.getUTCFullYear(); // Year (e.g., "2024")

  const abrevYear = year.toString().slice(2); // Get the first character of the year as a string

  // Format time with AM/PM
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const isPM = hours >= 12; // Check if it's PM
  hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
  const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${
    isPM ? 'PM' : 'AM'
  }`;

  // Combine everything into a full formatted date string
  const formattedDate = `${abrevDate}, ${day}_${abrevMonth}_${year}@${formattedTime}`;
  console.log(formattedDate);

  return formattedDate;
}
