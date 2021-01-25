import NavbarLogo from '../../assets/Navbar-Logo.png';
import './Navbar.css';

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbarLogoSection">
                <img src={NavbarLogo} className="msLogoImage" alt="MS logo" />
            </div>
        </div>
    )
}
