import PropTypes from 'prop-types';
import CommentList from './CommentList';
import Search from './Search';
import Post from '../pages/Post';
import TextareaAutosize from 'react-textarea-autosize';
import { getElapsedTime } from '../utils/getElapsedTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAsync, deletePostAsync, getPostAsync } from '../store/postSlice';
import { Link } from 'react-router-dom';
import LoaderDNA from './LoaderDNA';
import '../styles/Post.css';
import ModalConfirmacion from './ModalConfirmacion';

const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const PostList = ({ postsUsuario }) => {
    const [commentContents, setCommentContents] = useState('');
    const { posts } = useSelector((state) => state.post)
    const { user } = useSelector((state) => state.auth)
    const { subjects } = useSelector((state) => state.subject)
    const dispatch = useDispatch()
    const [editingPostId, setEditingPostId] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState('');

    const handleCommentSubmit = async (content, post) => {
        try {
            await dispatch(addCommentAsync({ content, post }))
            setCommentContents(prevState => ({
                ...prevState,
                [post]: '',
            }));
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleChange = (e, postId) => {
        const { value } = e.target;
        setCommentContents(prevState => ({
            ...prevState,
            [postId]: value,
        }));
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                await dispatch(getPostAsync())


            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [])

    const handleEditClick = (postId) => {
        setEditingPostId(postId);
    };

    const handleCloseModal = () => {
        setEditingPostId(null);
    };

    const handleDeleteClick = (commentId) => {
        setPostToDelete(commentId);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await dispatch(deletePostAsync(postToDelete))
            setPostToDelete('');
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelDelete = () => {
        setPostToDelete('');
        setShowModal(false);
    };

    const findSubject = (subjectId, subjects) => {
        const subject = subjects.find(sub => sub._id === subjectId);
        return subject;
    };

    const isProfilePage = location.pathname === '/profile';
    const postsMap = !isProfilePage && filteredPosts.length !== 0 ? filteredPosts : postsUsuario || posts

    return (
        <div className={`post-list ${!isProfilePage ? 'search' : ''}`}>
            {!isProfilePage &&
                <Search posts={posts} setFilteredPosts={setFilteredPosts} />
            }
            <div>
                {loading && <LoaderDNA />}
                {postsMap && postsMap.length === 0 && (
                    < div className="no-posts">
                        {loading ? setLoading(false) : ''}
                        <p>No hay publicaciones</p>
                        <Link to='/new-post'><button >New post</button></Link>
                    </div>
                )
                }
                {postsMap && subjects && postsMap.map(post => (
                    < div key={post._id} className="post-item" >
                        <div className="post-subject" style={{ backgroundColor: hexToRgba(post.subject.color || findSubject(post.subject, subjects).color, 0.5) }}>
                            <p className="subject">
                                {post.subject.name || findSubject(post.subject, subjects).name}
                            </p>
                        </div>
                        <div className="post-header">
                            <div className="user-info">
                                <div style={{ width: '100px', height: '100px' }}>
                                    <img src={post.owner.photo} alt="User Profile" className="user-profile" />
                                </div>
                                <div>
                                    <p className="username">@{post.owner.username}</p>
                                    <p className="subject-time">{getElapsedTime(post.createdAt)}</p>
                                </div>
                            </div>
                            {user && (!post.owner.username || user.username === post.owner.username) && (
                                <div className="post-actions">
                                    <button title='Edit Post' className='submit-button' onClick={() => handleEditClick(post._id)}><FontAwesomeIcon icon={faEdit} /></button>
                                    <button title='Delete Post' className='delete-button' onClick={() => handleDeleteClick(post._id)}><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                            )}
                        </div>
                        <div className="post-content">
                            <h4 className="post-title">{post.title}</h4>
                            <p className="post-info">{post.info}</p>
                        </div>
                        {
                            post.comments && post.comments.length > 0 && (
                                <div className="post-comments">
                                    <CommentList comments={post.comments} />
                                </div>
                            )
                        }
                        < div className="comment-input" >
                            <TextareaAutosize
                                className='input textarea'
                                placeholder="Comment"
                                value={commentContents[post._id] || ''}
                                onChange={(e) => handleChange(e, post._id)}
                            />
                            <button title='Comment' className="submit-button" onClick={() => handleCommentSubmit(commentContents[post._id], post._id)}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                        {editingPostId === post._id && (
                            <>
                                <div className="overlay" onClick={handleCloseModal}></div>
                                <div className="modal">
                                    <Post postId={post._id} title={post.title} info={post.info} subject={{ _id: post.subject._id, name: post.subject.subjectName }} closeModal={handleCloseModal} />
                                </div>
                            </>
                        )}
                        {loading ? setLoading(false) : ''}
                    </div>
                ))
                }
                {showModal && <ModalConfirmacion eliminar='post' handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} />}

            </div >
        </div >
    );
};

PostList.propTypes = {
    postsUsuario: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        subject: PropTypes.shape({
            color: PropTypes.string,
            name: PropTypes.string
        }).isRequired,
        owner: PropTypes.shape({
            photo: PropTypes.string,
            username: PropTypes.string
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        info: PropTypes.string.isRequired,
        comments: PropTypes.arrayOf(PropTypes.object)
    }))
};

export default PostList;