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
import axios from "../../Hooks/axios.js";
const ReportReceive = ({ setIdR, refresh }) => {
    const [list, setList] = useState([]);
    const [active, setActive] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/report/notdone");
            setList(data.result);
        };
        fetchData();
    }, [refresh]);

    const handleClick = (id) => {
        setIdR(id);
        setActive(id);
    };

    return (
        <div className="reportReceive">
            <div className={"reportReceive_list"}>
                {list.length > 0 &&
                    list.map((report, index) => (
                        <div
                            className={
                                active === report._id
                                    ? "reportReceive_item active-box"
                                    : "reportReceive_item "
                            }
                            onClick={() => handleClick(report._id)}
                            key={index}
                        >
                            <div className=" reportReceive_name">
                                <img src={report.reporter.avatar} alt="" />
                                <span>{report.reporter.name}</span>
                                {report.reporter.gender === "male" ? (
                                    <FontAwesomeIcon
                                        className=" reportReceive_icon"
                                        icon={faMars}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        className=" reportReceive_icon"
                                        icon={faVenus}
                                    />
                                )}
                            </div>
                            <div className="reportReceive_setting">
                                <FontAwesomeIcon
                                    className=" reportReceive_icon"
                                    icon={faGear}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ReportReceive;
