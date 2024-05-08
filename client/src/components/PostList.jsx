import CommentList from './CommentList';
import { getElapsedTime } from '../utils/getElapsedTime';
import '../styles/Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useState } from 'react';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const handleCommentSubmit = (content, post) => {
        async function addComment(comment) {
            const prom = axios.post('https://localhost:4000/api/comments', { comment })
            const { data } = await toast.promise(prom, {
                loading: 'Verificando',
                success: (res) => `${res.data.message}`,
                error: (err) => `${err.response.data.message}`,
            })
            console.log(data)
        }
        addComment({ content, post })
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/posts');
                setPosts(res.data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);


    return (
        <div className="post-list">
            <div>
                {posts.map(post => (
                    <div key={post._id} className="post-item">
                        <p className="subject" style={{ backgroundColor: post.subject.color }}>{post.subject.name}</p>
                        <div className="post-header">
                            <div className="user-info">
                                <img src={post.owner.photo} alt="User Profile" className="user-profile" />
                                <p className="username">@{post.owner.username}</p>
                            </div>
                            <p className="subject-time">{getElapsedTime(post.createdAt)}</p>
                        </div>
                        <div className="post-content">
                            <h4 className="post-title">{post.title}</h4>
                            <p className="post-info">{post.info}</p>
                        </div>
                        {post.comments.length > 0 && (
                            <div className="post-comments">
                                <CommentList comments={post.comments} />
                            </div>
                        )}
                        <div className="comment-input">
                            <TextareaAutosize className='input' placeholder="Comment" />
                            <button className="submit-button" onClick={() => handleCommentSubmit()}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
