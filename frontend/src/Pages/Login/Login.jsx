import React, { useState, useContext }from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './login.scss';
import axios from "../../Hooks/axios.js"
import { CloseCircle } from 'iconsax-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../Contexts/AuthContext.js';
const Login = () => {
    const [empty, setEmpty] = useState({
        email: false,
        password: false,
    });
    const { loading, error, dispatch } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const checkForm = () => {
        let flag = true;
        if(credentials.password === "" )
        {
            setEmpty((prev)=> ({
                ...prev,
                password: true
            }))
            flag = false;
        }
        else if(credentials.email.trim() === "" )
        {
            setEmpty((prev)=> ({
                ...prev,
                email: true
            }))
            flag = false;
        }
        if(!flag)
            return flag;
        setEmpty({
            password: false,
            email: false
        })
        return flag;
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        if(checkForm() === false)
            return;
        try {
            const { data } = await axios.post("/auth/login", credentials, {
                withCredentials: true,
              });
            
            // Cookies.set("userInfo", JSON.stringify(data));
            dispatch({ type: "LOGIN_SUCCESS", payload: data });
            navigate("/home")
              
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err });
        }
    }
    return (
        <div>
            <div className="login">
                <div className="login-container">
                    <span>Đăng nhập</span>
                    <div className="login-content">
                        <div className="login-text">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input type="text" 
                                placeholder="Email" 
                                id="email"
                                onChange={(e) =>  {handleChange(e)}}/>
                        </div>
                        {empty.email && (<>
                            <div className="empty-email">
                            
                                <CloseCircle size="15" variant="Bold" />
                                <span>
                                    Không được để trống email
                                </span>
                            </div>
                        </>)}
                        <div className="login-text">
                            <FontAwesomeIcon icon={faKey} />
                            <input type="password" 
                                placeholder="Mật khẩu" 
                                id="password"
                                onChange={(e) =>  {handleChange(e)}}/>
                        </div>
                        {empty.password && (<>
                            <div className="empty-password">
                            
                                <CloseCircle size="15" variant="Bold" />
                                <span>
                                    Không được để trống password
                                </span>
                            </div>
                        </>)}
                        {error && (<>
                            <div className="login-fail">
                            
                                <CloseCircle size="18" variant="Bold" />
                                <span>
                                    Tài khoản hoặc mật khẩu không chính xác. Nếu quên mật khẩu hãy nhấn quên mật khẩu để đặt
                                    lại mật khẩu mới.
                                </span>
                            </div>
                        </>)}
                        <button onClick={(e) => handleLogin(e)}>Đăng nhập</button>
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
