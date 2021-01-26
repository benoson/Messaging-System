import NavbarLogo from '../../assets/Navbar-Logo.png';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbarLogoSection">
                <NavLink to="/welcome" className="navLinkItem">
                    <img src={NavbarLogo} className="msLogoImage" alt="MS logo" />
                </NavLink>
            </div>
        </div>
    )
}
