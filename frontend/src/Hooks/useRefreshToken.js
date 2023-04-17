import useAuth from './useAuth';
import axios, { axiosPrivate } from './axios.js';
import { useNavigate } from 'react-router-dom';

const useRefreshToken = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const refresh = async () => {
        if (!localStorage.getItem('refresh_token')) {
            navigate("/login")
            return
        }
        const response = await axiosPrivate.post('/auth/refresh-token', {
            email: user.email
        });
        localStorage.setItem("access_token", response.data.token)
        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;
