const EventManager = {
  events: {},

  on(eventName, handler) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(handler);
  },

  off(eventName, handler) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(
      (h) => h !== handler
    );
  },

  emit(eventName, payload) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach((handler) => handler(payload));
  },
};

export default EventManager;
