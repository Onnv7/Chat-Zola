import React, { useState, useEffect } from "react";
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
import axios from "../../Hooks/axios";
const InfoRpDone = ({ setIdD, idD }) => {
    const [report, setReport] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (idD != null) {
                const { data } = await axios.get("/report/" + idD);
                setReport(data.result[0]);
                console.log(data.result[0]);
            }
        };
        fetchData();
    }, [idD]);
    return (
        report !== null && (
            <div className="infoReceive_form">
                <span className="infoReceive_title">Tiêu đề</span>
                <div className="infoReceive_border">
                    <input
                        className="infoReceive_input"
                        value={report.title}
                        disabled
                    />
                </div>
                <span className="infoReceive_title">Người gửi</span>
                <div className="infoReceive_border">
                    <input
                        className="infoReceive_input"
                        value={report.reporter.name}
                        disabled
                    />
                </div>
                <span className="infoReceive_title">Nội dung</span>
                <div className="infoReceive_border">
                    <textarea
                        className="infoReceive_input"
                        value={report.description}
                        disabled
                    />
                </div>
                <div
                    style={{
                        marginTop: "20px",
                    }}
                />
                {/* <button className="infoReceive_btn">
                Tiếp Nhận
                <FontAwesomeIcon icon={faGear} />
            </button> */}
            </div>
        )
    );
};

export default InfoRpDone;
