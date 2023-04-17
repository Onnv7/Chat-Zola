import React, { useContext, useEffect, useState, useRef } from 'react';
import './profile.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Image } from 'cloudinary-react';
import ChangePass from './ChangePass';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from '../../Hooks/axios';
import { format, parseISO } from 'date-fns';
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js"

const Profile = () => {
    const axiosPrivate = useAxiosPrivate();
    const inputFile = useRef(null);
    const { user, dispatch } = useContext(AuthContext);
    const [info, setInfo] = useState();
    const [image, setImage] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            // console.log(object)
            let { data } = await axiosPrivate.get(`/user/get-profile/${user._id}`)
            
            const birth = data?.birthday ? parseISO(data.birthday) : null;
            const date = birth ? format(birth, 'yyyy-MM-dd') : '';
            data = { ...data, birthday: date}
            setInfo(data);
        };
        try {
            fetchData();
        } catch (error) {
            
        }
    }, [user]);
    const [open, setOpen] = useState(false);
    const handleUpdateProfile = async (e) => {
        try {
            const { email, ...others } = info;
            const { data } = await axiosPrivate.patch(`/user/update-profile/${user._id}`, {
                ...others
            })
            if(data.success)
            {
                localStorage.setItem("user", JSON.stringify(data.result));
                setInfo(data.result);
                dispatch({ type: "USER_RELOAD", payload: {...user, ...data.result}})

                console.log("Updated")
            }
            else
            {
                console.log("Cant update")
            }
        
        } catch (error) {
            console.log(error)
        }
    }
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setInfo(prev => {
                return { ...prev, avatar: reader.result}
            })
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };
    return (
        <div className="profile">
        
            <div className="profile-box">
                <div className="profile-header">
                    <div className="profile-headerBox">
                        {/* <img src={image ? image: "../Img/Avatar.png"} alt="" /> */}
                        {
                            image !== null ? (<img
                                src={image}
                                alt=""></img>) :
                            (info?.avatar !== "" && info?.avatar) ? 
                            (<img
                            src={info?.avatar}
                            alt='avatar'></img>) : (<img
                                src={"../Img/Avatar.png"}
                                alt="default"></img>) 
                        }
                        <i className="fa-light fa-image" onClick={(e) => inputFile.current.click()}></i>
                            <input
                                type="file"
                                id="file"
                                ref={inputFile}
                                style={{ display: 'none' }}
                                multiple
                                onChange={handleImageUpload}
                            />
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
                        <input type="text" defaultValue={info?.name} 
                        onChange={(e) => {
                            setInfo(prev => {
                                return { 
                                    ...prev, name: e.target.value 
                                }
                            });
                        }} />
                    </div>
                    <div className="profile-item">
                        <i className="fa-duotone fa-envelope"></i>
                        <input type="email" defaultValue={info?.email} readOnly />
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
                                onChange={(e) => {
                                    if(e.target.checked)
                                        setInfo(prev => {
                                            return { 
                                                ...prev, gender: 'male' 
                                            }
                                        });
                                }}
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
                                onChange={(e) => {
                                    if(e.target.checked)
                                        setInfo(prev => {
                                            return { 
                                                ...prev, gender: 'female' 
                                            }
                                        });
                                }}
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
                                onChange={(e) => {
                                    if(e.target.checked)
                                        setInfo(prev => {
                                            return { 
                                                ...prev, gender: 'other' 
                                            }
                                        });
                                }}
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
                            <input type="date" value={info?.birthday} 
                            onChange={(e) => {
                                console.log(e.target.value)
                                setInfo(prev => {
                                    return { 
                                        ...prev, birthday: e.target.value 
                                    }
                                });
                            }}/>
                        </span>
                    </div>
                    <button
                        onClick={handleUpdateProfile}>
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
