import React, {useContext, useState, useEffect, useRef, } from 'react';
import { io } from 'socket.io-client';
import './chat.scss';
import { AuthContext } from '../../Contexts/AuthContext.js';
import { SocketClientContext } from '../../Contexts/SocketClientContext.js';
import axios from "../../Hooks/axios.js";
import { useNavigate } from 'react-router-dom';

const Chat = ({conversation, handleLatestMsg}) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    let { socket, peer, dispatch } = useContext(SocketClientContext);
    // console.log("🚀 ~ file: Chat.jsx:14 ~ Chat ~ socket:", socket?.id, peer?._id)
   
    
    const containerRef = useRef(null);
    // const [conv, setConv] = useState(conversation);
    const [isLoadingOldMsg, setIsLoadingOldMsg] = useState(false)
    const conv = useRef(conversation);
    const [text, setText] = useState("");
    const [skip, setSkip] = useState(0);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    

    useEffect(() => {
        // socket.emit("addUser", user._id);
        socket.on("getMessage", (data) => {
            if(conv.current?.id === data.conversationId)
                setArrivalMessage(data?.message)
            handleLatestMsg(data);
        });
        
    }, []);

    useEffect(() => {
        if(isLoadingOldMsg === false) {
            const container = containerRef.current;
            container.scrollTop = container.scrollHeight;
        }
        else 
        {
            const container = containerRef.current;
            container.scrollTop = 20;
        }
    }, [messages])
    

    useEffect(() => {
        const fetchFirstMessages =async (conversationId) => {
            if(!conv.current)
            return
            const { data } = await axios.get(`/conversation/messages/${conversationId}/0`)
            setSkip(10);
            return data
        }
        conv.current = conversation;
        fetchFirstMessages(conversation?.id)
                    .then(res => {setMessages(res);setIsLoadingOldMsg(false)})
                    
    }, [conversation])
    
    useEffect(() => {     
        if(conversation === undefined) 
            return;
        if (arrivalMessage) 
            setMessages((prev) => {
                return [...prev, arrivalMessage]
            })
    }, [arrivalMessage])

    useEffect(() => {
        // socket.emit("addUser", user._id)
        // socket.on("getUsers", users => console.log(users))
    }, [user])

    const handleClickSendMessage = async (conversationId) => {
        if(text.trim() === "")
            return;
        const sentAt = Date.now()
        await axios.post(`/conversation/send-messages/${conversationId}`, {
            sender: user._id,
            message: text,
            sentAt: sentAt
        })
        .then((res) => {
            setMessages(prev => [...prev, {
                sender: user._id,
                content: text
            }])
            handleLatestMsg({
                conversationId: conversationId,
                message: {
                    sender: user._id,
                    content: text,
                    sentAt: new Date(sentAt)
                }
            });
            return res;
        })
        .then((res) => {
            socket.emit("sendMessage", {
                conversationId: conversationId,
                senderId: user._id,
                receiverId: conversation.friend._id,
                message: {
                    sender: user._id,
                    content: text,
                    sentAt: new Date(sentAt)
                }
            })
            setText("");
            setSkip(prev => prev + 1);
            setIsLoadingOldMsg(false);
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const handleCallVideo = async (peer) => {
        const url = `/call`;
        const width = 800;
        const height = 600;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const newWindow =window.open(url, '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);
        
        newWindow.props = {
            peer: peer,
            socket: socket,
            callerID: user._id,
            calleeID: conversation?.friend._id,
        };
        
        // newWindow.addEventListener('beforeunload', () => {
        //     newWindow.close();
        // });
//         newWindow.onload = () => {
//     newWindow.opener.postMessage({ type: "peerId", peerId }, "*");
//   };

    }
    const handleCall = async () => {
        navigate('/an')
    }
    useEffect(() => {
        const fetchMessages = async () => {
            if(!conversation)
            return
            const { data } = await axios.get(`/conversation/messages/${conversation.id}/${skip}`)
            // setSkip(prevSkip => prevSkip + 10);
            return data
        }
        const handleScroll = () => {
            const container = containerRef.current;
            if (container.scrollTop === 0)  {
                console.log("????????", skip, messages?.length)
                fetchMessages()
                .then(res => {
                    if(res.length !== 0) 
                    {
                        setMessages(prevMessages => [...res, ...prevMessages]);
                        setSkip(prevSkip => prevSkip + 10);
                        setIsLoadingOldMsg(true);
                    }
                })
            }
        };
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [conversation, skip]);

    
    

    
    return (
        <div className="chat">
            <div className="chat-container">
                <div className="chat-header">
                    <div className="chat-name">
                        <img src="../Img/Avatar1.png" alt="" />
                        <span>{conversation?.friend.name}</span>
                    </div>
                    <div className="chat-headerBtn">
                        <i className="fa-light fa-magnifying-glass"></i>
                        <i className="fa-light fa-phone-volume"
                            onClick={handleCall}/>
                        <i className="fa-light fa-video"
                        onClick={() => handleCallVideo(peer)}></i>
                    </div>
                </div>
                <div className="chat-view">
                    <div className="message-view" 
                        ref={containerRef} 
                        style={{ overflowY: 'scroll', height: '400px' }}>
                        {messages && messages.map((message) => {
                                if(message.sender !== user._id)
                                {
                                    return (<div className="YourMessage">
                                                <img src="../Img/Avatar1.png" alt="" />
                                                <span>{message.content}</span>
                                            </div>)
                                }
                                return (<div className="MyMessage">
                                            <span>{message.content}</span>
                                            <img src="../Img/Avatar.png" alt="" />
                                        </div>)
                        })}
                    </div>
                    <div className="chat-box">
                        <div className="chat-toolbar">
                            <i className="fa-light fa-face-smile-beam"></i>
                            <i className="fa-light fa-image"></i>
                        </div>
                        <div className="chat-inputBox">
                            <div className="chat-input">
                                <input type="text" 
                                        placeholder="Nhập tin nhắn" 
                                        value={text} 
                                        onChange={(e) => {
                                            setText(e.target.value)
                                        }}/>
                                <i className="fa-solid fa-paper-plane-top"
                                    onClick={(e) => handleClickSendMessage(conversation.id)}></i>
                                <i className="fa-solid fa-thumbs-up"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chat-detail">
                <img src="../Img/Avatar1.png" alt="" />
                <span>Friend A</span>
            </div>
        </div>
    );
};

export default Chat;
