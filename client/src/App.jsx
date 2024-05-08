import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Subject from './pages/Subject';
import NavBar from './components/NavBar';
// import Sidebar from './components/SideBar';
import { Toaster } from 'react-hot-toast';
import PostList from './components/PostList';
import Profile from './pages/Profile';
import SubjectCollapsible from './components/SubjectCollapsible';

const App = () => {
    return (
        <>
            <NavBar />
            <main>
                <Toaster />
                {/* <Sidebar /> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot" element={<ForgotPassword />} />
                    <Route path="/subject" element={<Subject />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/subjects" element={<SubjectCollapsible />} />
                    <Route path="/posts" element={<PostList />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </>
    )
}

export default App