import React, { useEffect, useState } from "react";
import ManageReport from "../../Components/ManageReport/ManageReport";
import ManageUser from "../../Components/ManageUser/ManageUser";

import SidebarNav from "../../Components/SidebarNav/SidebarNav";
import "./home.scss";

// import Friend from "../../Components/Friend/Friend";
// import Meet from "../../Components/Meet/Meet";

const Home = () => {
    const [active, setActive] = useState(1);
    const [view, setView] = useState();
    useEffect(() => {
        if (active === 1) {
            setView(<ManageUser />);
        } else if (active === 2) {
            setView(<ManageReport />);
        }
    }, [active]);
    const handleClick = (i) => {
        setActive(i);
    };

    return (
        <div className="home">
            <div className="homeNav">
                <SidebarNav handleClick={handleClick} />
            </div>
            <div className="homeView">{view}</div>
        </div>
    );
};

export default Home;
