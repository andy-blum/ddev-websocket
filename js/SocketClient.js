(() => {
  window.DDEV_WEBSOCKET = new WebSocket(`${location.origin}:8080`);

  DDEV_WEBSOCKET.addEventListener('open', () => {
    console.log('DDEV WebSocket opened');
  });

  DDEV_WEBSOCKET.addEventListener('close', () => {
    console.log('DDEV WebSocket closed');
  });

  DDEV_WEBSOCKET.addEventListener('error', (event) => {
    console.error('DDEV WebSocket error: ', event);
  });
})();
