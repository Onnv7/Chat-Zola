import React, { useEffect } from 'react';
import './calling.scss';

const Calling = ({ setIsOpen }) => {
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
