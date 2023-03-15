import React from 'react';

const FriendSend = () => {
    return (
        <div className="friendInvite-List">
            <div className="myFriend-item active-box">
                <div className="myFriend-info">
                    <img src="../Img/Avatar1.png" alt="" />
                    <span>Friend A</span>
                    <i class="fa-regular fa-mars"></i>
                    <i class="fa-regular fa-venus hide"></i>
                </div>
                <div className="myFriend-icon">
                    <i className="fa-solid fa-circle-xmark"></i>
                </div>
            </div>
        </div>
    );
};

export default FriendSend;
