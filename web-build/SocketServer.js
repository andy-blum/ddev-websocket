import { WebSocketServer } from 'ws';
import { globSync } from "glob";

const wss = new WebSocketServer({
  port: 8080,
  clientTracking: true,
});

const pluginFiles = globSync("/var/www/html/.ddev/js/plugins/*.js");

Promise.all(pluginFiles.map(plugin => import(plugin)))
  .then((plugins) => {
    wss.on('connection', (ws) => {
      plugins.forEach(plugin => {
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
      });
    })
  })
  .catch((error) => {
    console.error('Error loading plugins:', error);
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
