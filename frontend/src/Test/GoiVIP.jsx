import React, { useEffect, useState, useRef } from 'react';
import Peer from 'peerjs';  
import { io } from 'socket.io-client';

const socket = io('http://localhost:8900');
const GoiVIP = () => {
    const [peerId, setPeerId] = useState(null);
    const [remotePeerId, setRemotePeerId] = useState('');
    const remoteVideo = useRef(null);
    const peerInstance = useRef(null);
    const userVideo = useRef(null);
    useEffect(() => {
        const peer = new Peer();
        let pid;
        peer.on('open', (id) => {
          console.log("🚀 ~ file: GoiDien.jsx:15 ~ peer.on ~ id:", id)
          pid = id
          setPeerId(id);
        });

        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            getUserMedia({ audio: true, video: true }, (mediaStream) => {
                console.log("Người nhận")

                userVideo.current.srcObject = mediaStream;
                userVideo.current.play();

                call.answer(mediaStream);
                call.on('stream', (remoteStream) => {
                    remoteVideo.current.srcObject = remoteStream
                    remoteVideo.current.play();

                })
            });
        })

        peer.on('disconnected', () => {
            console.log(`${pid} disconnected`)
        })

        peer.on('close', () => {
            console.log(`${pid} close`)
        })

        peerInstance.current = peer;
    }, []);

    const call = (remoteId) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        getUserMedia({ audio: true, video: true }, (mediaStream) => {
            console.log("Người gọi")
            userVideo.current.srcObject = mediaStream;
            userVideo.current.play();

            const call = peerInstance.current.call(remoteId, mediaStream);

            call.on('stream', (remoteStream) => {
                remoteVideo.current.srcObject = remoteStream
                remoteVideo.current.play();
            })
        })
    }
    const cancel = () => {
        peerInstance.current.destroy();
        console.log("Bam cancel")
    }
    return (
    <div className="home">
        <div>
            <h1>Current user: {peerId}</h1>
            <input type="text" value={remotePeerId} 
                    onChange={(e) => setRemotePeerId(e.target.value)} />
            <button onClick={() => call(remotePeerId)}>Call</button>
            <button onClick={() => cancel()}>Cancel</button>
            <video ref={userVideo}/>
        </div>
        <div>
            <video ref={remoteVideo}/>
        </div>
    </div>
    )
}
export default GoiVIP;

