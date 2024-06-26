import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { faAdd, faHome, faRightFromBracket, faSearch, faTheaterMasks, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/SideBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { deleteUser } from '../store/userSlice';
import SidebarItem from './SideBarItem';

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
                <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                    <SidebarItem to="/" icon={faHome} text="Home" onClick={toggle} />
                    <SidebarItem to="/search" icon={faSearch} text="Search" onClick={toggle} />
                    <SidebarItem to="/new-post" icon={faAdd} text="New Post" onClick={toggle} />
                    <SidebarItem to="/profile" icon={faUser} text="Profile" onClick={toggle} />
                </div>
                {isAdmin &&
                    <SidebarItem to="/subjects" icon={faTheaterMasks} text="Subjects" onClick={toggle} />
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
