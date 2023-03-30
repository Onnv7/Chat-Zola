import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import './myFriend.scss';
import MyFriendInfo from './MyFriendInfo';
import axios from '../../Hooks/axios';
import { toast } from 'react-toastify';

const MyFriend = () => {
    const { user } = useContext(AuthContext);
    const [list, setList] = useState();
    const [friendId, setFriendId] = useState();
    const [active, setActive] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
    const [view, setView] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/user/get-friends-list/${user._id}`);
            setList(data);
        };
        fetchData();
    }, [isUpdated]);

    const handleClick = (id) => {
        setFriendId(id);
        setActive(id);
    };
    useEffect(() => {
        if (friendId) setView(<MyFriendInfo friendId={friendId} setFriendId={setFriendId} />);
        else setView('');
    }, [friendId]);
    const handleUnfriend = async (id) => {
        try {
            await axios.patch(`/user/unfriend/${user._id}?friendId=${id}`);
            toast.success('Hủy bạn thành công');
            setFriendId(null);
            setIsUpdated((prev) => !prev);
        } catch (err) {
            toast.error(err.message);
        }
    };
    return (
        <div className="myFriend">
            <div className="myFriend-List">
                <div className="addFriend-search">
                    <i className="fa-duotone fa-magnifying-glass"></i>
                    <input type="text" placeholder="Tìm kiếm" />
                </div>
                {list?.map((item) => (
                    <div
                        key={item._id}
                        className={active === item._id ? 'myFriend-item active-box' : 'myFriend-item'}
                        onClick={() => handleClick(item._id)}
                    >
                        <div className="myFriend-info">
                            <img src="../Img/Avatar1.png" alt="" />
                            <span>{item.name}</span>
                            {item.gender === 'male' ? (
                                <i className="fa-regular fa-venus"></i>
                            ) : (
                                <i className="fa-regular fa-mars"></i>
                            )}
                        </div>
                        <div className="myFriend-icon">
                            <i className="fa-brands fa-facebook-messenger"></i>
                            <i onClick={() => handleUnfriend(item._id)} className="fa-regular fa-user-xmark"></i>
                        </div>
                    </div>
                ))}
            </div>
            {view}
        </div>
    );
};

export default MyFriend;
