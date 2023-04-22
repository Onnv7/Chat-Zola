import { axiosPrivate } from "./axios.js";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth.js";
import { useState } from 'react';
import { io } from 'socket.io-client';


const useSocket = () => {

    const refresh = useRefreshToken();
    const [token, setToken] = useState(localStorage.getItem("access_token"))
    useEffect(() => {
        const socket = io("ws://localhost:8900");
        return socket;
    }, [token, refresh])


}

export default useSocket;