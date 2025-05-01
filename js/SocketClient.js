(() => {
  const socket = new WebSocket(`${location.origin}:8080`);

  /**
   * Returns a custom event for re-deploy on the window object.
   *
   * @param {OpenEvent | MessageEvent | CloseEvent | ErrorEvent} event
   * @returns {CustomEvent}
   */
  function makeCustomEvent(event) {
    return new CustomEvent('ddev-websocket-event', {
      cancelable: false,
      bubbles: false,
      detail: {
        originalEvent: event,
        type: event.type
      }
    });
  }

  socket.addEventListener('open', (event) => {
    window.dispatchEvent(makeCustomEvent);
  });
  socket.addEventListener('close', (event) => {
    window.dispatchEvent(makeCustomEvent);
  });
  socket.addEventListener('message', (event) => {
    window.dispatchEvent(makeCustomEvent);
  });
  socket.addEventListener('error', (event) => {
    window.dispatchEvent(makeCustomEvent);
  });
})();
