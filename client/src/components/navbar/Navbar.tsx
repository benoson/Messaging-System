import NavbarLogo from '../../assets/Navbar-Logo.png';
import { NavLink, useHistory } from 'react-router-dom';
import Store from '../../redux/Store';
import { useEffect, useState } from 'react';
import UsersUtils from '../../Utils/UsersUtils';
import CustomButton from '../custom-button/CustomButton';
import './Navbar.css';

export default function Navbar() {

    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState("");
    const history = useHistory();

    
    useEffect(() => {
        UsersUtils.handleUserLoggedStatus();

        const unsubscribe = Store.subscribe( (): void => {
            const isUserLoggedFromStore = Store.getState().isLogged;
            setIsLogged(isUserLoggedFromStore);
            updateUsernameOnNavbar();
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const onUserLogoutClick = (): void => {
        UsersUtils.logout();
        history.push("/welcome");
    }

    const updateUsernameOnNavbar = (): void => {
        const userInfoFromStorage = localStorage.getItem("userInfo");
        if (userInfoFromStorage !== null) {
            const usernameFromStorage = JSON.parse(userInfoFromStorage).username;
            setUsername(usernameFromStorage);
        }
    }

    return (
        <div className="navbar">
            <div className="navbarLogoSection">
                <NavLink to="/welcome" className="navLinkItem">
                    <img src={NavbarLogo} className="msLogoImage" alt="MS logo" />
                </NavLink>
            </div>

            {isLogged &&
                <div className="usernameTextSection">
                    <p className="usernameText">{username}</p>
                    <CustomButton buttonText="Logout" backgroundColor="red"
                        textColor="white" borderColor="none" hoverBgColor="white" hoverTextColor="red" toggleFunction={onUserLogoutClick} />
                </div>
            }
        </div>
    )
}
