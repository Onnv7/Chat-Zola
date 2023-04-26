import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faUser } from "@fortawesome/free-regular-svg-icons";
import {
    faClipboardList,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./sidebarNav.scss";
import { Auth } from "../../Contexts/AuthContext.js";

const SidebarNav = ({ handleClick }) => {
    const [show, setShow] = useState(1);
    const setClick = (i) => {
        setShow(i);
        handleClick(i);
    };
    const { state, dispatch } = useContext(Auth);
    const { adminInfo } = state;
    const navigate = useNavigate();
    const logout = () => {
        dispatch({
            type: "ADMIN_LOGOUT",
        });
        localStorage.setItem("adminInfo", null);
        navigate("/login");
    };

    return (
        <nav className="sidebarNav">
            <div className="main-tab">
                <div
                    onClick={() => setClick(4)}
                    className={show === 4 ? "main-img active" : "main-img"}
                >
                    <img src="../Img/admin.jpg" alt="Avatar" />
                </div>
                <div className="mainTool-box">
                    <div className="mainTool-List">
                        <div
                            onClick={() => setClick(1)}
                            className={
                                show === 1
                                    ? "mainTool-Item active"
                                    : "mainTool-Item"
                            }
                        >
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div
                            onClick={() => setClick(2)}
                            className={
                                show === 2
                                    ? "mainTool-Item active"
                                    : "mainTool-Item"
                            }
                        >
                            <FontAwesomeIcon icon={faClipboardList} />
                        </div>
                    </div>
                    <div className="mainTool-list">
                        <div className="mainTool-Item" onClick={logout}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SidebarNav;
