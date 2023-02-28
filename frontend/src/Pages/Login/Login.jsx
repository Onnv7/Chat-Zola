import React from 'react';
import './login.scss';
import { CloseCircle } from 'iconsax-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    return (
        <div>
            <div className="login">
                <div className="login-container">
                    <span>Đăng nhập</span>
                    <div className="login-content">
                        <div className="login-text">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input type="text" placeholder="Email" />
                        </div>
                        <div className="login-text">
                            <FontAwesomeIcon icon={faKey} />
                            <input type="password" placeholder="Mật khẩu" />
                        </div>
                        <div className="login-fail">
                            <CloseCircle size="18" variant="Bold" />
                            <span>
                                Tài khoản hoặc mật khẩu không chính xác. Nếu quên mật khẩu hãy nhấn quên mật khẩu để đặt
                                lại mật khẩu mới.
                            </span>
                        </div>
                        <button>Đăng nhập</button>
                        <div className="login-help">
                            <div className="login-rememberPass">
                                <input type="checkbox" />
                                <span>Nhớ mật khẩu</span>
                            </div>
                            <span>Quên mật khẩu ?</span>
                        </div>
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

export default Login;
