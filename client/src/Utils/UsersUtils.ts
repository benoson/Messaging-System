import axios from 'axios';
import User from '../models/User';
import UserCredentialsDetails from '../models/UserCredentialsDetails';
import { ActionType } from '../redux/ActionType';
import Store from '../redux/Store';
import Interceptor from './Interceptor';
import SuccessfulLoginResponse from './SuccessfulLoginResponse';


export default class UsersUtils {

    public static getAllUsersFromServer = async (): Promise<void> => {
        try {
            Interceptor.interceptRequest();
            const allUsersFromServer = await axios.get<User[]>("http://localhost:3001/users/");
            Store.dispatch({type: ActionType.UpdateAllUsers, payload: allUsersFromServer.data});
        }
        catch (error) {
            alert(error.response.data.errorMessage);
        }
    }

    public static login = async (loginData: UserCredentialsDetails): Promise<void> => {
        try {
            const successfulLoginResponse = await axios.post<SuccessfulLoginResponse>("http://localhost:3001/users/login", loginData);
            UsersUtils.saveLoginDetailsToSessionStorage(successfulLoginResponse.data);
        }
        catch (error) {
            alert(error.response.data.errorMessage);
        }
    }

    public static register = async (registrationData: UserCredentialsDetails): Promise<void> => {
        try {
            const successfulLoginResponse = await axios.post<SuccessfulLoginResponse>("http://localhost:3001/users/", registrationData);
            UsersUtils.saveLoginDetailsToSessionStorage(successfulLoginResponse.data);
        }
        catch (error) {
            alert(error.response.data.errorMessage);
        }
    }

    public static filterUsersBasedOnSearchInput = (allUsers: User[], searchValue: string): User[] => {
        return allUsers.filter( user => user.username.includes(searchValue.trim()) && searchValue.trim() !== "");
    }

    public static saveLoginDetailsToSessionStorage = (successfulLoginResponse: SuccessfulLoginResponse): void => {
        sessionStorage.setItem('userInfo', JSON.stringify(successfulLoginResponse));
    }
}