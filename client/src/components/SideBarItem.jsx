import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Button from './Button';
import { Link } from 'react-router-dom';

function SideBarItem({ to, text, icon }) {
    return (
        <Link to={to} className="sidebar__item">
            <Button>
                <div className="sidebar__icon">
                    <FontAwesomeIcon icon={icon} />
                </div>
                <div className="sidebar__text">
                    <span className="text">{text}</span>
                </div>
            </Button>
        </Link>
    );
}

SideBarItem.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
};

export default SideBarItem;
