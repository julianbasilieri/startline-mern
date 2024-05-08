import { faGear, faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import '../styles/SideBar.css'
import SideBarItem from './SideBarItem';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <svg className="logo-svg" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="5.630000114440918 -164.82000732421875 462.010009765625 164.82000732421875"><g fill="#ffffff"><path d="M5.63 -115.4C5.63 -108.58 6.93 -102.16 9.54 -96.15C12.15 -90.13 15.69 -84.88 20.17 -80.4C24.65 -75.92 29.88 -72.37 35.86 -69.77C41.84 -67.16 48.24 -65.86 55.06 -65.86L88.04 -65.86C90.34 -65.86 92.49 -65.44 94.48 -64.6C96.47 -63.75 98.21 -62.58 99.71 -61.09C101.2 -59.6 102.37 -57.85 103.21 -55.86C104.06 -53.87 104.48 -51.72 104.48 -49.42C104.48 -47.12 104.06 -44.98 103.21 -42.99C102.37 -40.99 101.2 -39.25 99.71 -37.76C98.21 -36.26 96.47 -35.09 94.48 -34.25C92.49 -33.41 90.34 -32.99 88.04 -32.99L14.83 -32.99L14.83 0L88.04 0C94.86 0 101.28 -1.3 107.3 -3.91C113.31 -6.51 118.56 -10.06 123.04 -14.54C127.52 -19.02 131.05 -24.25 133.62 -30.23C136.18 -36.21 137.47 -42.6 137.47 -49.42C137.47 -56.24 136.18 -62.66 133.62 -68.68C131.05 -74.69 127.52 -79.94 123.04 -84.42C118.56 -88.9 113.31 -92.43 107.3 -95C101.28 -97.56 94.86 -98.85 88.04 -98.85L55.06 -98.85C52.76 -98.85 50.61 -99.27 48.62 -100.11C46.63 -100.95 44.88 -102.12 43.39 -103.62C41.9 -105.11 40.73 -106.87 39.88 -108.9C39.04 -110.93 38.62 -113.1 38.62 -115.4C38.62 -117.7 39.04 -119.84 39.88 -121.83C40.73 -123.83 41.9 -125.57 43.39 -127.06C44.88 -128.56 46.63 -129.73 48.62 -130.57C50.61 -131.41 52.76 -131.83 55.06 -131.83L130.69 -131.83L130.69 -164.82L55.06 -164.82C48.24 -164.82 41.84 -163.52 35.86 -160.91C29.88 -158.31 24.65 -154.76 20.17 -150.28C15.69 -145.8 12.15 -140.57 9.54 -134.59C6.93 -128.62 5.63 -122.22 5.63 -115.4Z M305.94 -32.99L305.94 -65.86L289.51 -65.86L289.51 -148.27L256.52 -148.27L256.52 -65.86L211.12 -65.86L225.49 -164.82L192.5 -164.82L174.11 -32.99L256.52 -32.99L256.52 0L289.51 0L289.51 -32.99Z M467.64 0L467.64 -32.99L387.64 -32.99L387.64 -65.86L441.78 -65.86L441.78 -98.85L387.64 -98.85L387.64 -131.83L467.64 -131.83L467.64 -164.82L354.65 -164.82L354.65 0Z"></path></g></svg>
            </div>
            <div className="sidebar__links">
                <SideBarItem to='/' icon={faHome} text='Home' />
                <SideBarItem to='/search' icon={faSearch} text='Buscar' />
                <SideBarItem to='/profile' icon={faUser} text='Perfil' />
                <SideBarItem to='/settings' icon={faGear} text='Configuracion' />

                {/* <button className="sidebar-btn">
                    <div>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div>
                        Public profile
                    </div>
                </button>
                <button className="sidebar-btn">
                    <FontAwesomeIcon icon={faHome} />
                    Home
                </button>
                <button className="sidebar-btn">
                    <FontAwesomeIcon icon={faSearch} />
                    Search
                </button>
                <button className="sidebar-btn">
                    <FontAwesomeIcon icon={faGear} />
                    Settings
                </button> */}

            </div>
        </div>
    );
}

export default Sidebar;