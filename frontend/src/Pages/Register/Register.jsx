import React from 'react';
import './register.scss';
import { CloseCircle, Mobile } from 'iconsax-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    return (
        <div>
            <div className="login">
                <div className="login-container">
                    <span>Đăng Ký</span>
                    <div className="login-content">
                        <div className="register-name">
                            <div className="login-text">
                                <FontAwesomeIcon icon={faUser} />
                                <input type="text" placeholder="Họ" />
                            </div>
                            <div className="login-text">
                                <FontAwesomeIcon icon={faUser} />
                                <input type="text" placeholder="Tên" />
                            </div>
                        </div>
                        <div className="login-text">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input type="text" placeholder="Email" />
                        </div>
                        <div className="regis-fail">
                            <CloseCircle size="18" variant="Bold" />
                            <span>Email đã được đăng ký bởi một tài khoản khác.</span>
                        </div>
                        <div className="login-text">
                            <Mobile size="32" color="#fff" />
                            <input type="number" placeholder="Số điện thoại" min={0} maxLength={10} />
                        </div>
                        <div className="regis-fail">
                            <CloseCircle size="18" variant="Bold" />
                            <span>Số điện thoại đã được đăng ký bởi một tài khoản khác.</span>
                        </div>
                        <div className="login-text">
                            <FontAwesomeIcon icon={faKey} />
                            <input type="password" placeholder="Mật khẩu" />
                        </div>
                        <div className="login-text">
                            <FontAwesomeIcon icon={faKey} />
                            <input type="password" placeholder="Xác nhận mật khẩu" />
                        </div>
                        <div className="regis-fail">
                            <CloseCircle size="18" variant="Bold" />
                            <span>Mật khẩu nhập lại không trùng khớp.</span>
                        </div>
                        <div className="regis-genderList">
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                />
                                <label class="form-check-label regis-genderItem" for="flexRadioDefault1">
                                    Nam
                                </label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                />
                                <label class="form-check-label regis-genderItem" for="flexRadioDefault1">
                                    Nữ
                                </label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                />
                                <label class="form-check-label regis-genderItem" for="flexRadioDefault1">
                                    Khác
                                </label>
                            </div>
                        </div>
                        <div className="regis-birth">
                            <FontAwesomeIcon icon={faCakeCandles} />
                            <input
                                placeholder="Sinh nhật"
                                type="text"
                                onFocus={(e) => (e.target.type = 'date')}
                                onBlur={(e) => (e.target.type = 'text')}
                            />
                        </div>
                        <button>Đăng Ký</button>
                        <div className="login-footer">
                            <span>Zola</span>
                        </div>
                        <div className="login-Regis">
                            <span>Bạn chưa có tài khoản?</span>
                            <span>Đăng kí ngay tại đây</span>
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
