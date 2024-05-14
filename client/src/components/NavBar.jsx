import Sidebar from './SideBar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { getUserAsync } from '../store/userSlice';
import { forcedLogin } from '../store/authSlice';
import '../styles/NavBar.css';

const NavBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false); 
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    useEffect(() => {
        async function getUser() {
            if (!user) await dispatch(forcedLogin())
            
            if (user) await dispatch(getUserAsync(user.username))
        }
        getUser()
    }, [])

    return (
        <nav className="navbar">
            <div className={`navbar__left ${!user ? 'not-loged' : 'loged'}`}>
                <div className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
            <div className="navbar__center">
                <Link to="/">
                    <img src="S4E.svg" alt="Logo del blog" />
                </Link>
            </div>
            <div className={`navbar__right ${!user ? 'not-loged' : 'loged'}`}>
                {!user ?
                    <>
                        <div><Link to="/login">Login</Link></div>
                        <div><Link to="/signup">Sign Up</Link></div>
                    </>
                    :
                    <>
                        <div className="profile">
                            <Link to="/profile">
                                <div className="user">
                                    <h3>{user.username}</h3>
                                </div>
                                <div className="img-box">
                                    <img src={user.photo} alt="Foto de perfil" />
                                </div>
                            </Link>
                        </div>
                    </>
                }
            </div>
            <Sidebar isOpen={sidebarOpen} toggle={setSidebarOpen}></Sidebar>
        </nav >
    );
}

export default NavBar;
