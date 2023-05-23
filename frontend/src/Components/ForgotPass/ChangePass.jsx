import axios from '../../Hooks/axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ChangePass = ({ setActive, email }) => {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [password, setPassword] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const handleClick1 = () => {
        if (show1 === false) setShow1(true);
        else setShow1(false);
    };
    const handleClick2 = () => {
        if (show2 === false) setShow2(true);
        else setShow2(false);
    };
    const handleBack = () => {
        setActive(2);
    };
    const handleCheck = async () => {
        if (error2 === false) {
            try {
                const { data } = await axios.post('/auth/get-new-password', {
                    email: email,
                    password: password.newPassword,
                });
                if (data.success === true) {
                    setActive(4);
                    toast.success('Đổi mật khẩu thành công');
                }
            } catch (err) {
                toast.error(err.message);
            }
        } else {
            setError2(true);
        }
    };
    const handleChange = (e) => {
        setPassword((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setError2(false);
    };
    const checkLength = () => {
        if (password.newPassword.length < 6) {
            setError1(true);
        } else setError1(false);
    };
    const checkSame = () => {
        if (password.newPassword === password.confirmPassword) setError2(false);
        else setError2(true);
    };
    return (
        <div className="changePassword">
            <div className="changePassword-box">
                <div className="changePassword-title">
                    <i onClick={handleBack} className="fa-solid fa-arrow-right-to-arc"></i>
                    <span>Thay đổi mật khẩu</span>
                </div>
                <div className="changePassword-List">
                    <div className="changePassword-item">
                        <div className="changePassword-itemBox">
                            <span>Mật khẩu mới</span>
                            <div className="changePassword-input">
                                <input
                                    type={show1 ? 'text' : 'password'}
                                    id="newPassword"
                                    onChange={handleChange}
                                    onBlur={checkLength}
                                />

                                <i
                                    onClick={handleClick1}
                                    className={show1 ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
                                ></i>
                            </div>
                        </div>
                        {error1 && (
                            <div className="changePassword-check">
                                <i className="fa-solid fa-circle-xmark"></i>
                                Mật khẩu mới cần ít nhất 6 kí tự
                            </div>
                        )}
                    </div>
                    <div className="changePassword-item">
                        <div className="changePassword-itemBox">
                            <span>Xác nhận mật khẩu mới</span>
                            <div className="changePassword-input">
                                <input
                                    type={show2 ? 'text' : 'password'}
                                    id="confirmPassword"
                                    onChange={handleChange}
                                    onBlur={checkSame}
                                />

                                <i
                                    onClick={handleClick2}
                                    className={show2 ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
                                ></i>
                            </div>
                        </div>
                        {error2 && (
                            <div className="changePassword-check">
                                <i className="fa-solid fa-circle-xmark"></i>
                                Xác nhận mật khẩu mới chưa chính xác
                            </div>
                        )}
                    </div>
                    <button onClick={handleCheck} className="changePass-btn">
                        Đổi mật khẩu
                        <i className="fa-regular fa-arrow-right-to-arc"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePass;
