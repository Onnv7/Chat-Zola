import React, { useState, useContext } from 'react';

import axios from '../../Hooks/axios.js';
import { AuthContext } from '../../Contexts/AuthContext.js';
const ChangePass = ({ setOpen }) => {
    const { user } = useContext(AuthContext);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [rePass, setRePass] = useState("");
    const [checkOldPass, setCheckOldPass] = useState(true);
    const [checkNewPass, setCheckNewPass] = useState(true);
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
    const handleChangePwd = async (e) => {
        try {
            setCheckNewPass(true);
            setCheckOldPass(true)
            if(newPass !== rePass) {
                console.log("???")
                setCheckNewPass(false);
                return;
            }
            const { data } = await axios.patch(`/auth/change-password/${user._id}`, {
                email: user.email,
                password: oldPass,
                newPwd: newPass
            })
            if(data.success)
            {
                console.log("okkkkkkkkkkkk")
            }
            else {
                setCheckOldPass(false)
                return;
            }
        } catch (error) {
            
        }
    }
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
                                <input type={show1 ? 'text' : 'password'} 
                                onChange={(e) => setOldPass(e.target.value)}
                                />
                                <i
                                    onClick={handleClick1}
                                    className={show1 ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
                                ></i>
                            </div>
                        </div>
                        {!checkOldPass && <div className="changePassword-check">
                            <i className="fa-solid fa-circle-xmark"></i>
                            Mật khẩu cũ không chính xác
                        </div>}
                    </div>
                    <div className="changePassword-item">
                        <div className="changePassword-itemBox">
                            <span>Mật khẩu mới</span>
                            <div className="changePassword-input">
                                <input type={show2 ? 'text' : 'password'} 
                                onChange={(e) => setNewPass(e.target.value)}
                                />

                                <i
                                    onClick={handleClick2}
                                    className={show2 ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
                                ></i>
                            </div>
                        </div>
                        {/* {!checkNewPass && <div className="changePassword-check">
                            <i className="fa-solid fa-circle-xmark"></i>
                            Xác nhận mật khẩu không chính xác
                        </div>} */}
                    </div>
                    <div className="changePassword-item">
                        <div className="changePassword-itemBox">
                            <span>Xác nhận mật khẩu mới</span>
                            <div className="changePassword-input">
                                <input type={show3 ? 'text' : 'password'}
                                onChange={(e) => setRePass(e.target.value)} />

                                <i
                                    onClick={handleClick3}
                                    className={show3 ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
                                ></i>
                            </div>
                        </div>
                        {!checkNewPass && <div className="changePassword-check">
                            <i className="fa-solid fa-circle-xmark"></i>
                            Xác nhận mật khẩu không chính xác
                        </div>}
                    </div>
                </div>
                <button onClick={handleChangePwd}>
                    Đổi mật khẩu
                    <i className="fa-solid fa-arrow-right-from-arc"></i>
                </button>
            </div>
        </div>
    );
};

export default ChangePass;
