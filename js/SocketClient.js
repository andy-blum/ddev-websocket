window.DDEV_WEBSOCKET = new Promise((res, rej) => {
  const ws = new WebSocket(`${location.origin}:8080`);

  ws.addEventListener('open', () => {
    // Group ended in plugins/client/index.js
    console.groupCollapsed("DDEV_WEBSOCKET");
    res(ws);
  });

  ws.addEventListener('message', ({data}) => {
    if (data.startsWith('DDEV_WEBSOCKET:SERVER_PLUGIN:')) {
      console.log(data);
    }
  });

  ws.addEventListener('close', () => {
    console.log('DDEV WebSocket closed');
  });

  ws.addEventListener('error', (event) => {
    console.error('DDEV WebSocket error: ', event);
    rej(ws);
  });
});
