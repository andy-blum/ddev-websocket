RUN mkdir -p /opt/ddev-websocket
WORKDIR /opt/ddev-websocket
RUN npm install ws@8.18.1
RUN npm pkg set type=module
COPY SocketServer.js .
