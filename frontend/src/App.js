import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
function App() {
    const test = useRef();
    const { user } = useContext(AuthContext);
    // const { callRealTime } = useContext(SocketClientContext);
    // const { dispatch: updateSocket } = useContext(SocketClientContext);
    let { socket, peer, dispatch, callRealTime } = useContext(SocketClientContext);
    const [modalIsOpen, setModalIsOpen] = useState(callRealTime?.incomingCall);



    useEffect(() => {
        if (user) {
            const socket = io("ws://localhost:8900");
            const peer = null


            // Mở peer và thêm socket vào stack online
            // peer.on('open', (id) => {
            //     socket.emit("addUser", { userId: user._id, peerId: "" });
            // });
            socket.emit("addUser", { userId: user._id, peerId: "" });
            socket.on("incoming call", ({ callerID }) => {
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

            // viết sự kiện lắng nghe 'call' cho NGƯỜI NHẬN
            // peer.on('call', (call) => {
            //     var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            //     getUserMedia({ audio: true, video: true }, (mediaStream) => {
            //         console.log("Người nhận neffffffffffffffffff")

            //         // userVideo.current.srcObject = mediaStream;
            //         // userVideo.current.play();
            //         console.log("CALL = ", call)
            //         call.answer(mediaStream);
            //         // call.on('stream', (remoteStream) => {
            //         //     remoteVideo.current.srcObject = remoteStream
            //         //     remoteVideo.current.play();

            //         // })
            //     });
            // })



            dispatch({ type: "CONNECTED", payload: { socket: socket, peer: null } });
        }
    }, []);
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

        console.log("GỬI ĐIOIII: ", peer, socket);
        newWindow.props = {
            peer: null,
            socket: socket,
            callerID: callRealTime.callerID,
            calleeID: user._id,
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
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;
