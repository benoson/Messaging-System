import { useEffect } from 'react';
import { ActionType } from '../../redux/ActionType';
import Store from '../../redux/Store';
import UsersUtils from '../../Utils/UsersUtils';
import LoginSection from '../login-section/LoginSection';
import RegisterSection from '../register-section/RegisterSection';
import './WelcomePage.css';


export default function WelcomePage() {

    useEffect(() => {
        getAllUsersFromServer();
    }, []);

    const getAllUsersFromServer = async() => {
        const allUsersFromServer = await UsersUtils.getAllUsersFromServer();
        Store.dispatch({type: ActionType.UpdateAllUsers, payload: allUsersFromServer});
    }

    return (
        <div className="welcomePageSection">
            <LoginSection />
            <div className="divider"></div>
            <RegisterSection />
        </div>
    )
}
