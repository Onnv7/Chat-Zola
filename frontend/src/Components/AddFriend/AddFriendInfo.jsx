import React, { useContext, useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import axios from '../../Hooks/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthContext';

import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js"
const AddFriendInfo = ({ info, setShow }) => {
    
    const axiosPrivate = useAxiosPrivate();
    const { user } = useContext(AuthContext);
    const [list, setList] = useState();
    const [friend, setFriend] = useState(info);
    const birth = parseISO(info.birthday);
    const date = format(birth, 'dd/MM/yyyy');
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axiosPrivate.get(`/user/get-list-invitations-sent/${user._id}`);
            setList(data);
        };
        fetchData();
    }, [list]);
    const found = list?.find((item) => item._id === info._id);
    const handleClick = async () => {
        try {
            const {data} = await axiosPrivate.post(`/user/send-friend-request`, {
                receiverId: info._id,
                senderId: user._id,
            });
            if(data?.success) {
                toast.success('Gửi lời mời kết bạn thành công');
                setFriend(prev => {
                    return { ...prev, relationship: "sent request"}
                })

            }
        } catch (err) {
            toast.error(err.message);
        }
    };
    const handleUnf = async () => {
        try {
            const {data} = await axiosPrivate.patch(`/user/unfriend/${user._id}?friendId=${friend._id}`);
            if(data?.success) {
                toast.success('Đã hủy kết bạn');
                setFriend(prev => {
                    return { ...prev, relationship: "none"}
                })
            }
        } catch (err) {
            toast.error(err.message);
        }
    };
    const handleRecall = async () => {
        try {
            const {data} = await axiosPrivate.post('/user/unsend-friend-request', {
                receiverId: friend._id,
                senderId: user._id,
            });
            if(data?.success) {
                toast.success('Thu hồi lời mời kết bạn thành công');
                setFriend(prev => {
                    return { ...prev, relationship: "none"}
                })
            }
        } catch (err) {
            toast.error(err.message);
        }
    }
    const handleAccept = async () => {
        try {
            const {data} = await axiosPrivate.post('/user/accept-new-friend', {
                receiverId: user._id,
                senderId: friend._id,
            });
            // toast.success('Thu hồi lời mời kết bạn thành công');
            if(data?.success) {
                setFriend(prev => {
                    return { ...prev, relationship: "is friend"}
                })
            }
        } catch (err) {
            toast.error(err.message);
        }
    }
    const handleReject = async () => {
        try {
            const {data} = await axiosPrivate.post('/user/reject-new-friend', {
                receiverId: user._id,
                senderId: friend._id,
            });
            console.log(data)
            // toast.success('Thu hồi lời mời kết bạn thành công');
            if(data?.success) {
                setFriend(prev => {
                    return { ...prev, relationship: "none"}
                })
            }
        } catch (err) {
            toast.error(err.message);
        }
    }
    return (
        <div className="addFriend-infoContent">
            <i onClick={() => setShow(false)} className="fa-solid fa-circle-xmark"></i>
            <div className="myFriend-bg">
                <div className="myFriend-name">
                    <img src={friend.avatar} alt="" />
                    <div className="myFriend-nameBox">
                        <span>{friend.name}</span>
                        {friend.gender === 'male' ? (
                            <i className="fa-regular fa-mars"></i>
                        ) : (
                            <i className="fa-regular fa-venus"></i>
                        )}
                    </div>
                </div>
            </div>
            <div className="myFriend-infoBox">
                <div className="myFriend-btn">
                    {friend._id === user._id ? (
                        <> </>
                    ) :
                    friend.relationship === "none" ? (
                        <button onClick={handleClick} className="btn-add">
                            <i className="fa-regular fa-user-plus"></i>
                            Gửi lời mời kết bạn
                        </button>
                    ) : friend.relationship === "is friend" ? (
                        <button onClick={handleUnf} className="btn-uns">
                            <i className="fa-regular fa-user-xmark"></i>
                            Hủy kết bạn
                        </button>
                    ) : friend.relationship === "received request" ? (
                        <>
                            <button className="btn-uns" onClick={handleReject}>
                                <i className="fa-regular fa-user-xmark"></i>
                                Từ chối
                            </button>
                            <button className="btn-add" onClick={handleAccept}>
                                <i className="fa-regular fa-user-plus"></i>
                                Chấp nhận
                            </button>
                        </>
                        
                    ): friend.relationship === "sent request" ? (
                        <button className="btn-uns" onClick={handleRecall}>
                                <i className="fa-regular fa-user-xmark"></i>
                                Thu hồi lời mời
                            </button>
                    ) : (<></>)}
                </div>
                <div className="myFriend-infoList">
                    <div className="myFriend-infoItem">
                        <i className="fa-duotone fa-envelope"></i>
                        <span>{friend.email}</span>
                    </div>
                    {/* <div className="myFriend-infoItem">
                        <i class="fa-regular fa-phone-volume"></i>
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

export default AddFriendInfo;
