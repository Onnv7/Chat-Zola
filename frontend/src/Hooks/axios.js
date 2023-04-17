import axios from "axios";
import { useNavigate } from 'react-router-dom';

const http = axios.create({
    baseURL: "http://localhost:8800/backend",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },

});


export const axiosPrivate = axios.create({
    baseURL: "http://localhost:8800/backend",
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});


export default http;
