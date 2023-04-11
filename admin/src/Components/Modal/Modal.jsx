import React, { useState } from "react";
import axios from "../../Hooks/axios.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUnlockKeyhole,
    faLock,
    faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
const Modal = ({ setOpen, user }) => {
    const handleLock = async () => {
        try {
            await axios.patch("/user/" + user._id, {
                isBlocked: true,
            });
            toast.error("Khóa Tài Khoản Thành Công");
        } catch (err) {
            toast.error(err.message);
        }
        handleClose();
    };
    const handleUnLock = async () => {
        try {
            await axios.patch("/user/" + user._id, {
                isBlocked: false,
            });
            toast.success("Mở Khóa Tài Khoản Thành Công");
        } catch (err) {
            toast.error(err.message);
        }
        handleClose();
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="meet-modalContainer">
            <div className="meet-modalBox">
                <div className="meet-modalTitle">
                    <i
                        onClick={handleClose}
                        className="fa-solid fa-arrow-right-to-arc"
                    ></i>
                    <span>
                        <span>{user.isBlocked ? "Mở Khóa" : "Khóa"}</span> tài
                        khoản
                    </span>
                </div>
                <div className="meet-modalContent">
                    <span>Họ và Tên</span>
                    <div className="meet-modalInput">
                        <input type="text" disabled value={user.name} />
                    </div>
                    <span>Email</span>
                    <div className="meet-modalInput">
                        <input type="text" disabled value={user.email} />
                    </div>
                </div>
                {user.isBlocked ? (
                    <button
                        className="lock-modalInput"
                        style={{
                            background: "#17d7a0",
                            border: "1px solid #17d7a0",
                        }}
                        onClick={handleUnLock}
                    >
                        <span>Mở Khóa</span>
                        <FontAwesomeIcon
                            className="manageUser_icon"
                            icon={faLockOpen}
                        />
                    </button>
                ) : (
                    <button className="lock-modalInput" onClick={handleLock}>
                        <span>Khóa</span>
                        <FontAwesomeIcon
                            className="manageUser_icon"
                            icon={faLock}
                        />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Modal;
