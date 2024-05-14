import { useState, useEffect } from 'react';
import axios from 'axios';
import SubjectForm from './SubjectForm';
import '../styles/Subject.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SubjectCollapsible = () => {
    const [subjects, setSubjects] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { isAdmin } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAdmin) {
            toast.error('No tienes permisos')
            return navigate('/')
        }

        const fetchSubjects = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/subjects');
                setSubjects(res.data.subjects);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchSubjects();
    }, []);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleAddSubject = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmitSubject = async (newSubjectData) => {
        try {
            const res = await axios.post('http://localhost:4000/api/subjects', newSubjectData);
            setSubjects([...subjects, res.data.subject]);
            setShowModal(false);
        } catch (error) {
            console.error('Error adding new subject:', error);
        }
    };

    return (
        <div className="subject-collapsible">
            <div className="add-subject">
                <button title='Agregar Subject' onClick={handleAddSubject}>+</button>
            </div>
            {showModal && (
                <>
                    <div className="overlay" onClick={handleCloseModal}></div>
                    <div className="modal">
                        <div className="modal-content">
                            <SubjectForm handleCloseModal={handleCloseModal} onSubmit={handleSubmitSubject} />
                        </div>
                    </div>
                </>
            )}
            {subjects.map((subject, index) => (
                <div key={subject._id} className="collapsible">
                    <div className="collapsible-header" style={{ backgroundColor: subject.color }} onClick={() => handleToggle(index)}>
                        <div className="subject-info">
                            <div className="subject-name" >
                                {subject.name}
                            </div>
                            <div className="post-count">
                                <div className="post-circle">{subject.posts.length}</div>
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
        </div>
    );
};

export default SubjectCollapsible;
