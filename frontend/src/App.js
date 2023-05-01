import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect, useRef } from 'react';
import Modal from 'react-modal';

import { io } from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import { SocketClientContext } from './Contexts/SocketClientContext.js';
import Peer from 'peerjs';
import 'react-toastify/dist/ReactToastify.css';
import Calling from './Components/Calling/Calling';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import GoiDien from './Test/GoiDien.jsx';
import GoiVIP from './Test/GoiVIP.jsx';
import ImageUploader from './Test/ImageUploader.jsx';
import { AuthContext } from './Contexts/AuthContext.js';
import useSocket from './Hooks/useSocket.js';
import axios from '../src/Hooks/axios.js';
import useAxiosPrivate from "./Hooks/useAxiosPrivate.js"
function App() {
    const test = useRef();
    const axiosPrivate = useAxiosPrivate()
    const { user } = useContext(AuthContext);
    // const { callRealTime } = useContext(SocketClientContext);
    // const { dispatch: updateSocket } = useContext(SocketClientContext);
    let { socket, peer, dispatch, callRealTime } = useContext(SocketClientContext);
    const [modalIsOpen, setModalIsOpen] = useState(callRealTime?.incomingCall);
    const [conversationId, setConversationId] = useState('');
    const [video, setVideo] = useState(false);
    const [callerId, setCallerId] = useState("")
    // const [calling, setCalling] = useState({caller: "", video: false});
    const [callerName, setCallerName] = useState("")
    useEffect(() => {
        if (user) {
            if (!socket) {
                socket = io('ws://localhost:8900');
            }
            socket = window.props?.socket ? window.props?.socket : socket;
            socket.emit('addUser', { userId: user._id });
            socket.on('incoming call', ({ callerID, video, conversationId }) => {
                setVideo(video);
                // console.log('NHẬN ĐƯỢC CUỘC GỌI TỪ', callerID, conversationId);
                setConversationId(conversationId);
                setCallerId(callerId)
                dispatch({
                    type: 'CONNECTED',
                    payload: {
                        callRealTime: {
                            incomingCall: true,
                            callerID,
                        },
                    },
                });
            });

            socket.on('ended calling', () => {
                setModalIsOpen(false);
                dispatch({
                    type: 'DISCONNECTED',
                    payload: null,
                });
            });

            dispatch({ type: 'CONNECTED', payload: { socket: socket, peer: null } });
        }
    }, [socket]);

    useEffect(() => {
        setModalIsOpen(callRealTime?.incomingCall);
        const fetch = async () => {
            const { data } = await axiosPrivate.get(`/user/get-profile/${callRealTime.callerID}`)
            setCallerName(data.name)
        }
        fetch();
        // console.log("object===============================", callRealTime)
    }, [callRealTime?.incomingCall]);

    const handleDeny = () => {
        setModalIsOpen(false);
        dispatch({
            type: 'DISCONNECTED',
            payload: null,
        });
        socket.emit('deny calling', { callerID: callRealTime.callerID });
    };
    const handleAccept = async () => {
        const url = `/call`;
        const width = 800;
        const height = 600;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const newWindow = window.open(url, '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);

        // console.log("GỬI ĐIOIII: ", socket);
        newWindow.props = {
            socket: socket,
            callerID: callRealTime.callerID,
            calleeID: user._id,
            video: video,
            conversationId: conversationId,
        };

        setModalIsOpen(false);
        dispatch({
            type: 'CONNECTED',
            payload: {
                callRealTime: {
                    incomingCall: false,
                },
            },
        });
    };
    window.removeEventListener('message', () => {
        console.log('XOA EVENT');
    });
    return (
        <>
            {console.log("open")}
            <Modal isOpen={modalIsOpen} onRequestClose={handleDeny} contentLabel="Example Modal">
                <h2>{callerName}</h2>
                <p>Đang gọi tới bạn</p>
                <div className="beCalled-btn">
                    <button onClick={handleDeny}>Từ chối</button>
                    <button onClick={handleAccept}>Chấp nhận</button>
                </div>
            </Modal>
            <ToastContainer position="bottom-center" limit={1} autoClose={2000} pauseOnHover={false} />
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="home" element={<Home />} />
                <Route path="call" element={<Calling />} />
                {/* <Route path="/an" element={<GoiDien />} />
                <Route path="/a" element={<GoiVIP />} /> */}
                <Route path="/upload" element={<ImageUploader />} />
            </Routes>
        </>
    );
}

export default App;
