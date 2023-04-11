import { createContext, useReducer } from "react";

export const Auth = createContext();
const initialState = {
    adminInfo: localStorage.getItem("adminInfo")
        ? JSON.parse(localStorage.getItem("adminInfo"))
        : null,
};
function reducer(state, action) {
    switch (action.type) {
        case "ADMIN_LOGIN": {
            return { ...state, adminInfo: action.payload };
        }
        case "ADMIN_LOGOUT": {
            return {
                ...state,
                adminInfo: null,
            };
        }
        default:
            return state;
    }
}
export function AuthProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Auth.Provider value={value}>{props.children} </Auth.Provider>;
}
