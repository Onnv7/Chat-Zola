import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from '../../Hooks/axios.js';
import './register.scss';
import { CloseCircle, Mobile } from 'iconsax-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const navigate = useNavigate();
    const [check, setCheck] = useState({
        existedEmail: false,
        errorPwd: false,
    });
    const [info, setInfo] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
        gender: 'male',
        birthday: '',
    });

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleChecked = async (e) => {
        setInfo((prev) => ({ ...prev, gender: e.target.value }));
    };

    async function isExistedUser() {
        try {
            const { data: user } = await axios.get(`/user/get-profile?email=${info.email}`);
            if (user === null) {
                return false;
            }
            return true;
        } catch (error) {}
    }
    async function registerNewUser() {
        try {
            const { rePassword, ...user } = { ...info };
            const { data } = await axios.post('/auth/register', user);
            if (data.success) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error:' + error.message);
        }
    }

    const handleRegister = async () => {
        if (await isExistedUser()) {
            setCheck((prev) => ({
                ...prev,
                existedEmail: true,
            }));
            return;
        }
        if (info.password !== info.rePassword) {
            setCheck((prev) => ({
                ...prev,
                errorPwd: true,
            }));
            return;
        }
        setCheck((prev) => ({
            ...prev,
            existedEmail: false,
            errorPwd: false,
        }));
        if (await registerNewUser()) navigate('/login');
    };
    return (
        <div>
            <div className="login">
                <div className="login-container">
                    <span>????ng K??</span>
                    <div className="login-content">
                        <div className="register-name">
                            <div className="login-text">
                                <FontAwesomeIcon icon={faUser} />
                                <input id="name" type="text" placeholder="H??? v?? t??n" onChange={handleChange} />
                            </div>
                        </div>
                        {/* <div className="register-name">
                            <div className="login-text">
                                <FontAwesomeIcon icon={faUser} />
                                <input type="text" placeholder="H???" />
                            </div>
                            <div className="login-text">
                                <FontAwesomeIcon icon={faUser} />
                                <input type="text" placeholder="T??n" />
                            </div>
                        </div> */}
                        <div className="login-text">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input id="email" type="text" placeholder="Email" onChange={handleChange} />
                        </div>
                        {check.existedEmail && (
                            <div className="regis-fail">
                                <CloseCircle size="18" variant="Bold" />
                                <span>Email ???? ???????c ????ng k?? b???i m???t t??i kho???n kh??c.</span>
                            </div>
                        )}
                        {/* <div className="login-text">
                            <Mobile size="32" color="#fff" />
                            <input type="number" 
                                    placeholder="S??? ??i???n tho???i" 
                                    min={0} 
                                    maxLength={10} 
                                    onChange={(e) =>setUsername(e.target.value)}/>
                        </div> */}
                        {/* <div className="regis-fail">
                            <CloseCircle size="18" variant="Bold" />
                            <span>S??? ??i???n tho???i ???? ???????c ????ng k?? b???i m???t t??i kho???n kh??c.</span>
                        </div> */}
                        <div className="login-text">
                            <FontAwesomeIcon icon={faKey} />
                            <input id="password" type="password" placeholder="M???t kh???u" onChange={handleChange} />
                        </div>
                        <div className="login-text">
                            <FontAwesomeIcon icon={faKey} />
                            <input
                                id="rePassword"
                                type="password"
                                placeholder="X??c nh???n m???t kh???u"
                                onChange={handleChange}
                            />
                        </div>
                        {check.errorPwd && (
                            <div className="regis-fail">
                                <CloseCircle size="18" variant="Bold" />
                                <span>M???t kh???u nh???p l???i kh??ng tr??ng kh???p.</span>
                            </div>
                        )}
                        <div className="regis-genderList">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value={'male'}
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    checked={info.gender === 'male'}
                                    onChange={handleChecked}
                                />
                                <label className="form-check-label regis-genderItem" htmlFor="flexRadioDefault1">
                                    Nam
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value={'female'}
                                    name="flexRadioDefault"
                                    id="flexRadioDefault2"
                                    checked={info.gender === 'female'}
                                    onChange={handleChecked}
                                />
                                <label className="form-check-label regis-genderItem" htmlFor="flexRadioDefault2">
                                    N???
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value={'other'}
                                    name="flexRadioDefault"
                                    id="flexRadioDefault3"
                                    checked={info.gender === 'other'}
                                    onChange={handleChecked}
                                />
                                <label className="form-check-label regis-genderItem" htmlFor="flexRadioDefault3">
                                    Kh??c
                                </label>
                            </div>
                        </div>
                        <div className="regis-birth">
                            <FontAwesomeIcon icon={faCakeCandles} />
                            <input
                                id="birthday"
                                placeholder="Sinh nh???t"
                                type="text"
                                onFocus={(e) => (e.target.type = 'date')}
                                onBlur={(e) => (e.target.type = 'text')}
                                onChange={handleChange}
                            />
                        </div>
                        <button onClick={handleRegister}>????ng K??</button>
                        <div className="login-footer">
                            <span>Zola</span>
                        </div>
                        <div className="login-Regis">
                            <span>B???n ch??a c?? t??i kho???n?</span>
                            <span>????ng k?? ngay t???i ????y</span>
                        </div>
                    </div>
                </div>
                <div className="login-img">
                    <span>Zola</span>
                </div>
            </div>
        </div>
    );
};

export default Register;
