import { Link } from "react-router-dom";
import '../styles/ActivateAccount.css'; 

const ActivateAccountSuccess = () => {
    return (
        <div className="activate-account-success">
            <div className="success-message">
                <h2>¡Cuenta activada con éxito!</h2>
                <p>¡Tu cuenta ha sido activada correctamente! Ahora puedes iniciar sesión y disfrutar de nuestra plataforma.</p>
            </div>
            <div className="login-button-container">
                <button><Link to="/login" className="login-button">Iniciar sesión</Link></button>
            </div>
        </div>
    );
};

export default ActivateAccountSuccess;
