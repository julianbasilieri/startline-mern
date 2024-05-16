import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSubjectsAsync } from '../store/subjectSlice';
import '../styles/BlogPosts.css';

const BlogPosts = () => {
    const [arraySubjects, setArraySubjects] = useState([])
    const { subjects } = useSelector((state) => state.subject)
    const dispatch = useDispatch()

    useEffect(() => {
        async function getSubjects() {
            if (subjects) {
                const arraySubjects = subjects.slice(0, 6)
                setArraySubjects(arraySubjects)
            }
            else {
                const res = await dispatch(getSubjectsAsync())
                const arraySubjects = res.payload.subjects.slice(0, 6)
                setArraySubjects(arraySubjects)
            }
        }
        getSubjects()
    }, [dispatch, subjects])

    return (
        <div className="container">
            <h2 className="heading">Our Themes</h2>
            <div className="blogs">
                {arraySubjects.map((subject, index) => (
                    <div className="blog" key={index}>
                        <h3 className="blog-heading">{subject.name}</h3>
                        <p className="blog-info">{subject.info}</p>
                    </div>
                ))}
            </div>
            <h3 className="sub-heading">And more...</h3>
        </div>
    );
    
}

export default BlogPosts;