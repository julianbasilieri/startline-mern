import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import '../styles/Home.css'
import BlogPosts from "../components/BlogPosts"
import { useEffect } from "react"
import { isAdminAsync } from "../store/authSlice"

const Home = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    function handleNavigate() {
        navigate('/singup')
    }

    const scrollToContent = () => {
        const mainContent = document.getElementById('container');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        async function isAdminFunct() {
            await dispatch(isAdminAsync())
        }
        isAdminFunct()
    }, [dispatch])

    return (
        <div>
            <div className="banner">
                <div className="content">
                    <h1>Welcome to Science for Everybody</h1>
                    <p className="information">Explore the latest discoveries and insights in the world of science. <br /> Join our community of curious minds.</p>
                    <div className="home-buttons">
                        <button type="button" onClick={() => scrollToContent()}><span></span>Read More</button>
                        {!user &&
                            <button type="button" onClick={handleNavigate}> <span></span>Join Now</button>
                        }
                    </div>
                </div>
            </div>
            <BlogPosts />
        </div>
    )
}

export default Home