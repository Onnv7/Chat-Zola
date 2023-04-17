import { useContext, useDebugValue } from "react";
import { AuthContext } from './../Contexts/AuthContext';

const useAuth = () => {
    const { user } = useContext(AuthContext);
    useDebugValue(user, user => user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;