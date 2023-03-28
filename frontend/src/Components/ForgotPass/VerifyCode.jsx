import React from 'react';

const VerifyCode = ({ setActive }) => {
    const handleBack = () => {
        setActive(1);
    };
    const handleCheck = () => {
        setActive(3);
    };
    return (
        <div className="verifyCode">
            <div className="verifyEmail-title">
                <i onClick={handleBack} className="fa-regular fa-arrow-right-to-arc"></i>
                <span>Mã xác thực</span>
            </div>
            <span>Mã xác thực sẽ được gửi đến email</span>
            <span>123@gmail.com</span>
            <div className="verifyCode-input">
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
            </div>
            <span>Bạn chưa nhận được mã xác nhận ?</span>
            <span className="re-verifyCode">Đặt lại mã</span>
            <button onClick={handleCheck}>
                Tiếp tục
                <i className="fa-regular fa-arrow-right-to-arc"></i>
            </button>
            <div className="verifyCode-fail">
                <i className="fa-solid fa-circle-xmark"></i>
                <span>Mã xác thực không chính xác</span>
            </div>
        </div>
    );
};

export default VerifyCode;
