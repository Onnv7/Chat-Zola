import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "./../Contexts/AuthContext.js";
function ProtectedRoute({ children }) {
    const { state } = useContext(Auth);
    const { adminInfo } = state;
    return adminInfo ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
