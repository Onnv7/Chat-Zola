import React, { useContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

import './chat.scss';
import { AuthContext } from '../../Contexts/AuthContext.js';
import axios from '../../Hooks/axios.js';

const Chat = ({ conversation, handleLatestMsg }) => {
    const { user } = useContext(AuthContext);

    // const [conv, setConv] = useState(conversation);
    const conv = useRef(conversation);
    const [text, setText] = useState('');
    const [skip, setSkip] = useState(0);
    const [messages, setMessages] = useState(null);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();

    useEffect(() => {
        socket.current = io('ws://localhost:8900');
        socket.current.on('getMessage', (data) => {
            if (conv.current?.id === data.conversationId) setArrivalMessage(data?.message);
            handleLatestMsg(data);
        });
    }, []);

    useEffect(() => {
        conv.current = conversation;
        fetchMessages(conversation?.id);
    }, [conversation]);

    useEffect(() => {
        if (conversation === undefined) return;
        if (arrivalMessage)
            setMessages((prev) => {
                return [...prev, arrivalMessage];
            });
    }, [arrivalMessage]);

    useEffect(() => {
        socket.current.emit('addUser', user._id);
        socket.current.on('getUsers', (users) => console.log(users));
    }, [user]);

    const handleClickSendMessage = async (conversationId) => {
        if (text.trim() === '') return;
        const sentAt = Date.now();
        await axios
            .post(`/conversation/send-messages/${conversationId}`, {
                sender: user._id,
                message: text,
                sentAt: sentAt,
            })
            .then((res) => {
                setMessages((prev) => [
                    ...prev,
                    {
                        sender: user._id,
                        content: text,
                    },
                ]);
                handleLatestMsg({
                    conversationId: conversationId,
                    message: {
                        sender: user._id,
                        content: text,
                        sentAt: new Date(sentAt),
                    },
                });
                return res;
            })
            .then((res) => {
                socket.current.emit('sendMessage', {
                    conversationId: conversationId,
                    senderId: user._id,
                    receiverId: conversation.friend._id,
                    message: {
                        sender: user._id,
                        content: text,
                        sentAt: new Date(sentAt),
                    },
                });
                setText('');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchMessages = async (conversationId) => {
        if (!conversation) return;
        await axios.get(`/conversation/messages/${conversationId}/${skip}`).then((res) => setMessages(res.data));
    };
    const inputFile = useRef(null);
    const openFolder = () => {
        inputFile.current.click();
    };
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
                        <i className="fa-light fa-phone-volume"></i>
                        <i className="fa-light fa-video"></i>
                    </div>
                </div>
                <div className="chat-view">
                    <div className="message-view">
                        {/* {console.log("RENDER", messages)} */}
                        {messages &&
                            messages.map((message) => {
                                if (message.sender !== user._id) {
                                    return (
                                        <div className="YourMessage">
                                            <img src="../Img/Avatar1.png" alt="" />
                                            <span>{message.content}</span>
                                        </div>
                                    );
                                }
                                return (
                                    <div className="MyMessage">
                                        <span>{message.content}</span>
                                        <img src="../Img/Avatar.png" alt="" />
                                    </div>
                                );
                            })}
                    </div>
                    <div className="chat-box">
                        <div className="chat-toolbar">
                            <i className="fa-light fa-face-smile-beam"></i>
                            <i onClick={openFolder} className="fa-light fa-image"></i>
                            <input type="file" id="file" ref={inputFile} style={{ display: 'none' }} />
                        </div>
                        <div className="chat-inputBox">
                            <div className="chat-input">
                                <input
                                    type="text"
                                    placeholder="Nhập tin nhắn"
                                    value={text}
                                    onChange={(e) => {
                                        setText(e.target.value);
                                    }}
                                />
                                <i
                                    className="fa-solid fa-paper-plane-top"
                                    onClick={(e) => handleClickSendMessage(conversation.id)}
                                ></i>
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
