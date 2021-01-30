import NavbarLogo from '../../assets/Navbar-Logo.png';
import { NavLink, useHistory } from 'react-router-dom';
import Store from '../../redux/Store';
import { useEffect, useState } from 'react';
import './Navbar.css';
import UsersUtils from '../../Utils/UsersUtils';
import CustomButton from '../custom-button/CustomButton';

export default function Navbar() {

    const [isLogged, setIsLogged] = useState(false);
    const history = useHistory();

    
    useEffect(() => {
        UsersUtils.handleUserLoggedStatus();

        const unsubscribe = Store.subscribe( () => {
            const isUserLoggedFromStore = Store.getState().isLogged;
            setIsLogged(isUserLoggedFromStore);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const onUserLogoutClick = () => {
        UsersUtils.logout();
        history.push("/welcome");
    }

    return (
        <div className="navbar">
            <div className="navbarLogoSection">
                <NavLink to="/welcome" className="navLinkItem">
                    <img src={NavbarLogo} className="msLogoImage" alt="MS logo" />
                </NavLink>

            </div>

            {isLogged &&
                <CustomButton buttonText="Logout" backgroundColor="red"
                    textColor="white" borderColor="none" hoverBgColor="white" hoverTextColor="red" toggleFunction={onUserLogoutClick} />
            }
        </div>
    )
}
