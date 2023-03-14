import React, { useEffect, useState } from 'react';
import './beCalled.scss';
import NewWindow from 'react-new-window';
import Calling from '../Calling/Calling';

const BeCalled = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <div className="beCalled">
            <img src="../Img/Avatar.png" alt="" />
            <span>Ní 1</span>
            <span>muốn trò chuyện cùng bạn...</span>
            <div className="beCalled-icon">
                <div className="beCalled-Video" onClick={handleOpen}>
                    <i className="fa-regular fa-video"></i>
                </div>
                <div className="beCalled-cancel">
                    <i className="fa-regular fa-phone-slash"></i>
                </div>
            </div>
            {isOpen && (
                <NewWindow title="Calling" onClose={setIsOpen}>
                    <Calling />
                </NewWindow>
            )}
        </div>
    );
};

export default BeCalled;
