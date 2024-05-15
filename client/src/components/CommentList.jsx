import PropTypes from 'prop-types';
import { getElapsedTime } from '../utils/getElapsedTime';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteCommentAsync, updateCommentAsync } from '../store/postSlice';
import TextareaAutosize from 'react-textarea-autosize';
import ModalConfirmacion from './ModalConfirmacion';

const CommentList = ({ comments }) => {
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState('');
    const [visibleComments, setVisibleComments] = useState(3);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState('');
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleEditClick = (commentId, content) => {
        console.log('edit')
        console.log(comments)
        setEditedCommentContent(content)
        setEditingCommentId(commentId);
    };
    const handleEditChange = (event) => {
        setEditedCommentContent(event.target.value);
    };

    const handleSaveEdit = async (commentId) => {
        try {
            console.log('comment', editedCommentContent)
            await dispatch(updateCommentAsync({ commentId, comment: { content: editedCommentContent } }));
            setEditingCommentId(null);
        } catch (error) {
            console.log(error);
        }
    };

    // const handleDeleteClick = async (commentId) => {
    //     console.log('delete')
    //     try {
    //         await dispatch(deleteCommentAsync(commentId))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleLoadMore = () => {
        setVisibleComments(prev => prev + 3);
    };

    const handleDeleteClick = (commentId) => {
        setCommentToDelete(commentId);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await dispatch(deleteCommentAsync(commentToDelete));
            setCommentToDelete(''); // Limpiar el id del comentario a eliminar
            setShowModal(false); // Ocultar el modal
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelDelete = () => {
        setCommentToDelete(''); // Limpiar el id del comentario a eliminar
        setShowModal(false); // Ocultar el modal
    };


    return (
        <div className="comment-list">
            <h5 style={{ fontSize: '17px' }}>Comments:</h5>
            <div className="comments-container">
                {comments.slice(0, visibleComments).map(comment => (
                    <div key={comment._id} className="comment-item">
                        <div className="comment-header">
                            <div className="user-info">
                                <img src={comment.owner.photo || user.photo} alt="User Profile" className="user-profile-comment" />
                                <p className="username">@{comment.owner.username || user.username}</p>
                            </div>
                            <p className="comment-time">{getElapsedTime(comment.createdAt)}</p>
                        </div>
                        <div className="comment-content">
                            {editingCommentId === comment._id ? (
                                <TextareaAutosize
                                    className='input textarea'
                                    value={editedCommentContent}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                <p className='comment-info'>{comment.content}</p>
                            )}
                        </div>
                        {user && (!comment.owner.username || user.username === comment.owner.username) && (
                            <div className="comment-actions">
                                {editingCommentId === comment._id ? (
                                    <button title='Save Comment' className="save-button" onClick={() => handleSaveEdit(comment._id)}><FontAwesomeIcon icon={faSave} /></button>
                                ) : (
                                    <button title='Edit Comment' className='submit-button' onClick={() => handleEditClick(comment._id, comment.content)}><FontAwesomeIcon icon={faEdit} /></button>
                                )}
                                <button title='Delete Comment' className='delete-button' onClick={() => handleDeleteClick(comment._id)}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {comments.length > visibleComments && (
                <button onClick={handleLoadMore}>Load More Comments</button> // Botón para cargar más comentarios
            )}
            {showModal && <ModalConfirmacion eliminar='comentario' handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} />}
        </div>
    );
};

CommentList.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            owner: PropTypes.shape({
                photo: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired,
            }).isRequired,
            createdAt: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CommentList;
