import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faUser } from "@fortawesome/free-regular-svg-icons";
import {
    faClipboardList,
    faGear,
    faUserGroup,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";
import "./sidebarNav.scss";

const SidebarNav = ({ handleClick }) => {
    const [show, setShow] = useState(1);
    const setClick = (i) => {
        setShow(i);
        handleClick(i);
    };

    return (
        <nav className="sidebarNav">
            <div className="main-tab">
                <div
                    onClick={() => setClick(4)}
                    className={show === 4 ? "main-img active" : "main-img"}
                >
                    <img src="../Img/Avatar.png" alt="Avatar" />
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
                        <div className="mainTool-Item">
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SidebarNav;
