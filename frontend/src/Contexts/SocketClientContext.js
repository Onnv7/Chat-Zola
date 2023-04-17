import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { useReducer, useEffect, useContext, createContext } from "react";
import { AuthContext } from './AuthContext.js';

const INITIAL_STATE = {
    socket: null,
    callRealTime: {
        incomingCall: false,
        callerID: "",
    }
};

// socket.current.emit("addUser", user._id)



console.log("PEER SOCKET");

export const SocketClientContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "CONNECTED":
            return { ...state, ...action.payload };
        case "DISCONNECTED":
            return {
                ...state, callRealTime: {
                    incomingCall: false,
                    callerID: "",
                }
            };;
        default:
            return state;
    }
};

export const SocketClientContextProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    // const socket = io("ws://localhost:8900");

    const [state, dispatch] = useReducer(AuthReducer, { ...INITIAL_STATE });



    return (
        <SocketClientContext.Provider
            value={{
                socket: state.socket,
                callRealTime: state.callRealTime,
                dispatch,
            }}
        >
            {children}
        </SocketClientContext.Provider>
    );
};
