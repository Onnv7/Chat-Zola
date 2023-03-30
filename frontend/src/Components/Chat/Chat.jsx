import React, {useContext, useState, useEffect, useRef, } from 'react';
import { io } from 'socket.io-client';
import './chat.scss';
import { AuthContext } from '../../Contexts/AuthContext.js';
import { SocketClientContext } from '../../Contexts/SocketClientContext.js';
import axios from "../../Hooks/axios.js";
import { useNavigate } from 'react-router-dom';
import { Image } from 'cloudinary-react';
// import Picker from 'emoji-picker-react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


import { formatDateTime } from '../../Hooks/formatDateTime.js';
const Chat = ({conversation, handleLatestMsg}) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    let { socket, peer, dispatch } = useContext(SocketClientContext);
    
    
    const containerRef = useRef(null);
    const inputFile = useRef(null);
    // const [conv, setConv] = useState(conversation);
    const [isLoadingOldMsg, setIsLoadingOldMsg] = useState(false)
    const conv = useRef(conversation);
    const [text, setText] = useState("");
    const [skip, setSkip] = useState(0);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [image, setImage] = useState(null);
    const [isOpenPicker, setIsOpenPicker] = useState(false);


    
    useEffect(() => {
        socket.on("get message", (data) => {
            if(conv.current?.id === data.conversationId)
                setArrivalMessage(data?.message)
            handleLatestMsg(data);
        });
        
    }, []);


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
                    .then(res => {
                        setMessages(res);
                        setIsLoadingOldMsg(false);
                    })
                    
    }, [conversation])
    
    useEffect(() => {     
        if(conversation === undefined) 
            return;
        if (arrivalMessage) 
            setMessages((prev) => {
                return [...prev, arrivalMessage]
            })
    }, [arrivalMessage])


    const handleClickSendMessage = async (conversationId) => {
        if(image !== null){
            console.log("send")
            await sendMessage(conversationId, "image", image);}
        if(text !== "")
            await sendMessage(conversationId, "message", text);
        
    }
    const sendMessage = async (conversationId, type, content) => {
        const sentAt = Date.now()
        if(content.trim() === "")
            return;
        await axios.post(`/conversation/send-messages/${conversationId}`, {
            sender: user._id,
            message: content,
            sentAt: sentAt,
            type: type,
        })
        .then((res) => {
            const newMessage = res.data.data
            setMessages(prev => {
                return [...prev, newMessage]
            })
            handleLatestMsg({
                conversationId: conversationId,
                message: newMessage
            });
            return res;
        })
        .then((res) => {
            const newMessage = res.data.data
            socket.emit("send message", {
                conversationId: conversationId,
                senderId: user._id,
                receiverId: conversation.friend._id,
                message: newMessage
            })
            setText("");
            setSkip(prev => prev + 1);
            setIsLoadingOldMsg(false);
        })
        .catch((err) => {
            console.log(err)
        })
        setImage(null)
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
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
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
    
    const onEmojiClick = (emojiObject) => {
        console.log(emojiObject)
        setText((text) => text + emojiObject.native);
    }
    const showEmojiPicker = () => {
        setIsOpenPicker(prev => !prev);
    }
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
                            const sentAt = formatDateTime(message.sentAt);
                            // console.log("MES ne", message)
                                if(message.sender !== user._id)
                                {
                                    if(message.type === 'message')
                                        return (<div className="YourMessage">
                                                    <img src="../Img/Avatar1.png" alt="" />
                                                    <span>{message.content}</span>
                                                    <div>{sentAt}</div>
                                                </div>)
                                    else if(message.type === 'image')
                                        {
                                            return (<div className="MyMessage">
                                                    <span>
                                                        <Image
                                                        cloudName="dtvnsczg8"
                                                        publicId={message.content}
                                                        crop="scale"
                                                        width="300"
                                                        ></Image>
                                                    </span>
                                                    <div>{sentAt}</div>
                                                    <img src="../Img/Avatar.png" alt="" />
                                                </div>)}
                                }
                                else {
                                    if(message.type === 'message'){
                                        
                                        return (<div className="MyMessage">
                                                <span>{message.content}</span>
                                                <div>{sentAt}</div>
                                                <img src="../Img/Avatar.png" alt="" />
                                            </div>)
                                    }
                                    else if(message.type === 'image')
                                        return (<div className="MyMessage">
                                                    <span>
                                                        <Image
                                                        cloudName="dtvnsczg8"
                                                        publicId={message.content}
                                                        crop="scale"
                                                        width="300"
                                                        ></Image>
                                                    </span>
                                                    <div>{sentAt}</div>
                                                    <img src="../Img/Avatar.png" alt="" />
                                                </div>)
                                }
                        })}
                    </div>
                    <div className="chat-box">
                    
                        <div className="chat-toolbar">
                            <i className="fa-light fa-face-smile-beam"
                            onClick={showEmojiPicker}></i>
                            {isOpenPicker && <Picker data={data} onEmojiSelect={onEmojiClick} />}
                            {/* <Picker data={data} onEmojiSelect={chosenEmoji}/> */}
                            {/* {isOpenPicker && <Picker  onEmojiClick={onEmojiClick} />} */}
                            <div style={{textAlign: 'left',marginLeft:'810px'}}>
                                {/* { chosenEmoji && <EmojiData chosenEmoji={chosenEmoji}/>} */}
                            </div>
                            <i className="fa-light fa-image"
                                onClick={(e) => inputFile.current.click()}
                                ></i>
                            <input type="file" 
                                    id="file" 
                                    ref={inputFile} 
                                    style={{ display: 'none' }} onChange={handleImageUpload} />
                        </div>
                        <div className="chat-inputBox">
                            
                        {image && (
                            <img src={image} alt="Preview" style={{ maxWidth: '70px', maxHeight: '70px' }} />
                        )}
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
