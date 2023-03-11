import React, {useState, useEffect, useContext } from 'react';
import './messengerTab.scss';

import axios from "../../Hooks/axios.js";
import { AuthContext } from '../../Contexts/AuthContext.js';
import { SelectedConversationContext } from './../../Contexts/SelectedConversationContext';
const MessengerTab = () => {
    const [conversations, setConversations] = useState([]);
    const {user} = useContext(AuthContext);
    const {conversation, dispatch} = useContext(SelectedConversationContext)
    
    useEffect(() => {
        getAllConversations()
    }, []);

    const getAllConversations = async () => {
        const { data } = await axios.get(`conversation/get-conversations-list/${user._id}`);
        setConversations(data);
    }
    const handleClickConversation = async (conversationId) => {
        const { data } = await axios.get(`/conversation/get-messages/${conversationId}`);
        const friend = data.participants.filter(mem => mem._id !== user._id)[0];
        const selectedConversation = {
            id: data._id,
            friend: friend,
            message: data.message
        }
        dispatch({ 
            type: "SET_CONVERSATION", 
            payload: selectedConversation
        });
    }
    return (
        <div className="messengerTab-list">
            <div className="messengerTab-item active-chat">
                <div className="messengerTab-box">
                    <img src="../Img/Avatar1.png" alt="" />
                    <div className="messengerTab-prop">
                        <span>Friend A</span>
                        <span>Mai tôi sẽ đến đón bạn</span>
                    </div>
                </div>
            </div>
            {conversations.length > 0 && conversations.map(conversation => {
                const friend = conversation.participants.filter(mem => mem._id !== user._id);
                if(conversation.lastestMsg === undefined)
                    return;
                const sender = (conversation.lastestMsg.sender === user._id) ? "Bạn: " : "";
                return (
                <div className="messengerTab-item" key={conversation._id} 
                    onClick={() => handleClickConversation(conversation._id)}>
                            <div className="messengerTab-box">
                                <img src="../Img/Avatar1.png" alt="" />
                                <div className="messengerTab-prop">
                                    <span>{friend[0].name}</span>
                                    {(<span>{sender + conversation.lastestMsg.content}</span>)}
                                </div>
                            </div>
                        </div>)
            })}
            {/* <div className="messengerTab-item">
                <div className="messengerTab-box">
                    <img src="../Img/Avatar1.png" alt="" />
                    <div className="messengerTab-prop">
                        <span>Friend A</span>
                        <span>Mai tôi sẽ đến đón bạn</span>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default MessengerTab;
