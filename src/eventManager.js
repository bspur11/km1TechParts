const listeners = {};
let state = JSON.parse(localStorage.getItem('appState')) || {}; // 🧠 Store selections as they come in

const EventManager = {
  on(event, callback) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(callback);
  },

  off(event, callback) {
    if (!listeners[event]) return;
    listeners[event] = listeners[event].filter((cb) => cb !== callback);
  },

  emit(event, data) {
    if (event === 'selectionUpdated') {
      Object.assign(state, data); // ✅ Store merged selections
      localStorage.setItem('appState', JSON.stringify(state));
    }

    if (listeners[event]) {
      listeners[event].forEach((callback) => callback(data));
    }
    console.log('📤 Emitted:', data);
  },

  getState() {
    return state;
  },
};

export default EventManager;
