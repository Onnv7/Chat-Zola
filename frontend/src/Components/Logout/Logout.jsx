import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import './logout.scss';

const Logout = ({ subClick }) => {
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClose = (i) => {
        subClick(i);
    };
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            dispatch({ type: 'LOGOUT' });
            navigate('/login');
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
        }
    };
    return (
        <div className="logout">
            <div className="logout-title">
                <span>Bạn có muốn rời khỏi</span>
                <span>Zola</span>
                <span>?</span>
            </div>
            <div className="logout-btn">
                <button onClick={() => handleClose(0)}>
                    Quay lại <i className="fa-solid fa-arrow-right-to-arc"></i>
                </button>
                <button onClick={(e) => handleLogout(e)}>
                    Tạm biệt <i className="fa-solid fa-arrow-right-to-arc"></i>
                </button>
            </div>
        </div>
    );
};

export default Logout;
