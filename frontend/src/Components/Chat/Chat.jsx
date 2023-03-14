import React, {useContext, useState, useEffect, useRef} from 'react';
import { io } from 'socket.io-client';

import './chat.scss';
import { SelectedConversationContext } from '../../Contexts/SelectedConversationContext.js';
import { AuthContext } from '../../Contexts/AuthContext.js';
import axios from "../../Hooks/axios.js";

const Chat = () => {
    const { conversation } = useContext(SelectedConversationContext);

    const [text, setText] = useState("");
    const [messages, setMessages] = useState(null);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    
    
    
    useEffect(() => {
        setMessages(conversation.message);
    }, [conversation])
    const { user } = useContext(AuthContext);
    
    
    useEffect(() => {
        if (arrivalMessage) 
            setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            console.log("GET NE", data)
            setArrivalMessage(data)
        })
    }, [])

    
    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => console.log(users))
    }, [user])

    const handleClickSendMessage = async (conservationId) => {
        if(text.trim() === "")
            return;
        await axios.post(`/conversation/send-messages/${conservationId}`, {
            sender: user._id,
            message: text
        })
        .then((res) => {
            setMessages(prev => [...prev, {
                sender: user._id,
                content: text
            }])
        })
        .then((res) => {
            socket.current.emit("sendMessage", {
                senderId: user._id,
                receiverId: conversation.friend._id,
                message: {
                    sender: user._id,
                    content: text,
                }
            })
            setText("");
        })
        .catch((err) => {
            console.log(err)
        })
    }

    
    return (
        <div className="chat">
            {conversation.id && (<><div className="chat-container">
                <div className="chat-header">
                    <div className="chat-name">
                        <img src="../Img/Avatar1.png" alt="" />
                        <span>{conversation.friend.name}</span>
                    </div>
                    <div className="chat-headerBtn">
                        <i className="fa-light fa-magnifying-glass"></i>
                        <i className="fa-light fa-phone-volume"></i>
                        <i className="fa-light fa-video"></i>
                    </div>
                </div>
                <div className="chat-view">
                    <div className="message-view">
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
                                <input type="text" placeholder="Nhập tin nhắn" />
                                <i className="fa-solid fa-paper-plane-top"></i>
                                <i className="fa-solid fa-thumbs-up"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chat-detail">
                <img src="../Img/Avatar1.png" alt="" />
                <span>Friend A</span>
            </div></>)}
        </div>
    );
};

export default Chat;
