import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ManageReport.css";
import axios from "../../Hooks/axios";
import { toast } from "react-toastify";
import {
    faMars,
    faVenus,
    faEnvelope,
    faCakeCandles,
    faLock,
    faUnlockKeyhole,
    faGear,
} from "@fortawesome/free-solid-svg-icons";

const InfoRpReceive = ({ setIdR, idR, setRefresh }) => {
    const [report, setReport] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (idR != null) {
                const { data } = await axios.get("/report/" + idR);
                setReport(data.result[0]);
            }
        };
        fetchData();
    }, [idR]);
    const handleReceive = async () => {
        try {
            await axios.patch("/report/" + idR);
            setIdR(null);
            toast.success("Tiếp Nhận Thành Công");
        } catch (err) {
            toast.error(err.message);
        }
        setRefresh((pre) => !pre);
    };
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
                <button className="infoReceive_btn" onClick={handleReceive}>
                    Tiếp Nhận
                    <FontAwesomeIcon icon={faGear} />
                </button>
            </div>
        )
    );
};

export default InfoRpReceive;
