import React, { useState } from 'react';
import './profile.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ChangePass from './ChangePass';

const Profile = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="profile">
            <div className="profile-box">
                <div className="profile-header">
                    <div className="profile-headerBox">
                        <img src="../Img/Avatar.png" alt="" />
                        <div className="profile-name">
                            <span>Enemy B</span>
                            <i className="fa-regular fa-venus"></i>
                            <i className="fa-regular fa-mars hide"></i>
                        </div>
                    </div>
                </div>
                <div className="profile-body">
                    <div className="profile-item">
                        <i className="fa-duotone fa-envelope"></i>
                        <input type="text" />
                    </div>
                    <div className="profile-item">
                        <i className="fa-solid fa-phone-volume"></i>
                        <input type="number" />
                    </div>
                    <div className="profile-item">
                        <i className="fa-duotone fa-key"></i>
                        <input type="password" />
                        <i onClick={() => setOpen(true)} className="fa-duotone fa-pen profile-icon"></i>
                    </div>
                    <div className="profile-gender">
                        <div className="form-check form-check-inline profile-genderBox">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="option1"
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
                                value="option2"
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
                                value="option3"
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
                            <input type="date" />
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
