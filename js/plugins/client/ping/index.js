export default function(ws) {
  window.DDEV_WEBSOCKET_PING = () => { ws.send('ping') };

  ws.onmessage = (data) => {
    console.log('ping plugin received: ', data);
  };
}
