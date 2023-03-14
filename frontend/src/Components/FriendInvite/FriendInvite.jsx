import React, { useEffect, useState } from 'react';
import FriendReceive from './FriendReceive';
import FriendSend from './FriendSend';
import InfoFrReceive from './InfoFrReceive';
import InfoFrSend from './InfoFrSend';
import './friendInvite.scss';

const FriendInvite = () => {
    const [active, setActive] = useState(1);
    const [view, setView] = useState(<FriendSend />);
    const [info, setInfo] = useState(<InfoFrSend />);
    useEffect(() => {
        if (active === 1) {
            setView(<FriendSend />);
            setInfo(<InfoFrSend />);
        } else {
            setView(<FriendReceive />);
            setInfo(<InfoFrReceive />);
        }
    }, [active]);
    const handleClick = (i) => {
        setActive(i);
    };
    return (
        <div className="myFriend">
            <div className="myFriend-List">
                <div className="friendInvite-box">
                    <span onClick={() => handleClick(1)} className={active === 1 ? 'first' : 'second'}>
                        Đã nhận
                    </span>
                    <span onClick={() => handleClick(2)} className={active === 2 ? 'second-border' : 'first-border'}>
                        Đã gửi
                    </span>
                    <div className="addFriend-search">
                        <i className="fa-duotone fa-magnifying-glass"></i>
                        <input type="text" placeholder="Tìm kiếm" />
                    </div>
                </div>
                {view}
            </div>
            {info}
        </div>
    );
};

export default FriendInvite;
