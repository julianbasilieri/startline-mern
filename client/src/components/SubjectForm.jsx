import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';

const SubjectForm = ({ subjectId, handleCloseModal }) => {
    const [subject, setSubject] = useState({ name: '', info: '', color: '' });
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/subjects/${subjectId}`);
                const subjectData = res.data.subject;
                setSubject(subjectData);
            } catch (error) {
                console.error('Error fetching subject:', error);
            }
        };

        if (subjectId) {
            fetchSubject();
        }
    }, [subjectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/subjects/', subject, {
                headers: {
                    Authorization: token
                }
            });
            console.log(res);
        } catch (error) {
            console.error('Error updating subject:', error);
        }
    };

    const handleColorChange = (color) => {
        console.log(color)
        setSubject(prevSubject => ({
            ...prevSubject,
            color: color.hex
        }));
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setSubject(prevSubject => ({
            ...prevSubject,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>New Subject</h2>
            <div>
                <label>Name:</label>
                <input className='input' type="text" name="name" value={subject.name} onChange={handleChange} />
            </div>
            <div>
                <label>Info:</label>
                <textarea className='input textarea' name="info" value={subject.info} onChange={handleChange} />
            </div>
            <div style={{ display: 'flex' }}>
                <label>Color:</label>
                <CirclePicker color={subject.color} onChange={handleColorChange} />
            </div>
            <div style={{display: 'flex'}}>
                <button className='submit-button' type="submit">Save</button>
                <button className="cancel-button" onClick={handleCloseModal}>Cancelar</button>
            </div>
        </form>
    );
};

SubjectForm.propTypes = {
    subjectId: PropTypes.string.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default SubjectForm;
