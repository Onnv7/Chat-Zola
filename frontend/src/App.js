import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
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
import { AuthContext } from './Contexts/AuthContext.js';
function App() {
    const { user } = useContext(AuthContext);
    const { callRealTime } = useContext(SocketClientContext);
    const { dispatch: updateSocket } = useContext(SocketClientContext);
    const [modalIsOpen, setModalIsOpen] = useState(callRealTime?.incomingCall);
    let { socket, peer, dispatch } = useContext(SocketClientContext);



    useEffect(() => {
        if (user) {
            const socket = io("ws://localhost:8900");
            const peer = new Peer();
            // let peerId
            peer.on('open', (id) => {
                socket.emit("addUser", { userId: user._id, peerId: id });
            })

            peer.on('call', (call) => {
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                getUserMedia({ audio: true, video: true }, (mediaStream) => {
                    console.log("Người nhận")

                    // userVideo.current.srcObject = mediaStream;
                    // userVideo.current.play();

                    call.answer(mediaStream);
                    // call.on('stream', (remoteStream) => {
                    //     remoteVideo.current.srcObject = remoteStream
                    //     remoteVideo.current.play();

                    // })
                });
            })

            // Cookies.set("userInfo", JSON.stringify(data));
            // dispatch({ type: "LOGIN_SUCCESS", payload: data });
            updateSocket({ type: "CONNECTED", payload: { socket: socket, peer: peer } });
        }
    }, []);
    useEffect(() => {
        setModalIsOpen(callRealTime?.incomingCall)
    }, [callRealTime?.incomingCall])

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleAccept = async () => {
        socket.emit("accept video call", ({ calleePeerID: peer._id, callerID: callRealTime.callerID }))

        const url = `/call`;
        const width = 800;
        const height = 600;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const newWindow = window.open(url, '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);

        newWindow.props = {
            peer: peer,
            socket: socket,
            callerID: "",
            calleeID: user._id,
        };
    }
    return (
        <BrowserRouter>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <h2>Modal Title</h2>
                <p>Modal content goes here.</p>
                <button onClick={closeModal}>Từ chối</button>
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
