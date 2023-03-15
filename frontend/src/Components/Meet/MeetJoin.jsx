import React, { useState } from 'react';
import DetailMeetJoin from './DetailMeetJoin';

const MeetJoin = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="meet-List">
            <div className="meet-item">
                <div className="meet-name">
                    <img src="../Img/Avatar1.png" alt="" />
                    <span>Cuộc gặp gỡ nhàm chán</span>
                </div>
                <div className="meet-itemBtn">
                    <i onClick={() => setOpen(true)} className="fa-regular fa-circle-info"></i>
                    <i class="fa-solid fa-arrow-right-to-arc"></i>
                    <i className="fa-solid fa-trash-xmark"></i>
                </div>
            </div>
            {open && (
                <div className="meet-modal">
                    <DetailMeetJoin setOpen={setOpen} />
                </div>
            )}
        </div>
    );
};

export default MeetJoin;
