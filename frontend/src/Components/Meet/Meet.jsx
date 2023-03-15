import React, { useState } from 'react';
import './meet.scss';
import MeetCreateModal from './MeetCreateModal';
import MeetHost from './MeetHost';
import MeetJoin from './MeetJoin';
import MeetJoinModal from './MeetJoinModal';

const Meet = () => {
    const [active, setActive] = useState(true);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(1);
    const openCreate = () => {
        setShow(1);
        setOpen(true);
    };
    const openHost = () => {
        setShow(2);
        setOpen(true);
    };
    return (
        <div className="meet">
            <div className="meet-box">
                <div onClick={openCreate} className="meet-btn">
                    <div className="meet-icon1">
                        <i className="fa-solid fa-video"></i>
                    </div>
                    <span>Tạo cuộc họp mới</span>
                </div>
                <div onClick={openHost} className="meet-btn">
                    <div className="meet-icon2">
                        <i className="fa-solid fa-users"></i>
                    </div>
                    <span>Tạo cuộc họp mới</span>
                </div>
            </div>
            <div className="meet-container">
                <div className="meet-header">
                    <div className="meet-title">
                        <span onClick={() => setActive(true)} className={active ? 'first' : 'second'}>
                            Chủ trì
                        </span>
                        <span onClick={() => setActive(false)} className={active ? 'first-border' : 'second-border'}>
                            Tham dự
                        </span>
                    </div>
                    <i className="fa-solid fa-trash-xmark"></i>
                </div>
                <div className="meet-body">{active ? <MeetHost /> : <MeetJoin />}</div>
            </div>
            {open && (
                <div className="meet-modal">
                    {show === 1 ? <MeetCreateModal setOpen={setOpen} /> : <MeetJoinModal setOpen={setOpen} />}
                </div>
            )}
        </div>
    );
};

export default Meet;
