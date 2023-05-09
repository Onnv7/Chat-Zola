import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faClipboardList, faGear, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons';
import './sidebarNav.scss';
import { AuthContext } from '../../Contexts/AuthContext.js';

const SidebarNav = ({ handleClick, subClick }) => {
    const { user } = useContext(AuthContext);
    const [show, setShow] = useState(1);
    const setClick = (i) => {
        setShow(i);
        handleClick(i);
    };
    const setSubClick = (i) => {
        subClick(i);
    };

    return (
        <nav className="sidebarNav">
            <div className="main-tab">
                <div onClick={() => setClick(3)} className={show === 4 ? 'main-img active' : 'main-img'}>
                    <img src={user?.avatar !== '' && user.avatar ? user.avatar : '../Img/Avatar.png'} alt="Avatar" />
                </div>
                <div className="mainTool-box">
                    <div className="mainTool-List">
                        <div
                            onClick={() => setClick(1)}
                            className={show === 1 ? 'mainTool-Item active' : 'mainTool-Item'}
                        >
                            <FontAwesomeIcon icon={faCommentDots} />
                            {/* <div className="red-dot"> </div> */}
                        </div>
                        <div
                            onClick={() => setClick(2)}
                            className={show === 2 ? 'mainTool-Item active' : 'mainTool-Item'}
                        >
                            <FontAwesomeIcon icon={faUserGroup} />
                            {/* <div className="red-dot"></div> */}
                        </div>
                    </div>
                    <div className="mainTool-list">
                        <div className="mainTool-Item" onClick={() => setSubClick(2)}>
                            <i className="fa-solid fa-bug"></i>
                        </div>
                        <div className="mainTool-Item" onClick={() => setSubClick(1)}>
                            <i className="logout-around fa-solid fa-arrow-right-to-arc"></i>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SidebarNav;
