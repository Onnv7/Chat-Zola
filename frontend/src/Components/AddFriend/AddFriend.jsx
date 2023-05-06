import React, { useEffect, useState, useContext } from 'react';
import './addFriend.scss';
import axios from '../../Hooks/axios';
import AddFriendError from './AddFriendError';
import AddFriendInfo from './AddFriendInfo';
import { toast } from 'react-toastify';
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js"
import { AuthContext } from '../../Contexts/AuthContext.js';
const AddFriend = () => {
    const { user } = useContext(AuthContext);
    // console.log("🚀 ~ file: AddFriend.jsx:11 ~ AddFriend ~ user:", user)
    const axiosPrivate = useAxiosPrivate();
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const [view, setView] = useState();
    const [info, setInfo] = useState();
    const handleChange = (e) => {
        setEmail(e.target.value);
    };
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/user/get-profile-my-friend?my_id=${user._id}&friend_email=${email}`);
            setInfo(data);
        };
        fetchData();
    }, [email]);
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            if (info?.name != null) {
                setView(<AddFriendInfo info={info} setShow={setShow} />);
            } else setView(<AddFriendError setShow={setShow} />);
            setShow(true);
        }
    };
    return (
        <div className="addFriend">
            <div className="addFriend-search">
                <i className="fa-duotone fa-magnifying-glass"></i>
                <input type="email" placeholder="Tìm kiếm" onChange={handleChange} onKeyDown={handleSearch} />
            </div>
            {show && <div className="addFriend-modal">{view}</div>}
        </div>
    );
};

export default AddFriend;
