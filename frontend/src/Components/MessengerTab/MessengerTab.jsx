
import { SearchNormal } from 'iconsax-react';
import React, { useState, useContext, useEffect, useRef } from 'react';
import Chat from '../Chat/Chat';

import './messengerTab.scss';

import axios from "../../Hooks/axios.js";
import { AuthContext } from '../../Contexts/AuthContext.js';

const MessengerTab = () => {
    const {user} = useContext(AuthContext);
    const convRef = useRef();
    const [conversations, setConversations] = useState([]);
    const selectedConversation = useRef();
    const [active, setActive] = useState(1);
    const [searchText, setSearchText] = useState("");
    const containerRef = useRef(null);

    useEffect(() => {
        getAllConversations()
    }, []);


    const getAllConversations = async () => {
        let { data } = await axios.get(`conversation/get-conversations-list/${user._id}`);
        // data = data.filter(conv => conv.latestMsg)
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
            updatedConversationList.sort((a, b) => new Date(b.latestMsg.sentAt) - new Date(a.latestMsg.sentAt));
          
            return updatedConversationList;
        });
    };
    const handleSearchConversation = async (e) => {
        try {
            let { data } = await axios.get(`conversation/get-conversations-list/${user._id}`);
            let result = data.slice();  
            if(e.target.value !=="") {

                result = data.filter(e => e.participants[0].name.includes(searchText))
                // return;
            }
            setConversations(result);
        } catch (error) {
            
        }
    }
    return (
        <div className="messengerTab">
            <div className="messengerTab-box">
                <div className="messengerTab-Search">
                    <div className="searchBox">
                        <SearchNormal size={24} className="searchBox-icon" />
                        <div className="searchBox-input">
                            <input type="text" 
                                    placeholder="Tìm kiếm" 
                                    onChange={(e) => {setSearchText(e.target.value); handleSearchConversation(e)}} 
                                    value={searchText}/>
                            <SearchNormal size={28} className="searchBox-icon" onClick={handleSearchConversation}/>
                        </div>
                    </div>
                    <i className="fa-solid fa-user-plus"></i>
                    <i className="fa-solid fa-users-medical"></i>
                </div>
                <div className="messengerTab-list">
                    {conversations.length > 0 && conversations.map(conversation => {
                        const avatar = conversation.participants[0].avatar ? conversation.participants[0].avatar : "../Img/Avatar.png"
                        // const friend = conversation.participants.filter(mem => mem._id !== user._id);
                        if(conversation.latestMsg === null)
                            return(<div className={active === conversation._id ? 'messengerTab-item active-chat' : 'messengerTab-item'} 
                                        key={conversation._id}
                                        onClick={() => handleClickConversation(conversation._id)}>
                                        <div className="messengerTab-friend">
                                            <img src={avatar} alt="" />
                                            <div className="messengerTab-prop">
                                                <span>{conversation.participants[0].name}</span>
                                                <span>"Empty"</span>
                                            </div>
                                        </div>
                                    </div>);
                        const sender = (conversation.latestMsg.sender === user._id) ? "You: " : "";
                        const content = conversation.latestMsg.type === "message" ? conversation.latestMsg.content : " Sent 1 photo"
                    // if(conversation.latestMsg.type === 'messenge')
                        return(<div className={active === conversation._id ? 'messengerTab-item active-chat' : 'messengerTab-item'} 
                                    key={conversation._id}
                                    onClick={() => handleClickConversation(conversation._id)}>
                                    <div className="messengerTab-friend">
                                        <img src={avatar} alt="" />
                                        <div className="messengerTab-prop">
                                            <span>{conversation.participants[0].name}</span>
                                            <span>{sender + content}</span>
                                        </div>
                                    </div>
                                </div>)
                        // else if(conversation.latestMsg.type === 'image'){
                            
                        // }
                    })
                    }
                    {conversations.length === 0 && <div>Không tìm thấy tin nhắn nào</div>}
                </div>
            </div>
            <div className="messgerTab-chat">
                <Chat key={selectedConversation.current?.id} conversation={selectedConversation.current} 
                        handleLatestMsg={handleLatestMsg}/>
            </div>

        </div>
    );
};

export default MessengerTab;
