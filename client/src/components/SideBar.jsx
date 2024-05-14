import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { faAdd, faHome, faRightFromBracket, faSearch, faTheaterMasks, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/SideBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { deleteUser } from '../store/userSlice';

const Sidebar = ({ isOpen, toggle }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAdmin } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(deleteUser())
        navigate('/')
        toggle(!isOpen)
    }

    return (
        <div id="sidebar" className={isOpen ? 'active' : ''}>
            <div className="list-items">
                <div className="sidebar-item">
                    <Link to="/" onClick={() => toggle(!isOpen)}>
                        <FontAwesomeIcon className='icon' icon={faHome} />
                        <p>Home</p>
                    </Link>
                </div>
                <div className="sidebar-item">
                    <Link to="/search" onClick={() => toggle(!isOpen)}>
                        <FontAwesomeIcon className='icon' icon={faSearch} />
                        <p>Search</p>
                    </Link>
                </div>
                <div className="sidebar-item">
                    <Link to="/new-post" onClick={() => toggle(!isOpen)}>
                        <FontAwesomeIcon className='icon' icon={faAdd} />
                        <p>New Post</p>
                    </Link>
                </div>
                <div className="sidebar-item">
                    <Link to="/profile" onClick={() => toggle(!isOpen)}>
                        <FontAwesomeIcon className='icon' icon={faUser} />
                        <p>Profile</p>
                    </Link>
                </div>
                {isAdmin &&
                    < div className="sidebar-item">
                        <Link to="/subjects" onClick={() => toggle(!isOpen)}>
                            <FontAwesomeIcon className='icon' icon={faTheaterMasks} />
                            <p>Subjects</p>
                        </Link>
                    </div>
                }
            </div>
            <div className="bottom-items">
                <div className="sidebar-item">
                    <button onClick={() => handleLogout()}>
                        <FontAwesomeIcon className='icon' icon={faRightFromBracket} />
                        <p>Logout</p>
                    </button>
                </div>
            </div>
        </div >
    );
}

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
};

export default Sidebar;
