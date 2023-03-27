import React, { useEffect, useState } from 'react';
import './forgotPass.scss';
import VerifyEmail from './VerifyEmail';
import VerifyCode from './VerifyCode';
import ChangePass from './ChangePass';
import ChangePassSuccess from './ChangePassSuccess';

const ForgotPass = ({ setShow }) => {
    const [view, setView] = useState();
    const [active, setActive] = useState(1);
    useEffect(() => {
        if (active === 1) {
            setView(<VerifyEmail setShow={setShow} setActive={setActive} />);
        }
        if (active === 2) {
            setView(<VerifyCode setActive={setActive} />);
        }
        if (active === 3) {
            setView(<ChangePass setActive={setActive} />);
        }
        if (active === 4) {
            setView(<ChangePassSuccess setActive={setActive} setShow={setShow} />);
        }
    }, [active]);
    return <div className="forgotPass">{view}</div>;
};

export default ForgotPass;
