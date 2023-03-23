import React from 'react';

const AddFriendError = ({ setShow }) => {
    const handleClose = () => {
        setShow(false);
    };
    return (
        <div className="addFriend-none">
            <i onClick={handleClose} className="fa-solid fa-circle-xmark"></i>
            <span>Người dùng không tồn tại</span>
        </div>
    );
};

export default AddFriendError;
