import React, { useEffect, useState } from 'react';
import AddFriend from '../AddFriend/AddFriend';
import FriendInvite from '../FriendInvite/FriendInvite';
import MyFriend from '../MyFriend/MyFriend';
import './friend.scss';

const Friend = () => {
    const [view, setView] = useState(<AddFriend />);
    const [active, setActive] = useState(1);
    useEffect(() => {
        if (active === 1) {
            setView(<AddFriend />);
        } else if (active === 2) {
            setView(<MyFriend />);
        } else if (active === 3) setView(<FriendInvite />);
    }, [active]);

    const handleClick = (i) => {
        setActive(i);
    };
    return (
        <div className="friend">
            <div className="friend-nav">
                <div
                    onClick={() => handleClick(1)}
                    className={active === 1 ? 'friend-navIcon active-v2' : 'friend-navIcon'}
                >
                    {active === 1 ? (
                        <i className="fa-solid fa-user-plus"></i>
                    ) : (
                        <i className="fa-light fa-user-plus"></i>
                    )}
                </div>
                <div
                    onClick={() => handleClick(2)}
                    className={active === 2 ? 'friend-navIcon active-v2' : 'friend-navIcon'}
                >
                    {active === 2 ? <i className="fa-solid fa-users"></i> : <i className="fa-light fa-users"></i>}
                </div>
                <div
                    onClick={() => handleClick(3)}
                    className={active === 3 ? 'friend-navIcon active-v2' : 'friend-navIcon'}
                >
                    <i className="fa-duotone fa-envelope"></i>
                </div>
            </div>
            <div className="friend-view">{view}</div>
        </div>
    );
};

export default Friend;
