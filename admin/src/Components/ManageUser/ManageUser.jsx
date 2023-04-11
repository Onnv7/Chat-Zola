import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ManageUser.css";

import axios from "../../Hooks/axios.js";
import {
    faMars,
    faVenus,
    faEnvelope,
    faCakeCandles,
    faLock,
    faUnlockKeyhole,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { formatDateTime } from "../../Hooks/formatDateTime";

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const { data } = await axios.get("/user");
        setUsers(data.users);
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
                                <div className="manageUser_lock">
                                    <FontAwesomeIcon
                                        className="manageUser_icon"
                                        icon={faUnlockKeyhole}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
