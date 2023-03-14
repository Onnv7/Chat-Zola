import React, { useState } from 'react';

const ChangePass = ({ setOpen }) => {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const handleClick1 = () => {
        if (show1 === false) setShow1(true);
        else setShow1(false);
    };
    const handleClick2 = () => {
        if (show2 === false) setShow2(true);
        else setShow2(false);
    };
    const handleClick3 = () => {
        if (show3 === false) setShow3(true);
        else setShow3(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="changePassword">
            <div className="changePassword-box">
                <div className="changePassword-title">
                    <i onClick={handleClose} className="fa-solid fa-arrow-right-to-arc"></i>
                    <span>Thay đổi mật khẩu</span>
                </div>
                <div className="changePassword-List">
                    <div className="changePassword-item">
                        <div className="changePassword-itemBox">
                            <span>Mật khẩu cũ</span>
                            <div className="changePassword-input">
                                <input type={show1 ? 'text' : 'password'} />

                                <i
                                    onClick={handleClick1}
                                    className={show1 ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
                                ></i>
                            </div>
                        </div>
                        <div className="changePassword-check">
                            <i className="fa-solid fa-circle-xmark"></i>
                            Mật khẩu cũ không chính xác
                        </div>
                    </div>
                    <div className="changePassword-item">
                        <div className="changePassword-itemBox">
                            <span>Mật khẩu mới</span>
                            <div className="changePassword-input">
                                <input type={show2 ? 'text' : 'password'} />

                                <i
                                    onClick={handleClick2}
                                    className={show2 ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
                                ></i>
                            </div>
                        </div>
                        <div className="changePassword-check">
                            <i className="fa-solid fa-circle-xmark"></i>
                            Mật khẩu cũ không chính xác
                        </div>
                    </div>
                    <div className="changePassword-item">
                        <div className="changePassword-itemBox">
                            <span>Xác nhận mật khẩu mới</span>
                            <div className="changePassword-input">
                                <input type={show3 ? 'text' : 'password'} />

                                <i
                                    onClick={handleClick3}
                                    className={show3 ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
                                ></i>
                            </div>
                        </div>
                        <div className="changePassword-check">
                            <i className="fa-solid fa-circle-xmark"></i>
                            Mật khẩu cũ không chính xác
                        </div>
                    </div>
                </div>
                <button>
                    Đổi mật khẩu
                    <i className="fa-solid fa-arrow-right-from-arc"></i>
                </button>
            </div>
        </div>
    );
};

export default ChangePass;
