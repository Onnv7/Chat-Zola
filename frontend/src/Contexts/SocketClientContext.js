import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { useReducer, useEffect, useContext, createContext } from "react";
import { AuthContext } from './AuthContext.js';

const INITIAL_STATE = {
    socket: null,
    peer: null,
    callRealTime: {
        incomingCall: false,
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
            return INITIAL_STATE;
        default:
            return state;
    }
};

export const SocketClientContextProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    // const socket = io("ws://localhost:8900");

    const [state, dispatch] = useReducer(AuthReducer, { ...INITIAL_STATE });
    useEffect(() => {
        const peer = new Peer();

        // peer.on('open', (id) => {
        //     dispatch({ type: "CONNECTED", payload: { peer } });
        //     socket.emit("addUser", { userId: user._id, peerId: id });
        //     // setPeerId(id);
        // })
        // socket.on("getUsers", users => console.log("ONLINE:", users));



    }, [])

    // useEffect(() => {
    //     socket.emit("addUser", { userId: user._id, peerId: "NOOOO" });
    //     socket.on("getUsers", users => console.log("ONLINE:", users));
    // }, [])


    return (
        <SocketClientContext.Provider
            value={{
                peer: state.peer,
                socket: state.socket,
                callRealTime: state.callRealTime,
                dispatch,
            }}
        >
            {children}
        </SocketClientContext.Provider>
    );
};
