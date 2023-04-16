import React, { useState } from 'react';

const VerifyEmail = ({ setShow, setActive }) => {
    const [email, setEmail] = useState();
    const handleClose = () => {
        setShow(false);
    };
    const handleCheck = () => {
        setActive(2);
    };
    const handleChange = (e) => {
        setEmail(e.target.value);
    };
    return (
        <div className="verifyEmail">
            <div className="verifyEmail-title">
                <i onClick={handleClose} className="fa-regular fa-arrow-right-to-arc"></i>
                <span>Xác thực Email</span>
            </div>
            <div className="verifyEmail-input">
                <span>Email</span>
                <input type="email" defaultValue={email} onChange={handleChange} />
            </div>
            <div className="verifyEmail-fail">
                <i className="fa-solid fa-circle-xmark"></i>
                <span>Email chưa được đăng ký</span>
            </div>
            <button onClick={handleCheck}>
                Xác thực
                <i className="fa-regular fa-arrow-right-to-arc"></i>
            </button>
        </div>
    );
};

export default VerifyEmail;
