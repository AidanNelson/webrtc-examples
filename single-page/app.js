let peer1 = new SimplePeer({initiator: true});
let peer2 = new SimplePeer();


// let's pass some signaling messages back and forth
peer1.on("signal", (data) => {
    console.log('Peer 1 received signaling data: ', data);
    peer2.signal(data);
});

peer2.on("signal", (data) => {
    console.log('Peer 2 received signaling data: ', data);
    peer1.signal(data);
});

// on incoming data event:
peer1.on("data", (data) => {
    console.log('Peer 1 got a message: ', data.toString());
  })

peer2.on("data", (data) => {
    console.log('Peer 2 got a message: ', data.toString());
})