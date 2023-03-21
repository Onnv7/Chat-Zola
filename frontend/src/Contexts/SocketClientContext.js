import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { useReducer, useEffect, useContext, createContext } from "react";
import { AuthContext } from './AuthContext.js';

const INITIAL_STATE = {
    socket: null,
    peer: null,
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

    const socket = io("ws://localhost:8900");

    const peer = new Peer();

    const [state, dispatch] = useReducer(AuthReducer, { ...INITIAL_STATE, peer, socket });

    useEffect(() => {
        let peerId;
        dispatch({ type: "CONNECTED", payload: { socket } });
        const setup = async () => {
            await peer.on('open', (id) => {
                console.log("🚀 CONTEXT:", id)
                peerId = id
                // setPeerId(id);
            });
            await socket.emit("addUser", { userId: user._id, peerId })
            await socket.on("getUsers", users => console.log("ONLINE:", users))

        }
        setup();


    }, [])


    return (
        <SocketClientContext.Provider
            value={{
                peer: state.peer,
                socket: state.socket,
                dispatch,
            }}
        >
            {children}
        </SocketClientContext.Provider>
    );
};
