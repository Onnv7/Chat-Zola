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
    const [callerID, setcCallerID] = useState(window.props?.callerID);
    const [calleeID, setCalleeID] = useState(window.props?.calleeID);
    const [caller, setCaller] = useState(null);
    const [peerId, setPeerId] = useState('');
    const [socketId, setsocketId] = useState(window.props?.socket.id);

    const [newPeer, setNewPeer] = useState(new Peer());
    const [newSocket, setSocket] = useState(window.props?.socket);
    const [isAccepted, setIsAccepted] = useState(false);
    const [video, setVideo] = useState(window.props?.video);
    const [conversationId, setConversationId] = useState(window.props?.conversationId);
    const [isFinisher, setIsFinisher] = useState(false)
    const flag = useRef(true)
    console.log(window.props);
    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(`/user/get-profile/${calleeID}`)
            console.log(data)
            setCaller(data)
        }
        fetch();
    }, calleeID)
    useEffect(() => {
        newPeer.on('open', (id) => {
            setPeerId(id);
            // ĐÂY LÀ CALLEE
            if (user._id === calleeID) {
                newSocket.emit('accept video call', { calleePeerID: newPeer._id, callerID: callerID });

                newPeer.on('call', (call) => {
                    setIsAccepted(true);
                    var getUserMedia =
                        navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                    getUserMedia({ audio: true, video: video }, (mediaStream) => {
                        userVideo.current.srcObject = mediaStream;
                        userVideo.current.play();

                        call.answer(mediaStream);

                        call.on('stream', (remoteStream) => {
                            remoteVideo.current.srcObject = remoteStream;
                            remoteVideo.current.play();

                            newSocket.on('ended calling', ({finisher}) => {
                                if(finisher !== user._id) {
                                    stopMediaStreamTracks(remoteStream);
                                    newPeer.destroy();
                                    flag.current = false;
                                    window.close();
                                }
                            });
                        });
                    });
                });
            } 
            // ĐÂY LÀ CALLER
            else if (user._id === callerID) {
                let callerStream;

                // NGƯỜI GỌI khởi tạo camera
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                getUserMedia({ audio: true, video: video }, (mediaStream) => {
                    // console.log("Người gọi", newSocket)
                    callerStream = mediaStream;
                    userVideo.current.srcObject = mediaStream;
                    userVideo.current.play();
                });

                // NGƯỜI GỌI phát 'calling' đến server
                newSocket.emit('calling', {
                    callerID: callerID,
                    calleeID: calleeID,
                    video: video,
                    conversationId: conversationId,
                });

                // NGƯỜI GỌI lắng nghe 'accepted calling'
                newSocket.on('accepted calling', async ({ calleePeerID }) => {
                    setIsAccepted(true);
                    const call = newPeer.call(calleePeerID, callerStream);

                    call.on('stream', (remoteStream) => {
                        remoteVideo.current.srcObject = remoteStream;
                        remoteVideo.current.play();

                        newSocket.on('ended calling', async ({finisher}) => {
                            if(finisher !== user._id) {
                                stopMediaStreamTracks(remoteStream);
                                newPeer.destroy();
                                flag.current = false;
                                window.close();
                            }
                            // stopMediaStreamTracks(remoteStream);
                            // newPeer.destroy();
                            // window.close();
                        });
                    });
                });
                newSocket.on('denied calling', () => {
                    // console.log("CUỘC GỌI BỊ TỪ CHỐI");
                    window.close();
                });
            }
        });
        window.addEventListener('beforeunload', async (e) => {
            console.log("FLAG ", flag.current)
            if(flag.current) {
                let message = 'Cuộc gọi ';
                if (video) {
                    message += 'video';
                } else {
                    message += 'thoại';
                }
                const sentAt = Date.now();
                const data = {
                    sender: callerID,
                    message: message,
                    sentAt: sentAt,
                    type: 'calling',
                };
                // newSocket.emit('end calling', { finisher: user._id, callerID, calleeID });
                setIsFinisher(false)
                flag.current = false
                window.opener.postMessage({ finisher: user._id, callerID, calleeID, data }, '*');
            }
        });
    }, []);
    const stopMediaStreamTracks = (stream) => {
        stream.getTracks().forEach((track) => {
            return track.stop();
        });
    };

    function handleBeforeUnload(e) {
        e.preventDefault();
        save();
    }

    const save = () => {
        console.log("SAVE 02")
        let message = 'Cuộc gọi ';
        if (video) {
            message += 'video';
        } else {
            message += 'thoại';
        }
        const sentAt = Date.now();
        const fetch = async () => {
            await axios
                .post(`/conversation/send-messages/${conversationId}`, {
                    sender: callerID,
                    message: message,
                    sentAt: sentAt,
                    type: 'calling',
                })
                .then(() => {
                    newSocket.emit('end calling', { finisher: user._id, callerID, calleeID });
                    window.close();
                });
        };
        // fetch();
        // newSocket.emit('end calling', { finisher: user._id, callerID, calleeID });
        setIsFinisher(true)
        flag.current = true
        window.close();
    };
    
    const handleEndCalling = async () => {
        save();
    };
    const handleVideoClick = () => {
        setVideo((prev) => !prev);
    };
    return (
        <div className="calling">
            {!isAccepted && (
                <div className="calling-box">
                    <img src={caller?.avatar} alt="" />
                    <span>{caller?.name}</span>
                    <span>Đang gọi ...</span>
                </div>
            )}
            {(isAccepted && !video) && (
                <div className="calling-box">
                    <img src={caller?.avatar} alt="" />
                    <span>{caller?.name}</span>
                </div>
            )}
            <video className={!isAccepted ? 'hide' : 'yourVideo'} ref={remoteVideo} />
            <video className="myVideo" ref={userVideo} />
            <div className="calling-icon">
                {/* <div className="calling-hideVideo" onClick={handleVideoClick}>
                    <i className="fa-regular fa-video"></i>
                    <i className="hide fa-regular fa-video-slash "></i>
                </div> */}
                <div className="calling-cancelPhone">
                    <i className="fa-regular fa-phone-slash" onClick={handleEndCalling}></i>
                </div>
            </div>
        </div>
    );
};

export default Calling;
