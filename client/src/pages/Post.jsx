import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import '../styles/Form.css';
import { addPostAsync, updatePostAsync } from '../store/postSlice';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getSubjectsAsync } from '../store/subjectSlice';

const Post = ({ postId, title, info, subject, closeModal }) => {
    const [subjects, setSubjects] = useState([]);
    const [post, setPost] = useState({ title: '', info: '', subject: '' });
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                if (subjects.length === 0) {
                    const res = await dispatch(getSubjectsAsync())
                    setSubjects(res.subjects);
                }
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchSubjects();
    }, [subjects]);

    useEffect(() => {
        if (postId) setPost({ title, info, subject });
    }, [postId, title, info, subject]);

    const onSubmit = async e => {
        e.preventDefault();
        try {
            if (post) {
                if (postId) {
                    await dispatch(updatePostAsync({ postId, info: post }))
                    closeModal();
                }
                else {
                    await dispatch(addPostAsync(post))
                    navigate('/search')
                }
            }
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value,
        }));
        if (post.subject._id) post.subject = post.subject._id;
    };

    const onCancel = () => {
        closeModal();
    };

    return (
        <div className="new-post">
            {!postId ? (
                <h2>Create a New Post</h2>
            ) : (
                <h2>Update Post</h2>
            )}
            <form className="form" onSubmit={onSubmit}>
                <div className="section">
                    <input
                        type="text"
                        className="input"
                        placeholder="Your title"
                        autoComplete="nope"
                        value={post.title}
                        name="title"
                        onChange={handleChange}
                    />
                    <label className="label">Title</label>
                </div>
                <div className="section">
                    <TextareaAutosize
                        className="input textarea"
                        placeholder="Information"
                        value={post.info}
                        name="info"
                        onChange={handleChange}
                    />
                </div>
                <div className="section">
                    <select
                        className="input select"
                        placeholder="Info"
                        value={post.subject._id}
                        name="subject"
                        onChange={handleChange}
                    >
                        <option value="">Select a subject</option>
                        {subjects.map(subject => (
                            <option key={subject._id} value={subject._id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="submit-button">
                    Submit
                </button>
                {postId && (
                    <button className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

Post.propTypes = {
    postId: PropTypes.string,
    title: PropTypes.string,
    info: PropTypes.string,
    subject: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string
    }),
    closeModal: PropTypes.func
};

export default Post;