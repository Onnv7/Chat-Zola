import React, { useEffect, useState } from 'react';
import VerifyCode from './VerifyCodeRegis';
import ChangePassSuccess from './ChangePassSuccess';

const ConfirmEmail = ({ setShow, info, codes }) => {
    console.log(info);
    const [view, setView] = useState();
    const [active, setActive] = useState(1);
    useEffect(() => {
        if (active === 1) {
            setView(<VerifyCode setShow={setShow} setActive={setActive} info={info} codes={codes} />);
        }
        if (active === 2) {
            setView(<ChangePassSuccess setActive={setActive} setShow={setShow} />);
        }
    }, [active]);
    return <div className="forgotPass">{view}</div>;
};

export default ConfirmEmail;
