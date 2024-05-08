import { useEffect, useState } from 'react';
import axios from 'axios';
// import PostList from './PostList';
import '../styles/Subject.css'

const SubjectCollapsible = () => {
    const [subjects, setSubjects] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/subjects');
                setSubjects(res.data.subjects);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="subject-collapsible">
            {subjects.map((subject, index) => (
                <div key={subject._id} className="collapsible">
                    <div style={{ backgroundColor: subject.color }} className="collapsible-header" onClick={() => handleToggle(index)}>
                        <p>{subject.name}</p>
                        <p className="post-count">{subject.posts.length} post{subject.posts.length !== 1 ? 's' : ''}</p>
                    </div>
                    {activeIndex === index && (
                        <div className="collapsible-content">
                            {subject.posts.length > 0 ? (
                                subject.posts.map((post) => (
                                    <p key={post._id}>{post.title}</p>
                                ))
                            ) : (
                                <p>No hay posts, sé el primero en postear</p>
                            )}
                            {/* <PostList posts={subject.posts} /> */}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SubjectCollapsible;
