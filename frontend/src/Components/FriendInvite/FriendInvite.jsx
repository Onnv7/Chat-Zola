import React, { useEffect, useState } from 'react';
import FriendReceive from './FriendReceive';
import FriendSend from './FriendSend';
import InfoFrReceive from './InfoFrReceive';
import InfoFrSend from './InfoFrSend';
import './friendInvite.scss';

const FriendInvite = () => {
    const [active, setActive] = useState(1);
    const [view, setView] = useState(<FriendSend />);
    const [infoS, setInfoS] = useState();
    const [infoR, setInfoR] = useState();
    const [idr, setIdr] = useState(null);
    const [ids, setIds] = useState(null);
    const [textSearch, setTextSearch] = useState('');
    useEffect(() => {
        if (active === 1) {
            setView(<FriendReceive setIdr={setIdr} />);
        } else {
            setView(<FriendSend setIds={setIds} />);
        }
    }, [active]);
    useEffect(() => {
        if (idr) setInfoR(<InfoFrReceive setIdr={setIdr} idr={idr} />);
        else setInfoR('');

        if (ids) setInfoS(<InfoFrSend setIds={setIds} ids={ids} />);
        else setInfoS('');
    }, [idr, ids]);
    const handleClick = (i) => {
        setActive(i);
    };

    return (
        <div className="myFriend">
            <div className="myFriend-List">
                <div className="friendInvite-box">
                    <span onClick={() => handleClick(1)} className={active === 1 ? 'first' : 'second'}>
                        Đã nhận
                    </span>
                    <span onClick={() => handleClick(2)} className={active === 2 ? 'second-border' : 'first-border'}>
                        Đã gửi
                    </span>
                </div>
                {view}
            </div>
            {active === 1 ? infoR : infoS}
        </div>
    );
};

export default FriendInvite;
