import PropTypes from 'prop-types';
import { getElapsedTime } from '../utils/getElapsedTime';

const CommentList = ({ comments }) => {
    return (
        <div className="comment-list">
            <h5>Comments:</h5>
            <div className="comments-container">
                {comments.map(comment => (
                    <div key={comment._id} className="comment-item">
                        <div className="comment-header">
                            <div className="user-info">
                                <img src={comment.owner.photo} alt="User Profile" className="user-profile-comment" />
                                <p className="username">{comment.owner.username}</p>
                            </div>
                            <p className="comment-time">{getElapsedTime(comment.createdAt)}</p>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
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
