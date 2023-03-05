import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faClipboardList, faGear, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons';
import { SearchNormal } from 'iconsax-react';
import MessengerTab from '../MessengerTab/MessengerTab';
import './sidebarNav.scss';

const SidebarNav = () => {
    return (
        <nav className="sidebarNav">
            <div className="main-tab">
                <div className="main-img">
                    <img src="../Img/Avatar.png" alt="Avatar" />
                </div>
                <div className="mainTool-box">
                    <div className="mainTool-List">
                        <div className="mainTool-Item active">
                            <FontAwesomeIcon icon={faCommentDots} />
                        </div>
                        <div className="mainTool-Item">
                            <FontAwesomeIcon icon={faUserGroup} />
                        </div>
                        <div className="mainTool-Item">
                            <FontAwesomeIcon icon={faClipboardList} />
                        </div>
                        <div className="mainTool-Item">
                            <FontAwesomeIcon icon={faVideo} />
                        </div>
                    </div>
                    <div className="mainTool-list">
                        <div className="mainTool-Item">
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="sub-tab">
                <div className="subTab-Search">
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
                <div className="subTab-type">
                    <MessengerTab />
                </div>
            </div>
        </nav>
    );
};

export default SidebarNav;
