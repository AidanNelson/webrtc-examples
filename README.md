# webrtc-examples

This repository contains two examples of basic [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) applications using the library [SimplePeer](https://github.com/feross/simple-peer). 

### single-page
This application connects two WebRTC clients on the same HTML page.  **Note that you would never do this in practice**, but it is a helpful way to demonstrate the steps required to establish a WebRTC connection without a 'signaling' method (i.e. a way to pass connection information back and forth).

### with-signaling-server
This application uses a node.js server and the [socket.io](https://socket.io/) WebSocket library to establish a peer-to-peer WebRTC connection between multiple peers connected to the same server.  This is closer to how a WebRTC video application would look in practice.  In this example, each peer is connected to each other peer.  To run this application, follow the following steps from your terminal:
```bash
# make sure you are in the right folder in your terminal
cd webrtc-examples 

# then install the packages from the command line using the node package manager
npm install

# finally, run the server:
npm run start
```

---
### Next Steps:
If you are looking to build a webrtc-connected video application in 3D space, you may find this template useful: https://github.com/AidanNelson/threejs-webrtc
