import { SearchNormal } from 'iconsax-react';
import React, { useState } from 'react';
import Chat from '../Chat/Chat';
import './messengerTab.scss';

const MessengerTab = () => {
    const [active, setActive] = useState(1);
    const handleClick = (i) => {
        setActive(i);
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
                    <div className={active === 1 ? 'messengerTab-item active-chat' : 'messengerTab-item'}>
                        <div className="messengerTab-friend">
                            <img src="../Img/Avatar1.png" alt="" />
                            <div className="messengerTab-prop">
                                <span>Friend A</span>
                                <span>Mai tôi sẽ đến đón bạn</span>
                            </div>
                        </div>
                    </div>
                    <div className="messengerTab-item">
                        <div className="messengerTab-friend">
                            <img src="../Img/Avatar1.png" alt="" />
                            <div className="messengerTab-prop">
                                <span>Friend A</span>
                                <span>Mai tôi sẽ đến đón bạn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="messgerTab-chat">
                <Chat />
            </div>
        </div>
    );
};

export default MessengerTab;
