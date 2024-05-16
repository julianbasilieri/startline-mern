import { useState, useEffect } from 'react';
import SubjectForm from './SubjectForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubjectsAsync } from '../store/subjectSlice';
import '../styles/Subject.css';

const SubjectCollapsible = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingSubject, setEditingSubject] = useState(null);
    const [selectedSubjectId, setSelectedSubjectId] = useState(null);
    const { subjects } = useSelector((state) => state.subject);
    const dispatch = useDispatch()

    useEffect(() => {
        if (activeIndex !== null) {
            const subjectId = subjects[activeIndex]._id;
            setSelectedSubjectId(subjectId);
        }
    }, [activeIndex, subjects]);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleAddSubject = () => {
        setShowModal(true);
    };

    const handleEditSubject = (subject) => {
        setEditingSubject(subject);
        setShowModal(true);
    };

    const handleDeleteSubject = (subjectId) => {
        dispatch(deleteSubjectsAsync(subjectId))
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="subject-collapsible">
            <h1 style={{display: 'flex', justifyContent: 'center'}}>Subjects</h1>
            <div className="add-subject">
                <button title='Agregar Subject' onClick={handleAddSubject}>+</button>
            </div>
            {subjects && subjects.map((subject, index) => (
                <div key={subject._id} className="collapsible">
                    <div className="collapsible-header" style={{ backgroundColor: subject.color }} onClick={() => subject.posts.length > 0 ? handleToggle(index) : ''}>
                        <div className="subject-info">
                            <div className="subject-name">
                                {subject?.name}
                            </div>
                            <div className='subject-extra'>
                                <div className="post-count">
                                    <div className="post-circle">{subject.posts.length}</div>
                                </div>
                                <div className="post-actions">
                                    <button title='Editar Subject' className='edit-button' onClick={(event) => { event.stopPropagation(); handleEditSubject(subject); }}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button title='Eliminar Subject' className='delete-button' disabled={subject.posts.length > 0} onClick={(event) => { event.stopPropagation(); handleDeleteSubject(subject._id); }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {activeIndex === index && (
                        <div className="collapsible-content">
                            {subject.posts.length > 0 && (
                                subject.posts.map((post) => (
                                    <p key={post._id}>{post.title}</p>
                                ))
                            )}
                        </div>
                    )}
                </div>
            ))}
            {showModal && (
                <>
                    <div className="overlay" onClick={handleCloseModal}></div>
                    <div className="modal">
                        <div className="modal-content">
                            <SubjectForm subjectId={selectedSubjectId} handleCloseModal={handleCloseModal} editingSubject={editingSubject} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SubjectCollapsible;