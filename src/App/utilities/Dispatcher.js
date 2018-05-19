const listeners = {};

const register = (event, fn) => {
  listeners[event] = listeners[event] || [];
  listeners[event].push(fn);
};

const remove = (event, fn) => {
  const handlers = listeners[event];
  handlers.splice(handlers.indexOf(fn), 1);
};

const dispatch = (event, ...args) => {
  const eventListeners = listeners[event] || [];
  eventListeners.forEach(_event => _event(...args));
};

const getEventHandlers = event => listeners[event];

const clearEventHandlers = event => {
  if (event) {
    listeners[event] = [];
  }
};

export default {
  register,
  remove,
  dispatch,
  getEventHandlers,
  clearEventHandlers
};
