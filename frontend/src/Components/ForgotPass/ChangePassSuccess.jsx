import React from 'react';

const ChangePassSuccess = ({ setActive, setShow }) => {
    const handleClose = () => {
        setShow(false);
        setActive(1);
    };
    return (
        <div className="changePassSuccess">
            <i onClick={handleClose} className="fa-solid fa-circle-xmark"></i>
            <span>Mật khẩu mới đã được cập nhật</span>
        </div>
    );
};

export default ChangePassSuccess;
