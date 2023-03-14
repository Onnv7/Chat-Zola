import React from 'react';
import './addFriend.scss';

const AddFriend = () => {
    return (
        <div className="addFriend">
            <div className="addFriend-search">
                <i class="fa-duotone fa-magnifying-glass"></i>
                <input type="text" placeholder="Tìm kiếm" />
            </div>
            <div className="addFriend-modal hide">
                <div className="addFriend-infoContent hide">
                    <div className="myFriend-bg">
                        <div className="myFriend-name">
                            <img src="../Img/Avatar1.png" alt="" />
                            <div className="myFriend-nameBox">
                                <span>Friend A</span>
                                <i class="fa-regular fa-mars hide"></i>
                                <i class="fa-regular fa-venus"></i>
                            </div>
                        </div>
                    </div>
                    <div className="myFriend-infoBox">
                        <div className="myFriend-btn">
                            <button>
                                <i class="fa-brands fa-facebook-messenger"></i>
                                Nhắn tin
                            </button>
                            <button>
                                <i class="fa-regular fa-user-xmark"></i>
                                Hủy kết bạn
                            </button>
                        </div>
                        <div className="myFriend-infoList">
                            <div className="myFriend-infoItem">
                                <i class="fa-duotone fa-envelope"></i>
                                <span>phatnt2912@gmail.com</span>
                            </div>
                            <div className="myFriend-infoItem">
                                <i class="fa-regular fa-phone-volume"></i>
                                <span>123456789</span>
                            </div>
                            <div className="myFriend-infoItem">
                                <i class="fa-regular fa-cake-candles"></i>
                                <span>30/2/2023</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="addFriend-none">
                    <span>Người dùng không tồn tại</span>
                </div>
            </div>
        </div>
    );
};

export default AddFriend;
