import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Footer.css';
import { faGithub, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container bd-container">
                <h2 className="footer__title">Science for Everybody</h2>
                <div className="footer__social">
                    <a href="https://github.com/julianbasilieri/startline-mern" className="footer__link"><FontAwesomeIcon icon={faGithub} /></a>
                    <a href="https://www.instagram.com/julian_basilieri7/" className="footer__link"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="#" className="footer__link"><FontAwesomeIcon icon={faWhatsapp} /></a>
                </div>
                <p className="footer__copy">&#169; 2024 S4E. All right reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
