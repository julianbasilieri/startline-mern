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
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkTokenAsync, isAdminAsync, logout } from './store/authSlice';
import EditPassword from './pages/EditPassword';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin';
import ProtectedRouteUser from './components/ProtectedRouteUser';
import { deleteUser, getUserAsync } from './store/userSlice';
import { getSubjectsAsync } from './store/subjectSlice';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const App = () => {
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        async function getSubjects() {
            await dispatch(getSubjectsAsync())
        }
        getSubjects()
        if (!token) return
        async function checkToken() {
            const checkToken = await dispatch(checkTokenAsync())

            if (checkToken.payload.success) {
                await dispatch(isAdminAsync())
                await dispatch(getUserAsync(checkToken.payload.userData.username))
                return
            }

            toast.error('Sesion expired')
            dispatch(logout())
            dispatch(deleteUser())
            navigate('/login')
            return
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
                    <Route element={<ProtectedRouteAdmin />}>
                        <Route path="/subjects" element={<SubjectCollapsible />} />
                    </Route>
                    <Route element={<ProtectedRouteUser />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path='/new-post' element={<Post />} />
                        <Route path='/edit-profile' element={<EditProfile />} />
                        <Route path='/edit-password' element={<EditPassword />} />
                        <Route path="/search" element={<PostList />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App