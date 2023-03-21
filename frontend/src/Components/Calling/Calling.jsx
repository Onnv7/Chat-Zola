import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './calling.scss';

const Calling = ({ setIsOpen }) => {
    const location = useLocation();
    const params = new URLSearchParams(window.location.search);
    const encodedSocketId = params.get('socketId');
    const encodedPeerId = params.get('peerId');
    const socketId = window.atob(encodedSocketId);
    const peerId = window.atob(encodedPeerId);
    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    function handleBeforeUnload(e) {
        e.preventDefault();
        setIsOpen(false);
    }
    return (
        <div className="calling">
            <div className="calling-box">
                <img src="../Img/Avatar1.png" alt="" />
                <span>Friend A</span>
                <span>Đang gọi ...</span>
            </div>
            <div className="calling-icon">
                <div className="calling-hideVideo">
                    <i class="fa-regular fa-video"></i>
                    <i className="hide fa-regular fa-video-slash "></i>
                </div>
                <div className="calling-muteMic">
                    <i class="fa-regular fa-microphone"></i>
                    <i class="hide fa-regular fa-microphone-slash "></i>
                </div>
                <div className="calling-cancelPhone">
                    <i class="fa-regular fa-phone-slash"></i>
                </div>
            </div>
        </div>
    );
};

export default Calling;
