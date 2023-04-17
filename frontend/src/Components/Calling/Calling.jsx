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
    const [peerId, setPeerId] = useState("")
    const [socketId, setsocketId] = useState(window.props?.socket.id)
    
    let { socket, dispatch } = useContext(SocketClientContext);
    const [newPeer, setNewPeer] = useState(new Peer());
    const [newSocket, setSocket] = useState(window.props?.socket);
    
    
    useEffect(() => {
        if (window.props) {
            // socket = window.props?.socket;
            // dispatch("CONNECTED", { socket: socket})
        }
        newPeer.on('open', (id) => {
            setPeerId(id)
            
            if(user._id === calleeID){
                newSocket.emit("accept video call", ({ calleePeerID: newPeer._id, callerID: callerID }));

                newPeer.on('call', (call) => {
                    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
                    getUserMedia({ audio: true, video: true }, (mediaStream) => {
                        
                        userVideo.current.srcObject = mediaStream;
                        userVideo.current.play();
        
                        call.answer(mediaStream);
                        call.on('stream', (remoteStream) => {  
                            remoteVideo.current.srcObject = remoteStream
                            remoteVideo.current.play();

                            newSocket.on('ended calling', () => {
                                stopMediaStreamTracks(remoteStream);
                                console.log("CALLER ĐÃ NGẮT KẾT NỐI")
                                newPeer.destroy();
                                window.close();
                            }) 
                        })
                    });
                });
                
            }
            else if(user._id === callerID){
                let callerStream;

                // NGƯỜI GỌI khởi tạo camera
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                getUserMedia({ audio: true, video: true }, (mediaStream) => {
                    console.log("Người gọi", newSocket)
                    callerStream = mediaStream;
                    userVideo.current.srcObject = mediaStream;
                    userVideo.current.play();
                })

                // NGƯỜI GỌI phát 'calling' đến server
                newSocket.emit('calling', ({callerID: callerID, calleeID: calleeID}))

                // NGƯỜI GỌI lắng nghe 'accepted calling'
                newSocket.on("accepted calling", ({calleePeerID}) => {
                    console.log(calleePeerID, "ĐỒNG Ý KẾT NỐI TỚI BẠN")
                    const call = newPeer.call(calleePeerID, callerStream);
            
                    call.on('stream', (remoteStream) => {
                        remoteVideo.current.srcObject = remoteStream
                        remoteVideo.current.play();

                        newSocket.on('ended calling', () => {
                            stopMediaStreamTracks(remoteStream);
                            console.log("CALLEE ĐÃ NGẮT KẾT NỐI")
                            newPeer.destroy();
                            window.close();
                        }) 
                    })
                });
                newSocket.on("denied calling", () => {
                    console.log("CUỘC GỌI BỊ TỪ CHỐI");
                    window.close();
                });
            }
        
        });
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [])
    const stopMediaStreamTracks = stream => {
        stream.getTracks().forEach(track => {
            return track.stop()
        })
      }
    

    function handleBeforeUnload(e) {
        e.preventDefault();
        setIsOpen(false);
    }

    const handleEndCalling = async () => {
        if (newPeer) {
            newSocket.emit("end calling", ({finisher: user._id, callerID, calleeID}));
            // window.close();
        }
    }
    return (
        <div className="calling">
        {/* {console.log("HTML:", peerInstance.current)} */}
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
                    <i className="fa-regular fa-phone-slash"
                        onClick={handleEndCalling}></i>
                </div>
                <video ref={userVideo}/>
                <video ref={remoteVideo}/>
            </div>
        </div>
    );
};

export default Calling;
