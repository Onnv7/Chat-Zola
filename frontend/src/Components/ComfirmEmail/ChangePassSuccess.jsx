import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassSuccess = ({ setActive, setShow }) => {
    const handleClose = () => {
        setShow(false);
        setActive(1);
        navigate('/login');
    };
    const navigate = useNavigate();
    return (
        <div className="changePassSuccess">
            <i onClick={handleClose} className="fa-solid fa-circle-xmark"></i>
            <span>Bạn Đã Kích hoạt Email thành công</span>
        </div>
    );
};

export default ChangePassSuccess;
