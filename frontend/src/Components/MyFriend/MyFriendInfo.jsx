import React, { useContext, useEffect, useState } from 'react';
import axios from '../../Hooks/axios';
import { format, parseISO } from 'date-fns';
import { AuthContext } from '../../Contexts/AuthContext';
import { toast } from 'react-toastify';

const MyFriendInfo = ({ friendId, setFriendId }) => {
    const { user } = useContext(AuthContext);
    const [info, setInfo] = useState();
    const [date, setDate] = useState();
    useEffect(() => {
        const fetchData = async () => {
            if (friendId) {
                const { data } = await axios.get(`user/get-profile/${friendId}`);
                setInfo(data);
                const birth = parseISO(data.birthday);
                const date = format(birth, 'dd/MM/yyyy');
                setDate(date);
            }
        };
        fetchData();
    }, [friendId]);
    const handleUnfriend = async () => {
        try {
            await axios.patch(`/user/unfriend/${user._id}?friendId=${friendId}`);
            toast.success('Hủy bạn thành công');
            setFriendId(null);
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
                    <button>
                        <i className="fa-brands fa-facebook-messenger"></i>
                        Nhắn tin
                    </button>
                    <button onClick={handleUnfriend}>
                        <i className="fa-regular fa-user-xmark"></i>
                        Hủy kết bạn
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

export default MyFriendInfo;
