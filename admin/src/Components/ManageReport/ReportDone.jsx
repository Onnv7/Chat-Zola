import React from "react";
import { useState, useEffect } from "react";
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
import axios from "../../Hooks/axios.js";
const ReportDone = ({ setIdD, refresh, search }) => {
    const [list, setList] = useState([]);
    const [active, setActive] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/report/done");
            if (search) {
                const temp = data.result.filter((item) =>
                    item.reporter.name.includes(search)
                );
                setList(temp);
            } else {
                setList(data.result);
            }
        };
        fetchData();
    }, [refresh, search]);

    const handleClick = (id) => {
        setIdD(id);
        setActive(id);
    };

    return (
        <div className="reportDone">
            <div className={"reportDone_list"}>
                {list.length > 0 &&
                    list.map((report, index) => (
                        <div
                            className={
                                active === report._id
                                    ? "reportDone_item active-box"
                                    : "reportDone_item "
                            }
                            onClick={() => handleClick(report._id)}
                            key={index}
                        >
                            <div className="reportDone_name">
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
                            <div className="reportDone_setting">
                                <FontAwesomeIcon
                                    className="reportDone_icon"
                                    icon={faGear}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ReportDone;
