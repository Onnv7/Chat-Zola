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
import GoiDien from './Test/GoiDien.jsx'
import GoiVIP from './Test/GoiVIP.jsx'
import ImageUploader from './Test/ImageUploader.jsx'
import { AuthContext } from './Contexts/AuthContext.js';
import useSocket from "./Hooks/useSocket.js"
import axios from "../src/Hooks/axios.js"
function App() {
    const test = useRef();
    const { user } = useContext(AuthContext);
    // const { callRealTime } = useContext(SocketClientContext);
    // const { dispatch: updateSocket } = useContext(SocketClientContext);
    let { socket, peer, dispatch, callRealTime } = useContext(SocketClientContext);
    const [modalIsOpen, setModalIsOpen] = useState(callRealTime?.incomingCall);

    const [video, setVideo] = useState(false);
    useEffect(() => {
        if (user) {

            if (!socket) {
                socket = io("ws://localhost:8900");
            }
            socket = window.props?.socket ? window.props?.socket : socket
            socket.emit("addUser", { userId: user._id });
            socket.on("incoming call", ({ callerID, video }) => {
                setVideo(video)
                console.log("NHẬN ĐƯỢC CUỘC GỌI TỪ", callerID)
                setModalIsOpen(true)
                dispatch({
                    type: "CONNECTED",
                    payload: {
                        callRealTime: {
                            incomingCall: true,
                            callerID
                        }
                    }
                })
            });

            socket.on('ended calling', () => {
                setModalIsOpen(false)
                dispatch({
                    type: "DISCONNECTED",
                    payload: null,
                });
            })


            dispatch({ type: "CONNECTED", payload: { socket: socket, peer: null } });
        }
    }, [socket]);
    useEffect(() => {
        setModalIsOpen(callRealTime?.incomingCall)
    }, [callRealTime?.incomingCall])

    const handleDeny = () => {
        setModalIsOpen(false);
        dispatch({
            type: "DISCONNECTED",
            payload: null,
        });
        socket.emit('deny calling', { callerID: callRealTime.callerID })

    };
    const handleAccept = async () => {
        // socket.emit("accept video call", ({ calleePeerID: peer._id, callerID: callRealTime.callerID }))

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
            video: video
        };

        setModalIsOpen(false);
        dispatch({
            type: "CONNECTED",
            payload: {
                callRealTime: {
                    incomingCall: false,
                }
            }
        });
    }
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleDeny}
                contentLabel="Example Modal"
            >
                <h2>Modal Title</h2>
                <p>Modal content goes here.</p>
                <button onClick={handleDeny}>Từ chối</button>
                <button onClick={handleAccept}>Chấp nhận</button>
            </Modal>
            <ToastContainer position="bottom-center" limit={1} autoClose={2000} pauseOnHover={false} />
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="home" element={<Home />} />
                <Route path="call" element={<Calling />} />
                <Route path="/an" element={<GoiDien />} />
                <Route path="/a" element={<GoiVIP />} />
                <Route path="/upload" element={<ImageUploader />} />
            </Routes>
        </>
    );
}

export default App;
