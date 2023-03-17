import React, { useContext } from 'react';
import { format, parseISO } from 'date-fns';
import axios from '../../Hooks/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthContext';

const AddFriendInfo = ({ info, setShow }) => {
    const { user } = useContext(AuthContext);
    const birth = parseISO(info.birthday);
    const date = format(birth, 'dd/mm/yyyy');
    console.log(user._id);
    const handleClick = async () => {
        try {
            await axios.post(`/user/send-friend-request`, {
                receiverId: info._id,
                senderId: user._id,
            });
            toast.success('Gửi lời mời kết bạn thành công');
        } catch (err) {
            toast.error(err.message);
        }
    };
    return (
        <div className="addFriend-infoContent">
            <div className="myFriend-bg">
                <div className="myFriend-name">
                    <img src="../Img/Avatar1.png" alt="" />
                    <div className="myFriend-nameBox">
                        <span>{info.name}</span>
                        {info.gender === 'male' ? (
                            <i className="fa-regular fa-mars"></i>
                        ) : (
                            <i className="fa-regular fa-venus"></i>
                        )}
                    </div>
                </div>
            </div>
            <div className="myFriend-infoBox">
                <div className="myFriend-btn">
                    <button onClick={handleClick}>
                        <i className="fa-regular fa-user-plus"></i>
                        Gửi lời mời kết bạn
                    </button>
                    <button className="hide">
                        <i className="fa-regular fa-user-xmark"></i>
                        Hủy kết bạn
                    </button>
                </div>
                <div className="myFriend-infoList">
                    <div className="myFriend-infoItem">
                        <i className="fa-duotone fa-envelope"></i>
                        <span>{info.email}</span>
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
