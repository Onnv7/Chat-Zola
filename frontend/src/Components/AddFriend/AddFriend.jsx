import React, { useEffect, useState } from 'react';
import './addFriend.scss';
import axios from '../../Hooks/axios';
import AddFriendError from './AddFriendError';
import AddFriendInfo from './AddFriendInfo';
import { toast } from 'react-toastify';
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js"

const AddFriend = () => {
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
            const { data } = await axiosPrivate.get(`/user/get-profile?email=${email}`);
            setInfo(data);
        };
        fetchData();
    }, [email]);
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setShow(true);
            if (info != null) {
                setView(<AddFriendInfo info={info} setShow={setShow} />);
            } else setView(<AddFriendError setShow={setShow} />);
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
