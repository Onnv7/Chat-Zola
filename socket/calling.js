


const openStream = () => {
    const config = { audio: false, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}
const playStream = (stream) => {
    if (localStream.current) {
        localStream.current.srcObject = stream;
        localStream.current.play();
    }
  };
const handleClickGoiDien = () => {
    openStream()
    .then(stream => playStream(stream))

}
useEffect(()=> {
    socket.current = io("ws://localhost:8900");
    socket.current.on('connect', id => console.log("MY ID:", id));
    // peer.on('open', id => console.log(id))
}, [])

// const callUser = (id) => {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream: stream,
//     });
  
//     peer.on('signal', (data) => {
//       socket.emit('callUser', { userToCall: id, signalData: data, from: from });
//     });
  
//     peer.on('stream', (stream) => {
//         localStream.current.srcObject = stream;
//     });
  
//     socket.on('callAccepted', (signal) => {
//       peer.signal(signal);
//     });
//   };