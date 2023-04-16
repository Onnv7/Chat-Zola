import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Modal from "react-modal";

import { ToastContainer } from "react-toastify";
import Peer from "peerjs";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";

function App() {
    return (
        <BrowserRouter>
            <ToastContainer
                position="bottom-center"
                limit={1}
                autoClose={2000}
                pauseOnHover={false}
            />
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
