import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { postSubjectsAsync, updateSubjectsAsync } from '../store/subjectSlice'
import { useDispatch } from 'react-redux';

const SubjectForm = ({ subjectId, handleCloseModal, editingSubject }) => {
    const [subject, setSubject] = useState({ name: '', info: '', color: '' });
    const dispatch = useDispatch()

    useEffect(() => {
        if (editingSubject) {
            setSubject({
                name: editingSubject.name,
                info: editingSubject.info,
                color: editingSubject.color,
            });
        }
    }, [editingSubject]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(subject)
            if (subjectId) {
                await dispatch(updateSubjectsAsync({ subjectId, subject }))
            } else {
                await dispatch(postSubjectsAsync(subject))
            }
            handleCloseModal(true)
        } catch (error) {
            console.error('Error updating subject:', error);
        }
    };

    // const handleSubmitSubject = async (newSubjectData) => {
    //     try {
    //         // const res = await axios.post('http://localhost:4000/api/subjects', newSubjectData);
    //         console.log('a verrrr')
    //         console.log(newSubjectData)
    //         const res = await dispatch(postSubjectsAsync(newSubjectData))
    //         console.log(res.data.subjectGuardado)
    //         setSubjects([...subjects, res.data.subjectGuardado]);
    //         setShowModal(false);
    //     } catch (error) {
    //         console.error('Error adding new subject:', error);
    //     }
    // };

    const handleChange = e => {
        const { name, value } = e.target;
        console.log(value)
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
            <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                <label>Color:</label>
                {/* <SliderPicker color={subject.color} onChange={handleColorChange} /> */}
                <input className='input color-input' type="color" name="color" value={subject.color} onChange={handleChange} />
            </div>
            <div style={{ display: 'flex' }}>
                <button className='submit-button' type="submit">Save</button>
                <button className="cancel-button" onClick={handleCloseModal}>Cancelar</button>
            </div>
        </form>
    );
};

SubjectForm.propTypes = {
    subjectId: PropTypes.string,
    handleCloseModal: PropTypes.func,
    editingSubject: PropTypes.shape({
        name: PropTypes.string,
        info: PropTypes.string,
        color: PropTypes.string,
    }),
};

export default SubjectForm;
