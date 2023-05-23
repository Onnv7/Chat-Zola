import axios from '../../Hooks/axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const VerifyCode = ({ setActive, email, codes }) => {
    const [code1, setCode1] = useState();
    const [code2, setCode2] = useState();
    const [code3, setCode3] = useState();
    const [code4, setCode4] = useState();
    const [code5, setCode5] = useState();
    const [code6, setCode6] = useState();
    const [fail, setFail] = useState(false);
    const [newCode, setNewCode] = useState(codes);
    const [inputChanged, setInputChanged] = useState(false);
    console.log(codes);
    const handleBack = () => {
        setActive(1);
    };
    const code = code1 + code2 + code3 + code4 + code5 + code6;
    const handleCheck = () => {
        if (newCode.toString() === code) {
            setActive(3);
            setFail(false);
        } else setFail(true);
    };
    const handleResend = async () => {
        try {
            const { data } = await axios.post('/auth/send-confirmation-code?mode=forget', {
                email: email,
            });
            setNewCode(data.result);
            toast.success('Đã gửi lại mã');
        } catch (err) {
            toast.error(err.message);
        }
    };
    const handleInputChange = () => {
        if (!inputChanged) setInputChanged(true);
        setFail(false);
    };
    return (
        <div className="verifyCode">
            <div className="verifyEmail-title">
                <i onClick={handleBack} className="fa-regular fa-arrow-right-to-arc"></i>
                <span>Mã xác thực</span>
            </div>
            <span>Mã xác thực sẽ được gửi đến email</span>
            <span>{email}</span>
            <div className="verifyCode-input">
                <input
                    type="text"
                    maxLength={1}
                    defaultValue={code1}
                    onChange={(e) => {
                        setCode1(e.target.value);
                        handleInputChange();
                    }}
                />
                <input
                    type="text"
                    maxLength={1}
                    defaultValue={code2}
                    onChange={(e) => {
                        setCode2(e.target.value);
                        handleInputChange();
                    }}
                />
                <input
                    type="text"
                    maxLength={1}
                    defaultValue={code3}
                    onChange={(e) => {
                        setCode3(e.target.value);
                        handleInputChange();
                    }}
                />
                <input
                    type="text"
                    maxLength={1}
                    defaultValue={code4}
                    onChange={(e) => {
                        setCode4(e.target.value);
                        handleInputChange();
                    }}
                />
                <input
                    type="text"
                    maxLength={1}
                    defaultValue={code5}
                    onChange={(e) => {
                        setCode5(e.target.value);
                        handleInputChange();
                    }}
                />
                <input
                    type="text"
                    maxLength={1}
                    defaultValue={code6}
                    onChange={(e) => {
                        setCode6(e.target.value);
                        handleInputChange();
                    }}
                />
            </div>
            <span>Bạn chưa nhận được mã xác nhận ?</span>
            <span className="re-verifyCode" onClick={handleResend}>
                Đặt lại mã
            </span>
            <button onClick={handleCheck}>
                Tiếp tục
                <i className="fa-regular fa-arrow-right-to-arc"></i>
            </button>
            {fail && (
                <div className="verifyCode-fail">
                    <i className="fa-solid fa-circle-xmark"></i>
                    <span>Mã xác thực không chính xác</span>
                </div>
            )}
        </div>
    );
};

export default VerifyCode;
