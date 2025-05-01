import { WebSocketServer } from 'ws';

export default new WebSocketServer({
  port: 8080,
  clientTracking: true,
});
