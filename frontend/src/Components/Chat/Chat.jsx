import React, { useContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './chat.scss';
import { AuthContext } from '../../Contexts/AuthContext.js';
import { SocketClientContext } from '../../Contexts/SocketClientContext.js';
import axios from '../../Hooks/axios.js';
import { useNavigate } from 'react-router-dom';
import { Image } from 'cloudinary-react';
// import Picker from 'emoji-picker-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { formatDateTime } from '../../Hooks/formatDateTime.js';
const Chat = ({ conversation, handleLatestMsg }) => {
    const avatar = conversation?.friend.avatar;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const myAvatar = user?.avatar !== '' ? user.avatar : '../Img/Avatar.png';

    let { socket, dispatch } = useContext(SocketClientContext);

    const containerRef = useRef(null);
    const inputFile = useRef(null);
    // const [conv, setConv] = useState(conversation);
    const [isLoadingOldMsg, setIsLoadingOldMsg] = useState(false);
    const conv = useRef(conversation);
    const pickerRef = useRef();
    const [text, setText] = useState('');
    const [skip, setSkip] = useState(0);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [image, setImage] = useState(null);
    const [isOpenPicker, setIsOpenPicker] = useState(false);
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        
        socket?.on('get message', (data) => {
            if (conv.current?.id === data.conversationId) setArrivalMessage(data?.message);
            handleLatestMsg(data);
        });

        window.addEventListener('message', async (e) => {
            
            window.removeEventListener('message', () => {
                console.log('XOA EVENT');
            });
            if (e.origin !== 'http://localhost:3000') return;
            
            const convId = conversation?.id;
            const url = `/conversation/send-messages/${conversation?.id}`;

            const { data, ...others } = { ...e.data };
            if(user._id === e.data?.finisher) {
                socket?.emit('end calling', { finisher: user._id, callerID: e.data.callerID, calleeID: e.data.calleeID });
            }
            
            if (user._id === e.data?.finisher) {
                await axios
                    .post(url, {
                        ...data,
                    })
                    .then((res) => {
                        const newMessage = res.data.data;
                        setMessages((prev) => {
                            return [...prev, newMessage];
                        });
                        handleLatestMsg({
                            conversationId: convId,
                            message: newMessage,
                        });
                        return res;
                    })
                    .then((res) => {
                        const newMessage = res.data.data;
                        socket?.emit('send message', {
                            conversationId: convId,
                            senderId: e.data?.callerID,
                            receiverId: conversation.friend._id,
                            message: newMessage,
                        });
                        //
                    });
                // socket.emit('end calling', others);
            }
        });
    }, []);

    useEffect(() => {
        const fetchFirstMessages = async (conversationId) => {
            if (!conv.current) return;
            const { data } = await axios.get(`/conversation/messages/${conversationId}/0`);
            setSkip(10);
            return data;
        };
        conv.current = conversation;
        fetchFirstMessages(conversation?.id).then((res) => {
            setMessages(res);
            setIsLoadingOldMsg(false);
        });
    }, [conversation]);

    useEffect(() => {
        if (conversation === undefined) return;
        if (arrivalMessage)
            setMessages((prev) => {
                return [...prev, arrivalMessage];
            });
    }, [arrivalMessage]);

    const handleClickSendMessage = async (conversationId) => {
        if (image !== null) {
            await sendMessage(conversationId, 'image', image);
        }
        if (text !== '') await sendMessage(conversationId, 'message', text);
    };
    const sendMessage = async (conversationId, type, content) => {
        const sentAt = Date.now();
        if (content.trim() === '') return;
        await axios
            .post(`/conversation/send-messages/${conversationId}`, {
                sender: user._id,
                message: content,
                sentAt: sentAt,
                type: type,
            })
            .then((res) => {
                const newMessage = res.data.data;
                setMessages((prev) => {
                    return [...prev, newMessage];
                });
                handleLatestMsg({
                    conversationId: conversationId,
                    message: newMessage,
                });
                return res;
            })
            .then((res) => {
                const newMessage = res.data.data;
                socket?.emit('send message', {
                    conversationId: conversationId,
                    senderId: user._id,
                    receiverId: conversation.friend._id,
                    message: newMessage,
                });
                setText('');
                setSkip((prev) => prev + 1);
                setIsLoadingOldMsg(false);
            })
            .catch((err) => {
                console.log(err);
            });
        setImage(null);
        setText('');
    };
    const handleCallVideo = async () => {
        const url = `/call`;
        const width = 800;
        const height = 600;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const newWindow = window.open(url, '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);

        if (newWindow) {
            newWindow.props = {
                socket: socket,
                callerID: user._id,
                calleeID: conversation?.friend._id,
                video: true,
                conversationId: conversation?.id,
            };
        }
    };

    const handleCall = async () => {
        const url = `/call`;
        const width = 800;
        const height = 600;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const newWindow = window.open(url, '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);

        if (newWindow) {
            newWindow.props = {
                socket: socket,
                callerID: user._id,
                calleeID: conversation?.friend._id,
                video: false,
                conversationId: conversation?.id,
            };
        }
    };
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };
    useEffect(() => {
        const fetchMessages = async () => {
            if (!conversation) return;
            const { data } = await axios.get(`/conversation/messages/${conversation.id}/${skip}`);
            // setSkip(prevSkip => prevSkip + 10);
            return data;
        };
        const handleScroll = () => {
            const container = containerRef.current;
            if (container.scrollTop === 0) {
                fetchMessages().then((res) => {
                    if (res.length !== 0) {
                        setMessages((prevMessages) => [...res, ...prevMessages]);
                        setSkip((prevSkip) => prevSkip + 10);
                        setIsLoadingOldMsg(true);
                    }
                });
            }
        };
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [conversation, skip]);

    useEffect(() => {
        if (isLoadingOldMsg === false) {
            const container = containerRef.current;
            container.scrollTop = container.scrollHeight;
        } else {
            const container = containerRef.current;
            container.scrollTop = 20;
        }
    }, [messages]);

    const onEmojiClick = (emojiObject) => {
        setText((text) => text + emojiObject.native);
    };
    const showEmojiPicker = () => {
        setIsOpenPicker((prev) => !prev);
    };

    return (
        <div className="chat">
            <div className="chat-container">
                <div className="chat-header">
                    <div className="chat-name">
                        <img src={avatar} alt="" />
                        <span>{conversation?.friend.name}</span>
                    </div>
                    {conversation?.isFriend && (<div className="chat-headerBtn">
                        <i className="fa-light fa-phone-volume" onClick={handleCall} />
                        <i className="fa-light fa-video" onClick={() => handleCallVideo()}></i>
                    </div>)}
                </div>
                <div className="chat-view">
                    <div className={image === null ? 'message-view' : 'message-viewImage'} ref={containerRef}>
                        {messages &&
                            messages.map((message) => {
                                const sentAt = formatDateTime(message.sentAt);
                                if (message.sender !== user._id) {
                                    if (message.type === 'message')
                                        return (
                                            <div className="YourMessage">
                                                <img src={avatar} alt="" />
                                                <span>{message.content}</span>
                                                <div>{sentAt}</div>
                                            </div>
                                        );
                                    else if (message.type === 'image') {
                                        return (
                                            <div className="YourMessage">
                                                <img src={avatar} alt="" />
                                                <span>
                                                    <Image
                                                        cloudName="dtvnsczg8"
                                                        publicId={message.content}
                                                        crop="scale"
                                                        width="300"
                                                    ></Image>
                                                </span>
                                                <div>{sentAt}</div>
                                            </div>
                                        );
                                    } else if (message.type === 'calling') {
                                        return (
                                            <div className="YourMessage">
                                                <img src={avatar} alt="" />
                                                <span>
                                                    <span>{message.content}</span>
                                                </span>
                                                <div>{sentAt}</div>
                                            </div>
                                        );
                                    }
                                }
                                // me
                                else {
                                    if (message.type === 'message') {
                                        return (
                                            <div className="MyMessage">
                                                <div>{sentAt}</div>
                                                <span>{message.content}</span>
                                                <img src={myAvatar} alt="" />
                                            </div>
                                        );
                                    } else if (message.type === 'image') {
                                        return (
                                            <div className="MyMessage">
                                                <div>{sentAt}</div>
                                                <span>
                                                    <Image
                                                        cloudName="dtvnsczg8"
                                                        publicId={message.content}
                                                        crop="scale"
                                                        width="300"
                                                    ></Image>
                                                </span>
                                                <img src={myAvatar} alt="" />
                                            </div>
                                        );
                                    } else if (message.type === 'calling') {
                                        return (
                                            <div className="MyMessage">
                                                <div>{sentAt}</div>
                                                <span>{message.content}</span>
                                                <img src={myAvatar} alt="" />
                                            </div>
                                        );
                                    }
                                }
                            })}
                    </div>
                    {conversation?.isFriend ? (
                        <div className="chat-box">
                            <div className="chat-toolbar">
                                <i className="fa-light fa-face-smile-beam" onClick={showEmojiPicker}></i>
                                <div className="emoji-adjust">
                                    {isOpenPicker && (
                                        <Picker data={data} onEmojiSelect={onEmojiClick} ref={pickerRef} />
                                    )}
                                </div>
                                <i className="fa-light fa-image" onClick={(e) => inputFile.current.click()}></i>
                                <input
                                    type="file"
                                    id="file"
                                    ref={inputFile}
                                    style={{ display: 'none' }}
                                    multiple
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className="chat-inputBox">
                                {image && (
                                    <div className="chat-inputImg">
                                        <i className="fa-regular fa-circle-xmark"></i>
                                        <img src={image} alt="Preview" style={{ width: '70px', height: '50px' }} />
                                    </div>
                                )}

                                <div className="chat-input">
                                    <textarea
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Nhập tin nhắn"
                                        value={text}
                                    ></textarea>
                                    <i
                                        className="fa-solid fa-paper-plane-top"
                                        onClick={(e) => handleClickSendMessage(conversation.id)}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="chat-noFriend">Hãy kết bạn với nhau để tiếp tục trò chuyện nhé</div>
                    )}
                </div>
            </div>
            {/* <div className="chat-detail">
                <img src="../Img/Avatar1.png" alt="" />
                <span>Friend A</span>
            </div> */}
        </div>
    );
};

export default Chat;
