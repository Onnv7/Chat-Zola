import React, { useContext, useEffect, useState } from 'react';
import axios from '../../Hooks/axios';
import { format, parseISO } from 'date-fns';
import { AuthContext } from '../../Contexts/AuthContext';
import { toast } from 'react-toastify';
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js"

const InfoFrSend = ({ setIds, ids }) => {
    const axiosPrivate = useAxiosPrivate();
    const { user } = useContext(AuthContext);
    const [info, setInfo] = useState();
    const [date, setDate] = useState();
    useEffect(() => {
        const fetchData = async () => {
            if (ids) {
                const { data } = await axiosPrivate.get(`/user/get-profile/${ids}`);
                setInfo(data);
                const birth = parseISO(data.birthday);
                const date = format(birth, 'dd/MM/yyyy');
                setDate(date);
            }
        };
        fetchData();
    }, [ids]);
    const handleUnsend = async () => {
        try {
            await axiosPrivate.post('/user/unsend-friend-request', {
                receiverId: info._id,
                senderId: user._id,
            });
            setIds(null);
            toast.success('Hủy lời mời thành công');
        } catch (err) {
            toast.error(err.message);
        }
    };
    return (
        <div className="myFriend-infoContent">
            <div className="myFriend-bg">
                <div className="myFriend-name">
                    <img src="../Img/Avatar1.png" alt="" />
                    <div className="myFriend-nameBox">
                        <span>{info?.name}</span>
                        {info?.gender === 'male' ? (
                            <i className="fa-regular fa-mars"></i>
                        ) : (
                            <i className="fa-regular fa-venus"></i>
                        )}
                    </div>
                </div>
            </div>
            <div className="myFriend-infoBox">
                <div className="myFriend-btn">
                    <button onClick={handleUnsend}>
                        <i className="fa-solid fa-circle-xmark"></i>
                        Hủy lời mời kết bạn
                    </button>
                </div>
                <div className="myFriend-infoList">
                    <div className="myFriend-infoItem">
                        <i className="fa-duotone fa-envelope"></i>
                        <span>{info?.email}</span>
                    </div>
                    {/* <div className="myFriend-infoItem">
                        <i className="fa-regular fa-phone-volume"></i>
                        <span>123456789</span>
                    </div> */}
                    <div className="myFriend-infoItem">
                        <i className="fa-regular fa-cake-candles"></i>
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoFrSend;
