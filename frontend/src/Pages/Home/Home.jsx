
import React, { useEffect, useState } from 'react';

import SidebarNav from '../../Components/SidebarNav/SidebarNav';
import MessengerTab from '../../Components/MessengerTab/MessengerTab';
import './home.scss';

import BeCalled from '../../Components/BeCalled/BeCalled';
import Friend from '../../Components/Friend/Friend';
import Meet from '../../Components/Meet/Meet';
import Profile from '../../Components/Profile/Profile';

const Home = () => {
    const [active, setActive] = useState(1);
    const [view, setView] = useState();
    useEffect(() => {
        if (active === 1) {
            setView(<MessengerTab />);
        } else if (active === 2) {
            setView(<Friend />);
        } else if (active === 3) {
            setView(<Meet />);
        } else if (active === 4) {
            setView(<Profile />);
        }
    }, [active]);
    const handleClick = (i) => {
        setActive(i);
    };

    return (
        <div className="home">
            <div className="homeNav">
                <SidebarNav handleClick={handleClick} />
            </div>
            <div className="homeView">{view}</div>
            <div className="beCall-modal hide">
                <BeCalled />
            </div>

        </div>
    );
};

export default Home;
