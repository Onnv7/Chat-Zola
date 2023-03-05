import React from 'react';
import SidebarNav from '../../Components/SidebarNav/SidebarNav';
import Chat from '../../Components/Chat/Chat';
import './home.scss';

const Home = () => {
    return (
        <div className="home">
            <div className="homeNav">
                <SidebarNav />
            </div>
            <div className="homeChat">
                <Chat />
            </div>
        </div>
    );
};

export default Home;
