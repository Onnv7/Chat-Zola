import { axiosPrivate } from "./axios.js";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth.js";
import { useState } from 'react';


const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { user } = useAuth();
    const [token, setToken] = useState(localStorage.getItem("access_token"))
    const refreshToken = localStorage.getItem("refresh_token");

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`;
                    config.headers['refreshtoken'] = `${refreshToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403 || error?.response?.status === 410 || error?.response?.status === 401 || error?.response?.status === 498) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [token, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;