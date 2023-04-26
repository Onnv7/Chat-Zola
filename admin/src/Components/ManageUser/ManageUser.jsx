import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ManageUser.css";
import "./../Modal/Modal.scss";
import axios from "../../Hooks/axios.js";
import {
    faMars,
    faVenus,
    faEnvelope,
    faCakeCandles,
    faLock,
    faUnlockKeyhole,
    faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { formatDateTime } from "../../Hooks/formatDateTime";
import Modal from "../Modal/Modal";

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/admin/getAllUser");
            setUsers(data.users);
        };
        fetchData();
    }, [open]);

    const handleLock = (user) => {
        setUser(user);
        setOpen(true);
    };
    return (
        <div className="manageUser">
            <div className="manageUser_header">
                <h1 className="manageUser_title">
                    Quản lý tài khoản người dùng
                </h1>
                <div className="manageUser_line" />
            </div>
            <div className="manageUser_container">
                <div className="manageUser_list">
                    {users.length > 0 &&
                        users.map((user, index) => (
                            <div className="manageUser_item" key={index}>
                                <div className="manageUser_name">
                                    <img src={user.avatar} alt="" />
                                    <span>{user.name}</span>
                                    {user.gender === "male" ? (
                                        <FontAwesomeIcon
                                            className="manageUser_icon"
                                            icon={faMars}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            className="manageUser_icon"
                                            icon={faVenus}
                                        />
                                    )}
                                </div>
                                <div className="manageUser_email">
                                    <FontAwesomeIcon
                                        className="manageUser_icon"
                                        icon={faEnvelope}
                                    />
                                    <span>{user.email}</span>
                                </div>
                                <div className="manageUser_birthday">
                                    <FontAwesomeIcon
                                        className="manageUser_icon"
                                        icon={faCakeCandles}
                                    />
                                    <span>{formatDateTime(user.birthday)}</span>
                                </div>
                                {user.isBlocked ? (
                                    <div
                                        className="manageUser_lock"
                                        onClick={() => handleLock(user)}
                                    >
                                        <FontAwesomeIcon
                                            className="manageUser_icon"
                                            icon={faLock}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="manageUser_lock"
                                        onClick={() => handleLock(user)}
                                        style={{
                                            background: "#17d7a0",
                                            border: "1px solid #17d7a0",
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            className="manageUser_icon"
                                            icon={faUnlock}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </div>
            {open && (
                <div className="meet-modal">
                    <Modal setOpen={setOpen} user={user} />
                </div>
            )}
        </div>
    );
};

export default ManageUser;
