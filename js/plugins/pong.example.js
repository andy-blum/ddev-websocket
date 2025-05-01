export function onConnection(ws) {
  ws.send('pong connected');
}

export function onMessage(ws, data) {
  if (data === 'ping') {
    ws.send('pong');
  }
}

export function onClose(ws) {
  ws.send('pong disconnected');
}

