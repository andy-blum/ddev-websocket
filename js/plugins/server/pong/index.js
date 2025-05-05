/**
 * Called when a new connection is established.
 * @var {WebSocket} wss the WebSocketServer instance
 * @this {WebSocket} ws the individual WebSocket connection
 */
export function onConnection(wss) {
  this.send('pong connected');
}

/**
 * Called when a message is received from the client.
 * @var {WebSocket} wss the WebSocketServer instance
 * @var {string} data the message data
 * @this {WebSocket} ws the individual WebSocket connection
 */
export function onMessage(wss, data) {
  const msg = data.toString();
  switch (msg) {
    case 'ping':
      this.send('pong');
      break;

    case 'ping all':
      wss.clients.forEach((client) => {
        client.send('pong');
      });
      break;

    default:
      break;
  }
}

/**
 * Called when the connection is closed.
 * @var {WebSocket} wss the WebSocketServer instance
 * @this {WebSocket} ws the individual WebSocket connection
 */
export function onClose(wss) {
  console.log('WebSocket closed');
}

/**
 * Called when an error occurs.
 * @var {WebSocket} wss the WebSocketServer instance
 * @var {Error} error the error object
 */
export function onError(wss, error) {
  console.error('WebSocket error:', error);
}
