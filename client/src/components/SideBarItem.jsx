import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const SidebarItem = ({ to, icon, text, onClick }) => {

    const handleClick = () => {
        if (onClick) {
            onClick(false); // Cierra el sidebar al hacer clic en un elemento
        }
    };

    return (
        <div className="sidebar-item">
            <Link to={to} onClick={handleClick}>
                <FontAwesomeIcon className='icon' icon={icon} />
                <p>{text}</p>
            </Link>
        </div>
    );
};

SidebarItem.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default SidebarItem;
