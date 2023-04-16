import React, { useContext, useState } from 'react';
import axios from '../../Hooks/axios';
import { toast } from 'react-toastify';
import './report.scss';
import { AuthContext } from '../../Contexts/AuthContext';

const Report = ({ subClick }) => {
    const { user } = useContext(AuthContext);
    const [report, setReport] = useState({
        title: '',
        description: '',
    });
    const handleClick = (i) => {
        subClick(i);
    };
    const handleChange = (e) => {
        setReport((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleSend = async () => {
        try {
            await axios.post('/report/', {
                title: report.title,
                description: report.description,
                reporter: user._id,
            });
            toast.success('Gửi báo cáo thành công');
            setReport({ title: '', description: '' });
        } catch (err) {
            toast.error(err.message);
        }
    };
    return (
        <div className="report">
            <span className="report-title">
                <i onClick={() => handleClick(0)} className="fa-solid fa-arrow-right-to-arc"></i>
                <span>Báo cáo</span>
            </span>
            <div className="report-inputTitle">
                <span>Tiêu đề</span>
                <input id="title" type="text" onChange={(e) => handleChange(e)} value={report.title} />
            </div>
            <div className="report-content">
                <span>Nội dung</span>
                <textarea id="description" onChange={(e) => handleChange(e)} value={report.description}></textarea>
            </div>
            <button onClick={handleSend}>
                Gửi
                <i className="fa-solid fa-arrow-right-to-arc"></i>
            </button>
        </div>
    );
};

export default Report;
