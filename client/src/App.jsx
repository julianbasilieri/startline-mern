import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import NavBar from './components/NavBar';
import toast, { Toaster } from 'react-hot-toast';
import PostList from './components/PostList';
import Profile from './pages/Profile';
import SubjectCollapsible from './components/SubjectCollapsible';
import Post from './pages/Post';
import EditProfile from './pages/EditProfile';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkTokenAsync, forcedLogin, isAdminAsync, logout } from './store/authSlice';
import { getSubjectsAsync } from './store/subjectSlice';
import { deleteUser, getUserAsync } from './store/userSlice';
import EditPassword from './pages/EditPassword';

const App = () => {
    const token = localStorage.getItem('token')
    const { subjects } = useSelector((state) => state.subject)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const getSubjects = async () => {
            if (!subjects) await dispatch(getSubjectsAsync())
        }
        getSubjects()

        if (!token) {
            toast.error('Tienes que iniciar sesion')
            navigate('/login')
            return
        }

        async function checkToken() {
            const checkToken = await dispatch(checkTokenAsync())

            if (checkToken.payload.success) {
                await dispatch(forcedLogin(checkToken.payload.userData))
                await dispatch(isAdminAsync())
                console.log('check', checkToken)
                await dispatch(getUserAsync(checkToken.payload.userData.username))
                return
            }

            toast.error('Sesion expired')
            dispatch(logout())
            dispatch(deleteUser())
            navigate('/login')
        }

        checkToken()
    }, [])

    return (
        <>
            <NavBar />
            <main>
                <Toaster />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot" element={<ForgotPassword />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/subjects" element={<SubjectCollapsible />} />
                    <Route path='/new-post' element={<Post />} />
                    <Route path='/edit-profile' element={<EditProfile />} />
                    <Route path='/edit-password' element={<EditPassword />} />
                    <Route path="/search" element={<PostList />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App