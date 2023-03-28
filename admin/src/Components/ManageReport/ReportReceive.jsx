import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ManageReport.css";

import {
    faMars,
    faVenus,
    faEnvelope,
    faCakeCandles,
    faLock,
    faUnlockKeyhole,
    faGear,
} from "@fortawesome/free-solid-svg-icons";
const ReportReceive = ({ setIdR }) => {
    // const [list, setList] = useState();
    const [active, setActive] = useState();
    const handleClick = (id) => {
        setIdR(id);
        setActive(id);
    };
    return (
        <div className="reportReceive">
            <div className={"reportReceive_list"}>
                <div
                    className={
                        active === 1
                            ? "reportReceive_item active-box"
                            : "reportReceive_item "
                    }
                    // onClick={() => handleClick(item._id)}
                    onClick={() => handleClick(1)}
                >
                    <div className=" reportReceive_name">
                        <img src="../Img/Avatar1.png" alt="" />
                        <span>Sơn Tùng MTP</span>
                        <FontAwesomeIcon
                            className=" reportReceive_icon"
                            icon={faMars}
                        />
                        <FontAwesomeIcon
                            className=" reportReceive_icon"
                            icon={faVenus}
                        />
                    </div>
                    <div className="reportReceive_setting">
                        <FontAwesomeIcon
                            className=" reportReceive_icon"
                            icon={faGear}
                        />
                    </div>
                </div>
                <div
                    className="reportReceive_item"
                    // className="reportReceive_item active-box"
                    // onClick={() => handleClick(item._id)}
                    onClick={() => handleClick(2)}
                >
                    <div className=" reportReceive_name">
                        <img src="../Img/Avatar1.png" alt="" />
                        <span>Sơn Tùng MTP</span>
                        <FontAwesomeIcon
                            className=" reportReceive_icon"
                            icon={faMars}
                        />
                        <FontAwesomeIcon
                            className=" reportReceive_icon"
                            icon={faVenus}
                        />
                    </div>
                    <div className="reportReceive_setting">
                        <FontAwesomeIcon
                            className=" reportReceive_icon"
                            icon={faGear}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportReceive;
