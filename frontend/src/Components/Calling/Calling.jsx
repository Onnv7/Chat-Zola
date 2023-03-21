import React, { useEffect, useContext, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';


import Peer from 'peerjs'; 
import { AuthContext } from '../../Contexts/AuthContext.js';
import { SocketClientContext } from '../../Contexts/SocketClientContext.js';
import './calling.scss';

const Calling = ({ setIsOpen }) => {
    const { user } = useContext(AuthContext);
    const userVideo = useRef(null);
    const remoteVideo = useRef(null);
    const [callerID, setcCallerID] = useState(window.props?.callerID)
    const [calleeID, setCalleeID] = useState(window.props?.calleeID)
    const [peerId, setPeerId] = useState(window.props?.peer._id)
    const [socketId, setsocketId] = useState(window.props?.socket.id)
    console.log("🚀 ~ file: Calling.jsx:13 ~ Calling ~ window.props:", window.props)
    let { socket, peer, dispatch } = useContext(SocketClientContext);
    
    const params = new URLSearchParams(window.location.search);
    

    useEffect(() => {
        if (window.props?.peer) {
            // dispatch({ type: "CONNECTED2", payload: { peer: window.props.peer } });
            // console.log("SU DUNG disspathc")
            peer = window.props.peer;
            socket = window.props?.socket;
        }
    }, [])
    // let { socket, peer } = useContext(SocketClientContext);

    useEffect(() => {
        if(user._id === callerID){
            let callerStream;
            if(peer) {
                peer.on('open', (id) => {
                    
                });
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                getUserMedia({ audio: true, video: true }, (mediaStream) => {
                    console.log("Người gọi")
                    callerStream = mediaStream;
                    userVideo.current.srcObject = mediaStream;
                    userVideo.current.play();
                })
            }
            socket.emit('calling', ({callerID: callerID, calleeID: calleeID}))
            socket.on("send peerID to caller", ({calleePeerID}) => {
                console.log("CHAP NHAN", calleePeerID)
                const call = peer.call(calleePeerID, callerStream);
        
                call.on('stream', (remoteStream) => {
                    remoteVideo.current.srcObject = remoteStream
                    remoteVideo.current.play();
                })
        })}
        else if(user._id === calleeID){
            if(peer) {
                peer.on('open', (id) => {
                    
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
                });
            }
        }
        // window.addEventListener('beforeunload', handleBeforeUnload);
        // return () => {
        //     window.removeEventListener('beforeunload', handleBeforeUnload);
        // };
    }, []);


    function handleBeforeUnload(e) {
        e.preventDefault();
        setIsOpen(false);
    }
    return (
        <div className="calling">
        {console.log("HTML:", peer)}
            <div className="calling-box">
                <img src="../Img/Avatar1.png" alt="" />
                <span>Friend A</span>
                <span><h1>My socketId: {socketId}</h1>  </span>  
                <span><h1>My peerid: {peerId}</h1>  </span>  
                <span><h1>CalleeID: {calleeID}</h1>  </span>  
                <span>Đang gọi ...</span>
            </div>
            <div className="calling-icon">
                <div className="calling-hideVideo">
                    <i className="fa-regular fa-video"></i>
                    <i className="hide fa-regular fa-video-slash "></i>
                </div>
                <div className="calling-muteMic">
                    <i className="fa-regular fa-microphone"></i>
                    <i className="hide fa-regular fa-microphone-slash "></i>
                </div>
                <div className="calling-cancelPhone">
                    <i className="fa-regular fa-phone-slash"></i>
                </div>
                <video ref={userVideo}/>
                <video ref={remoteVideo}/>
            </div>
        </div>
    );
};

export default Calling;
