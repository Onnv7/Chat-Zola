import React, { useState, useEffect } from "react";
import InfoRpDone from "./InfoRpDone";
import InfoRpReceive from "./InfoRpReceive";
import "./ManageReport.css";
import ReportDone from "./ReportDone";
import ReportReceive from "./ReportReceive";

const ManageReport = () => {
    const [active, setActive] = useState(1);
    const [view, setView] = useState(<ReportReceive />);
    const [infoR, setInfoR] = useState();
    const [infoD, setInfoD] = useState();
    const [idR, setIdR] = useState(null);
    const [idD, setIdD] = useState(null);
    useEffect(() => {
        if (active === 1) {
            setView(<ReportReceive setIdR={setIdR} />);
        } else {
            setView(<ReportDone setIdD={setIdD} />);
        }
    }, [active]);
    useEffect(() => {
        if (idR === 1) setInfoR(<InfoRpReceive setIdr={setIdR} idr={idR} />);
        else setInfoR("");

        if (idD) setInfoD(<InfoRpDone setIdD={setIdD} ids={idD} />);
        else setInfoD("");
    }, [idD, idR]);
    const handleClick = (i) => {
        setActive(i);
    };
    return (
        <div className="manageReport">
            <div className="manageUser_header">
                <h1 className="manageUser_title">
                    Quản lý báo cáo từ người dùng
                </h1>
                <div className="manageUser_line" />
            </div>
            <div className="myFriend manageReport_container">
                <div className="myFriend-List manageReport_list">
                    <div className="friendInvite-box manageReport_box">
                        <span
                            onClick={() => handleClick(1)}
                            className={active === 1 ? "first" : "second"}
                        >
                            Đã Nhận
                        </span>
                        <span
                            onClick={() => handleClick(2)}
                            className={
                                active === 2 ? "second-border" : "first-border"
                            }
                        >
                            Đã Xử Lý
                        </span>
                        <div className="addFriend-search manageReport_search">
                            <i className="fa-duotone fa-magnifying-glass"></i>
                            <input type="text" placeholder="Tìm kiếm" />
                        </div>
                    </div>
                    {view}
                </div>
                {active === 1 ? infoR : infoD}
            </div>
        </div>
    );
};

export default ManageReport;
