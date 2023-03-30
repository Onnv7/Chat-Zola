import React, { useContext, useEffect, useState } from 'react';
import './profile.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ChangePass from './ChangePass';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from '../../Hooks/axios';
import { format, parseISO } from 'date-fns';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [info, setInfo] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/user/get-profile/${user._id}`);
            setInfo(data);
        };
        fetchData();
    }, [user]);
    const [open, setOpen] = useState(false);
    const birth = info?.birthday ? parseISO(info.birthday) : null;
    const date = birth ? format(birth, 'yyyy-MM-dd') : '';
    return (
        <div className="profile">
            <div className="profile-box">
                <div className="profile-header">
                    <div className="profile-headerBox">
                        <img src="../Img/Avatar.png" alt="" />
                        <div className="profile-name">
                            <span>{info?.name}</span>
                            {info?.gender === 'male' ? (
                                <i className="fa-regular fa-mars"></i>
                            ) : (
                                <i className="fa-regular fa-venus"></i>
                            )}
                        </div>
                    </div>
                </div>
                <div className="profile-body">
                    <div className="profile-item">
                        <i className="fa-duotone fa-envelope"></i>
                        <input type="email" defaultValue={info?.email} />
                    </div>
                    {/* <div className="profile-item">
                        <i className="fa-solid fa-phone-volume"></i>
                        <input type="number" />
                    </div> */}
                    <div className="profile-item">
                        <i className="fa-duotone fa-key"></i>
                        <input type="password" value={12345} />
                        <i onClick={() => setOpen(true)} className="fa-duotone fa-pen profile-icon"></i>
                    </div>
                    <div className="profile-gender">
                        <div className="form-check form-check-inline profile-genderBox">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="male"
                                checked={info?.gender === 'male'}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio1">
                                Nam
                            </label>
                        </div>
                        <div className="form-check form-check-inline profile-genderBox">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="female"
                                checked={info?.gender === 'female'}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio2">
                                Nữ
                            </label>
                        </div>
                        <div className="form-check form-check-inline profile-genderBox">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio3"
                                value="other"
                                checked={info?.gender === 'other'}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio3">
                                Khác
                            </label>
                        </div>
                    </div>
                    <div className="profile-item">
                        <i className="fa-duotone fa-cake-candles"></i>
                        <span>
                            Ngày sinh:
                            <input type="date" value={date} />
                        </span>
                    </div>
                    <button>
                        Lưu
                        <i className="fa-regular fa-arrow-right-from-arc"></i>
                    </button>
                </div>
            </div>
            {open && (
                <div className="profile-modal">
                    <ChangePass setOpen={setOpen} />
                </div>
            )}
        </div>
    );
};

export default Profile;
