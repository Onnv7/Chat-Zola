import React, { useState } from 'react';

const DetailMeetJoin = ({ setOpen }) => {
    const [show, setShow] = useState(false);
    const handleClick = () => {
        if (show === false) setShow(true);
        else setShow(false);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="meet-modalContainer-v2">
            <div className="meet-modalBox">
                <div className="meet-modalTitle">
                    <i onClick={handleClose} class="fa-solid fa-arrow-right-to-arc"></i>
                    <span>Chi tiết buổi gặp gỡ</span>
                </div>
                <div className="meet-modalContent-v2">
                    <span>ID buổi gặp gỡ</span>
                    <div className="meet-modalInput">
                        <input type="text" />
                    </div>
                    <span>Tiêu đề buổi gặp gỡ</span>
                    <div className="meet-modalInput">
                        <input type="text" />
                    </div>
                    <span>Mật khẩu</span>
                    <div className="meet-modalInput">
                        <input type={show ? 'text' : 'password'} />
                        <i onClick={handleClick} class={show ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailMeetJoin;
