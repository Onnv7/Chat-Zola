import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from '../../Hooks/axios';

const FriendReceive = ({ setIdr }) => {
    const { user } = useContext(AuthContext);
    const [list, setList] = useState();
    const [isUpdated, setIsUpdated] = useState(false);
    const [active, setActive] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/user/get-list-friend-requests/${user._id}`);
            setList(data);
        };
        fetchData();
    }, [isUpdated]);
    const handleClick = (id) => {
        setIdr(id);
        setActive(id);
    };
    const handleAccept = async (id) => {
        try {
            await axios.post('/user/accept-new-friend', {
                receiverId: user._id,
                senderId: id,
            });
            // if (list.length > 0) {
            //     setList(list.length - 1);
            // } else setList(null);
            setIdr(null);
            setIsUpdated((prev) => !prev);
            toast.success('Kết bạn thành công');
        } catch (err) {
            toast.error(err.message);
        }
    };
    const handleUnsend = async (id) => {
        try {
            await axios.post('/user/unsend-friend-request', {
                receiverId: user._id,
                senderId: id,
            });
            setIdr(null);
            setIsUpdated((prev) => !prev);
            toast.success('Hủy lời mời thành công');
        } catch (err) {
            toast.error(err.message);
        }
    };
    return (
        <div className="friendInvite-List">
            {list?.map((item) => (
                <div
                    key={item._id}
                    className={active === item._id ? 'myFriend-item active-box' : 'myFriend-item'}
                    onClick={() => handleClick(item._id)}
                >
                    <div className="myFriend-info">
                        <img src="../Img/Avatar1.png" alt="" />
                        <span>{item.name}</span>
                        {/* {item.gender === 'male' ? (
                            <i class="fa-regular fa-mars"></i>
                        ) : (
                            <i class="fa-regular fa-venus"></i>
                        )} */}
                    </div>
                    <div className="myFriend-icon">
                        <i onClick={() => handleAccept(item._id)} className="fa-solid fa-user-plus"></i>
                        <i onClick={() => handleUnsend(item._id)} className="fa-solid fa-circle-xmark"></i>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FriendReceive;
