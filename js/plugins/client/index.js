import * as Plugins from './plugins.js';

(async () => {
  const ws = await DDEV_WEBSOCKET;
  for (const [name, plugin] of Object.entries(Plugins)) {
    console.log(`DDEV_WEBSOCKET:CLIENT_PLUGIN: "${name}"`);
    plugin.default(ws);
  }
  // Group started in SocketClient.js
  console.groupEnd();
})();
