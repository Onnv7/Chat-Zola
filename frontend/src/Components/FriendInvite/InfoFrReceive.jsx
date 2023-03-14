import React from 'react';

const infoFrReceive = () => {
    return (
        <div className="myFriend-infoContent">
            <div className="myFriend-bg">
                <div className="myFriend-name">
                    <img src="../Img/Avatar1.png" alt="" />
                    <div className="myFriend-nameBox">
                        <span>Friend A</span>
                        <i className="fa-regular fa-mars hide"></i>
                        <i className="fa-regular fa-venus"></i>
                    </div>
                </div>
            </div>
            <div className="myFriend-infoBox">
                <div className="myFriend-btn">
                    <button>
                        <i className="fa-solid fa-user-plus"></i>
                        Chấp Nhận
                    </button>
                    <button>
                        <i className="fa-solid fa-circle-xmark"></i>
                        Từ chối
                    </button>
                </div>
                <div className="myFriend-infoList">
                    <div className="myFriend-infoItem">
                        <i className="fa-duotone fa-envelope"></i>
                        <span>phatnt2912@gmail.com</span>
                    </div>
                    <div className="myFriend-infoItem">
                        <i className="fa-regular fa-phone-volume"></i>
                        <span>123456789</span>
                    </div>
                    <div className="myFriend-infoItem">
                        <i className="fa-regular fa-cake-candles"></i>
                        <span>30/2/2023</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default infoFrReceive;
