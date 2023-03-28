import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMars,
    faVenus,
    faEnvelope,
    faCakeCandles,
    faLock,
    faUnlockKeyhole,
    faGear,
} from "@fortawesome/free-solid-svg-icons";
const ReportDone = ({ setIdD }) => {
    const [list, setList] = useState();
    const [active, setActive] = useState();
    const handleClick = (id) => {
        setIdD(id);
        setActive(id);
    };
    return (
        <div className="reportDone">
            <div className={"reportDone_list"}>
                <div
                    className={
                        active === 1
                            ? "reportDone_item active-box"
                            : "reportDone_item "
                    }
                    // onClick={() => handleClick(item._id)}
                    onClick={() => handleClick(1)}
                >
                    <div className="reportDone_name">
                        <img src="../Img/Avatar1.png" alt="" />
                        <span>Sẽ Gầy</span>
                        <FontAwesomeIcon
                            className="reportDone_icon"
                            icon={faMars}
                        />
                        <FontAwesomeIcon
                            className="reportDone_icon"
                            icon={faVenus}
                        />
                    </div>
                    <div className="reportDone_setting">
                        <FontAwesomeIcon
                            className="reportDone_icon"
                            icon={faGear}
                        />
                    </div>
                </div>
                <div
                    className={
                        active === 2
                            ? "reportDone_item active-box"
                            : "reportDone_item "
                    }
                    // onClick={() => handleClick(item._id)}
                    onClick={() => handleClick(1)}
                >
                    <div className="reportDone_name">
                        <img src="../Img/Avatar1.png" alt="" />
                        <span>Sẽ Gầy</span>
                        <FontAwesomeIcon
                            className="reportDone_icon"
                            icon={faMars}
                        />
                        <FontAwesomeIcon
                            className="reportDone_icon"
                            icon={faVenus}
                        />
                    </div>
                    <div className="reportDone_setting">
                        <FontAwesomeIcon
                            className="reportDone_icon"
                            icon={faGear}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDone;
