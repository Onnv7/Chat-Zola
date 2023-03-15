
import { SearchNormal } from 'iconsax-react';
import React, { useState, useContext, useEffect, useRef } from 'react';
import Chat from '../Chat/Chat';

import './messengerTab.scss';

import axios from "../../Hooks/axios.js";
import { AuthContext } from '../../Contexts/AuthContext.js';

const MessengerTab = () => {
    const {user} = useContext(AuthContext);

    const [conversations, setConversations] = useState([]);
    const selectedConversation = useRef();
    const [active, setActive] = useState(1);
    const containerRef = useRef(null);

    useEffect(() => {
        getAllConversations()
    }, []);


    const getAllConversations = async () => {
        let { data } = await axios.get(`conversation/get-conversations-list/${user._id}`);
        data = data.filter(conv => conv.latestMsg)
        setConversations(data);
    }
    
    const handleClickConversation = async (conversationId) => {
        const { data } = await axios.get(`/conversation/get-messages/${conversationId}`);
        // const data = await fetchMessages(conversationId);
        const friend = data.participants.filter(mem => mem._id !== user._id)[0];
        const conversation = {
            id: data._id,
            friend: friend,
        }
        selectedConversation.current = conversation;
        setActive(conversationId);
    };
    // const handleScroll = () => {
    //     const container = containerRef.current;
    //     if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
    //       fetchMessages();
    //     }
    //   };
    const handleLatestMsg = async ({conversationId, message}) => {
    console.log("🚀 ~ file: MessengerTab.jsx:48 ~ handleLatestMsg ~ message:", message)
    
        setConversations((prevState) => {
          const conversationIndex = prevState.findIndex(
            (conv) => conv._id === conversationId
          );
          const updatedConversation = {
            ...prevState[conversationIndex],
            latestMsg: message,
          };
          let updatedConversationList = prevState.slice();
          updatedConversationList[conversationIndex] = updatedConversation;
          console.log("🚀 ~ file: MessengerTab.jsx:59 ~ setConversations ~ updatedConversationList:", updatedConversationList)
          const an = updatedConversationList.sort((a, b) => new Date(b.latestMsg.sentAt) - new Date(a.latestMsg.sentAt));
          console.log("🚀 ~ SORTED:", an)
          
          return updatedConversationList;
        });
    };

    return (
        <div className="messengerTab">
            <div className="messengerTab-box">
                <div className="messengerTab-Search">
                    <div className="searchBox">
                        <SearchNormal size={24} className="searchBox-icon" />
                        <div className="searchBox-input">
                            <input type="text" placeholder="Tìm kiếm" />
                            <SearchNormal size={28} className="searchBox-icon" />
                        </div>
                    </div>
                    <i className="fa-solid fa-user-plus"></i>
                    <i className="fa-solid fa-users-medical"></i>
                </div>
                <div className="messengerTab-list">
                    {conversations.length > 0 && conversations.map(conversation => {
                        const friend = conversation.participants.filter(mem => mem._id !== user._id);
                        if(conversation.latestMsg === undefined)
                            return(<div className={active === conversation._id ? 'messengerTab-item active-chat' : 'messengerTab-item'} 
                                        key={conversation._id}
                                        onClick={() => handleClickConversation(conversation._id)}>
                                        <div className="messengerTab-friend">
                                            <img src="../Img/Avatar1.png" alt="" />
                                            <div className="messengerTab-prop">
                                                <span>{friend[0].name}</span>
                                                <span>"Empty"</span>
                                            </div>
                                        </div>
                                    </div>);

                        const sender = (conversation.latestMsg.sender === user._id) ? "Bạn: " : "";
                        return(<div className={active === conversation._id ? 'messengerTab-item active-chat' : 'messengerTab-item'} 
                                    key={conversation._id}
                                    onClick={() => handleClickConversation(conversation._id)}>
                                    <div className="messengerTab-friend">
                                        <img src="../Img/Avatar1.png" alt="" />
                                        <div className="messengerTab-prop">
                                            <span>{friend[0].name}</span>
                                            <span>{sender + conversation.latestMsg.content}</span>
                                        </div>
                                    </div>
                                </div>)
                        })
                    }
                </div>
            </div>
            <div className="messgerTab-chat">
                <Chat conversation={selectedConversation.current} 
                        handleLatestMsg={handleLatestMsg}/>
            </div>

        </div>
    );
};

export default MessengerTab;
