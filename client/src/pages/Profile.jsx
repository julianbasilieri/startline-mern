import { useDispatch, useSelector } from 'react-redux';
import PostList from '../components/PostList';
import { getPostAsync } from '../store/postSlice';
import { useEffect } from 'react';
import '../styles/Profile.css'
import { useNavigate } from 'react-router-dom'
import { getUserAsync } from '../store/userSlice';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const { userComplete } = useSelector((state) => state.user)
    const { posts } = useSelector((state) => state.post);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function editUser() {
        navigate('/edit-profile')
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                if (!posts) await dispatch(getPostAsync())
                if (user) await dispatch(getUserAsync(user.username))
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [user])

    return (
        <>
            {userComplete && (
                <div className='content'>
                    <div className="user-profile">
                        <div className="data-principal">
                            <div className='user-image'>
                                <img className='profile-image' src={userComplete.photo} alt="User Profile" />
                            </div>
                            <div className="user-data">
                                <p>{userComplete.username}</p>
                                <p>{userComplete.email}</p>

                                {userComplete.university &&
                                    <p>University: {userComplete.university}</p>
                                }
                            </div>
                            <div className="user-actions">
                                <button onClick={editUser}>Edit Profile</button>
                            </div>
                        </div>
                    </div>
                    {userComplete && (
                        <div className="posts">
                            <h2>User Posts</h2>
                            <PostList postsUsuario={posts && posts.filter(post => post.owner._id === userComplete._id)} />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Profile;