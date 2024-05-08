import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const NavBar = () => {
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    return (
        <nav className="navbar">
            <div className="navbar__left">
                <Link to="/">
                    <img src="S4E.svg" alt="Logo del blog" />
                </Link>
            </div>
            <div className="navbar__right">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {!user ?
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                        </>
                        :
                        <li><Link onClick={() => dispatch(logout())}>Logout</Link></li>
                    }

                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/posts">Posts</Link></li>
                    <li><Link to="/subjects">Subjects</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar