import { WebSocketServer } from 'ws';
import * as Plugins from '/var/www/html/.ddev/js/plugins/server/index.js';

const wss = new WebSocketServer({
  port: 8080,
  clientTracking: true,
});

const pluginsLoaded = Object.keys(Plugins);

wss.on('connection', (ws) => {

  for (const [name, plugin] of Object.entries(Plugins)) {
    ws.send(`DDEV_WEBSOCKET:SERVER_PLUGIN: "${name}"`);
    if (typeof plugin.onConnection === 'function') {
      plugin.onConnection.call(ws, wss);
    }
    if (typeof plugin.onMessage === 'function') {
      ws.on('message', (data) => {
        plugin.onMessage.call(ws, wss, data);
      });
    }
    if (typeof plugin.onError === 'function') {
      ws.on('error', (error) => {
        plugin.onError.call(ws, wss, error);
      });
    }
    if (typeof plugin.onClose === 'function') {
      ws.on('close', () => {
        plugin.onClose.call(ws, wss);
      });
    }
  }
});

wss.on('error', (err) => {
  console.error('WebSocket server error:', err);
  // Optionally exit for fatal errors:
  if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
    process.exit(1);
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});
