/*

Real Time Communication (RTC) using webRTC, socket.io, simplePeer

Adapted from Shawn Van Every's example code here: https://github.com/vanevery/multipeer-simple-peer-server

Server Side:

1. Create a "secure" HTTPS server:
    * in order to access the webcam, we need a "secure" HTTPS server rather than the standard HTTP server,
    * we can generate 'self-signed' certificates by running the following command in the terminal: 
        openssl req -nodes -new -x509 -keyout local.key -out local.cert
    * we use the filesystem ('fs') node module to access these files to load them into our server
    * we will use the 'express' module to run this server


2. Create a 'peers' object to store the ids of the available peers
    * storing data in arrays versus objects -- why one or the other?

    let myFriends = [peer1, peer2, peer3]
    myFriends[2]

    let myFriends = {
        "asdkufgs9d8762390": socketObject,
        "234723nbjhdskahfs": socketObject
    }

    delete myFriends["234723nbjhdskahfs"];

    if ("asdkufgs9d8762390" in myFriends) { //do something } 






3. Create a websocket server (using the socket.io package) to pass signaling messages along!

*/



let fs = require("fs");



var express = require("express");
var app = express();

// Tell Express to look in the "public" folder for any files first
app.use(express.static("public"));

// If the user just goes to the "route" / then run this function
app.get("/", function (req, res) {
  res.send("Hello World!");
});


// Here is the actual HTTP server
// In this case, HTTPS (secure) server
var https = require("https");

// Security options - key and certificate
var serverOptions = {
  key: fs.readFileSync("local.key"),
  cert: fs.readFileSync("local.cert"),
};

// We pass in the Express object and the serverOptions object
var httpsServer = https.createServer(serverOptions, app);

// Default HTTPS port
httpsServer.listen(443);



let peers = {};




// 3. Create websocket server using socket.io
var io = require("socket.io")().listen(httpsServer);


io.sockets.on("connection", (socket) => {
    // add the socket to our 'peers' object:
    peers[socket.id] = socket;
    // { "290384kjdhfasdhg": socket, "029837423udskjgf": socket}
    console.log("We have a new client: " + socket.id + "!");
  
    socket.on("list", () => {
      let ids = Object.keys(peers);
      // ["290384kjdhfasdhg", "029837423udskjgf"]
  
      console.log("ids length: " + ids.length);
      socket.emit("listresults", ids);
    });
  
    // Relay signals back and forth
    socket.on("signal", (to, from, data) => {
      console.log("signal", to, data);
  
      if (to in peers) {
        peers[to].emit("signal", to, from, data);
      } else {
        console.log("Peer not found!");
      }
    });
  
    socket.on("disconnect", () => {
      console.log("Client has disconnected " + socket.id);
      io.emit("peer_disconnect", socket.id);
      delete peers[socket.id];
    });
  });
  