import { useEffect } from 'react';
import Store from '../../redux/Store';
import UsersUtils from '../../Utils/UsersUtils';
import LoginSection from '../login-section/LoginSection';
import RegisterSection from '../register-section/RegisterSection';
import './WelcomePage.css';


export default function WelcomePage() {

    useEffect(() => {
        checkIfShouldGetAllUsersFromServer();
    }, []);


    const checkIfShouldGetAllUsersFromServer = async (): Promise<void> => {
        const allUsersFromStore = Store.getState().allUsers;
        if (allUsersFromStore.length === 0) {
            await UsersUtils.getAllUsersFromServer();
        }
    }

    return (
        <div className="welcomePageSection">
            <LoginSection />
            <div className="divider"></div>
            <RegisterSection />
        </div>
    )
}
