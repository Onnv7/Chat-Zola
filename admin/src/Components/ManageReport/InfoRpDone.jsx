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

const InfoRpDone = ({ setIdR, idR }) => {
    return (
        <div className="infoReceive_form">
            <span className="infoReceive_title">Tiêu đề</span>
            <div className="infoReceive_border">
                <input className="infoReceive_input" />
            </div>
            <span className="infoReceive_title">Người gửi</span>
            <div className="infoReceive_border">
                <input className="infoReceive_input" />
            </div>
            <span className="infoReceive_title">Nội dung</span>
            <div className="infoReceive_border">
                <textarea className="infoReceive_input" />
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
    );
};

export default InfoRpDone;
