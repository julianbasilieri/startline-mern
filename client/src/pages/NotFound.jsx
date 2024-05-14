import { Link } from 'react-router-dom'


import '../styles/NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404 - Página no encontrada</h1>
            <p className="not-found-text">Lo sentimos, la página que estás buscando no existe.</p>
            <img className="not-found-gif" src="not-found.gif" alt="Página no encontrada" />
            <button>
                <Link to="/" className="not-found-button">Volver a la página de inicio</Link>
            </button>
        </div>
    );
};

export default NotFound;
