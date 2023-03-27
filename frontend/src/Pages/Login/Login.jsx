<<<<<<< HEAD
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
=======
import React, { useState, useContext }from 'react';
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { SocketClientContext } from '../../Contexts/SocketClientContext.js';
>>>>>>> 23e8b060d144bd737bf96b3b6f1bb94cb4a46b4e
import './login.scss';
import axios from '../../Hooks/axios.js';
import { CloseCircle } from 'iconsax-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../Contexts/AuthContext.js';
import ForgotPass from '../../Components/ForgotPass/ForgotPass';
const Login = () => {
<<<<<<< HEAD
    const [show, setShow] = useState(false);
=======
    const { dispatch: updateSocket } = useContext(SocketClientContext);
    // const { updateSocket } = others.dispatch;
    // console.log("🚀 ~ file: Login.jsx:15 ~ Login ~ updateSocket:", updateSocket)
>>>>>>> 23e8b060d144bd737bf96b3b6f1bb94cb4a46b4e
    const [empty, setEmpty] = useState({
        email: false,
        password: false,
    });
    const { loading, error, dispatch } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const checkForm = () => {
        let flag = true;
        if (credentials.password === '') {
            setEmpty((prev) => ({
                ...prev,
                password: true,
            }));
            flag = false;
        } else if (credentials.email.trim() === '') {
            setEmpty((prev) => ({
                ...prev,
                email: true,
            }));
            flag = false;
        }
        if (!flag) return flag;
        setEmpty({
            password: false,
            email: false,
        });
        return flag;
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        if (checkForm() === false) return;
        try {
            const { data } = await axios.post('/auth/login', credentials, {
                withCredentials: true,
<<<<<<< HEAD
            });

            // Cookies.set("userInfo", JSON.stringify(data));
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            navigate('/home');
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err });
=======
              });
            const socket = io("ws://localhost:8900");
            const peer = new Peer();
            // let peerId
            peer.on('open', (id) => {
                socket.emit("addUser", { userId: data._id, peerId: id });
            })
            
            // Cookies.set("userInfo", JSON.stringify(data));
            dispatch({ type: "LOGIN_SUCCESS", payload: data });
            updateSocket({ type: "CONNECTED", payload: {socket: socket, peer: peer} });
            
            // socket.emit("addUser", data._id)
            navigate("/home")
              
        } catch (err) {
            console.error("CAIDIIIIIIIIIII")
            dispatch({ type: "LOGIN_FAILURE", payload: err });
>>>>>>> 23e8b060d144bd737bf96b3b6f1bb94cb4a46b4e
        }
    };
    return (
        <div>
            <div className="login">
                <div className="login-container">
                    <span>Đăng nhập</span>
                    <div className="login-content">
                        <div className="login-text">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input
                                type="text"
                                placeholder="Email"
                                id="email"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                        {empty.email && (
                            <>
                                <div className="empty-email">
                                    <CloseCircle size="15" variant="Bold" />
                                    <span>Không được để trống email</span>
                                </div>
                            </>
                        )}
                        <div className="login-text">
                            <FontAwesomeIcon icon={faKey} />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                id="password"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                        {empty.password && (
                            <>
                                <div className="empty-password">
                                    <CloseCircle size="15" variant="Bold" />
                                    <span>Không được để trống password</span>
                                </div>
                            </>
                        )}
                        {error && (
                            <>
                                <div className="login-fail">
                                    <CloseCircle size="18" variant="Bold" />
                                    <span>
                                        Tài khoản hoặc mật khẩu không chính xác. Nếu quên mật khẩu hãy nhấn quên mật
                                        khẩu để đặt lại mật khẩu mới.
                                    </span>
                                </div>
                            </>
                        )}
                        <button onClick={(e) => handleLogin(e)}>Đăng nhập</button>
                        <div className="login-help">
                            <div className="login-rememberPass">
                                <input type="checkbox" />
                                <span>Nhớ mật khẩu</span>
                            </div>
                            <span onClick={() => setShow(true)}>Quên mật khẩu ?</span>
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
            {show && (
                <div className="modal-recovery">
                    <ForgotPass setShow={setShow} />
                </div>
            )}
        </div>
    );
};

export default Login;
