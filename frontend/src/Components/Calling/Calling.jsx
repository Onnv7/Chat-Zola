import React, { useEffect, useContext, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';


import Peer from 'peerjs'; 
import { AuthContext } from '../../Contexts/AuthContext.js';
import { SocketClientContext } from '../../Contexts/SocketClientContext.js';
import './calling.scss';
import axios from '../../Hooks/axios.js';
import { toast } from 'react-toastify';

const Calling = ({ setIsOpen }) => {
    const { user } = useContext(AuthContext);
    const userVideo = useRef(null);
    const remoteVideo = useRef(null);
    const [callerID, setcCallerID] = useState(window.props?.callerID)
    const [calleeID, setCalleeID] = useState(window.props?.calleeID)
    const [peerId, setPeerId] = useState("")
    const [socketId, setsocketId] = useState(window.props?.socket.id)
    
    
    const [newPeer, setNewPeer] = useState(new Peer());
    const [newSocket, setSocket] = useState(window.props?.socket);
    const [isAccepted, setIsAccepted] = useState(false);
    const [video, setVideo] = useState(window.props?.video)
    const [conversationId, setConversationId] = useState(window.props?.conversationId)
    
    useEffect(() => {
        // window.addEventListener('beforeunload', async () => {
            
            
        // });
        
        newPeer.on('open', (id) => {
            setPeerId(id)
            if(user._id === calleeID){
                newSocket.emit("accept video call", ({ calleePeerID: newPeer._id, callerID: callerID }));

                newPeer.on('call', (call) => {
                    setIsAccepted(true)
                    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
                    getUserMedia({ audio: true, video: video }, (mediaStream) => {
                        
                        userVideo.current.srcObject = mediaStream;
                        userVideo.current.play();
        
                        call.answer(mediaStream);
                        call.on('stream', (remoteStream) => {  
                            remoteVideo.current.srcObject = remoteStream
                            remoteVideo.current.play();

                            newSocket.on('ended calling', () => {
                                // console.log("Callee tắt may")
                                stopMediaStreamTracks(remoteStream);
                                // console.log("CALLER ĐÃ NGẮT KẾT NỐI")
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
                getUserMedia({ audio: true, video: video }, (mediaStream) => {
                    // console.log("Người gọi", newSocket)
                    callerStream = mediaStream;
                    userVideo.current.srcObject = mediaStream;
                    userVideo.current.play();
                })

                // NGƯỜI GỌI phát 'calling' đến server
                newSocket.emit('calling', ({callerID: callerID, calleeID: calleeID, video: video }))

                // NGƯỜI GỌI lắng nghe 'accepted calling'
                newSocket.on("accepted calling", async({calleePeerID}) => {
                    setIsAccepted(true)
                    // console.log(calleePeerID, "ĐỒNG Ý KẾT NỐI TỚI BẠN")
                    const call = newPeer.call(calleePeerID, callerStream);
            
                    call.on('stream', (remoteStream) => {
                        remoteVideo.current.srcObject = remoteStream
                        remoteVideo.current.play();

                        newSocket.on('ended calling', async () => {
                            stopMediaStreamTracks(remoteStream);
                            // console.log("CALLEE ĐÃ NGẮT KẾT NỐI")
                            newPeer.destroy();
                            window.close();
                        }) 
                    })
                });
                newSocket.on("denied calling", () => {
                    // console.log("CUỘC GỌI BỊ TỪ CHỐI");
                    window.close();
                });
            }
        
        });
        window.addEventListener('beforeunload', (e) => {
            handleBeforeUnload(e);
            handleCloseWindow();
        });
        // window.addEventListener('unload', () => {
            
        
        // })
    }, [])
    const stopMediaStreamTracks = stream => {
        stream.getTracks().forEach(track => {
            return track.stop()
        })
    }
    

    function handleBeforeUnload(e) {
        e.preventDefault();
        
        save()
        // handleCloseWindow()
        // setIsAccepted(false)
        // setIsOpen(false);
    }
    const save = async () => {
        let message = "Cuộc gọi "
        if(video)
        {
            message += "video"
        }
        else
        {
            message += "thoại"
        }
        const sentAt = Date.now();
        await axios
        .post(`/conversation/send-messages/${conversationId}`, {
            sender: user._id,
            message: message,
            sentAt: sentAt,
            type: "calling",
        })
        // await handleCloseWindow()
    }
    const handleCloseWindow = async () => {
        if (newPeer) {
            // console.log(object)
            newSocket.emit("end calling", {finisher: user._id, callerID, calleeID});
            // newSocket.emit("send message", { conversationId, senderId: callerID, receiverId: calleeID, message: "message"})
            window.close();
        }
    }
    const handleEndCalling = () => {
        handleCloseWindow()
    }
    const handleVideoClick = () => {
        setVideo(prev => !prev)
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
                <div className="calling-hideVideo"
                onClick={handleVideoClick}>
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
