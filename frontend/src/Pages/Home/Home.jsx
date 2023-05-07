import React, { useEffect, useState } from 'react';

import SidebarNav from '../../Components/SidebarNav/SidebarNav';
import MessengerTab from '../../Components/MessengerTab/MessengerTab';
import './home.scss';

import BeCalled from '../../Components/BeCalled/BeCalled';
import Friend from '../../Components/Friend/Friend';
import Meet from '../../Components/Meet/Meet';
import Profile from '../../Components/Profile/Profile';
import Logout from '../../Components/Logout/Logout';
import Report from '../../Components/Report/Report';

import axios from '../../Hooks/axios.js';
const Home = () => {
    const [active, setActive] = useState(1);
    const [view, setView] = useState();
    const [subview, setSubview] = useState(0);
    useEffect(() => {
        if (active === 1) {
            setView(<MessengerTab />);
        } else if (active === 2) {
            setView(<Friend />);
        } else if (active === 3) {
            setView(<Profile />);
        }
    }, [active]);
    const handleClick = (i) => {
        setActive(i);
    };
    const subClick = (i) => {
        setSubview(i);
    };

    return (
        <div className="home">
            <div className="homeNav">
                <SidebarNav handleClick={handleClick} subClick={subClick} />
            </div>
            <div className="homeView">{view}</div>
            <div className="beCall-modal hide">
                <BeCalled />
            </div>
            <div className={subview === 1 ? 'logout-modal' : 'hide'}>
                <Logout subClick={subClick} />
            </div>
            <div className={subview === 2 ? 'report-modal' : 'hide'}>
                <Report subClick={subClick} />
            </div>
        </div>
    );
};

export default Home;
