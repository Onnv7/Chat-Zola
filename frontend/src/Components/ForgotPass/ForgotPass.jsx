import React, { useEffect, useState } from 'react';
import './forgotPass.scss';
import VerifyEmail from './VerifyEmail';
import VerifyCode from './VerifyCode';
import ChangePass from './ChangePass';
import ChangePassSuccess from './ChangePassSuccess';

const ForgotPass = ({ setShow }) => {
    const [view, setView] = useState();
    const [codes, setCodes] = useState();
    const [active, setActive] = useState(1);
    const [email, setEmail] = useState();
    useEffect(() => {
        if (active === 1) {
            setView(<VerifyEmail setShow={setShow} setActive={setActive} setEmail={setEmail} setCodes={setCodes} />);
        }
        if (active === 2) {
            setView(<VerifyCode setActive={setActive} email={email} codes={codes} />);
        }
        if (active === 3) {
            setView(<ChangePass setActive={setActive} email={email} />);
        }
        if (active === 4) {
            setView(<ChangePassSuccess setActive={setActive} setShow={setShow} />);
        }
    }, [active]);
    return <div className="forgotPass">{view}</div>;
};

export default ForgotPass;
