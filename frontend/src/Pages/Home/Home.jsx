import React, {useState} from 'react';
import SidebarNav from '../../Components/SidebarNav/SidebarNav';
import Chat from '../../Components/Chat/Chat';
import './home.scss';
import { SelectedConversationProvider } from '../../Contexts/SelectedConversationContext.js';

const Home = () => {
    
    return (
        <div className="home">
            <SelectedConversationProvider>
                <div className="homeNav">
                    <SidebarNav />
                </div>
                <div className="homeChat">
                    <Chat />
                </div>
            </SelectedConversationProvider>
        </div>
    );
};

export default Home;
