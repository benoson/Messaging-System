import axios from 'axios';
import User from '../models/User';
import UserCredentialsDetails from '../models/UserCredentialsDetails';
import { ActionType } from '../redux/ActionType';
import Store from '../redux/Store';
import Interceptor from './Interceptor';
import SuccessfulLoginResponse from './SuccessfulLoginResponse';


export default class UsersUtils {


    public static validateCredentials = (credentails: UserCredentialsDetails): boolean => {
        try {
            UsersUtils.validateUsername(credentails.username);
            UsersUtils.validatePassword(credentails.password);
            return true;
        }
        catch (error) {
            alert(error);
            return false;
        }
    }

    public static validateUsername = (username: string): boolean => {
        if (username.trim().length > 2 && username.trim().length < 11) {
            return true;
        }

        throw new Error("Please Enter a Username between 3 - 10 characters");
    }

    public static validatePassword = (password: string): boolean => {
        if (password.trim().length > 3 && password.trim().length < 11) {
            return true;
        }

        throw new Error("Please Enter a Password between 4 - 10 characters");
    }

    public static getAllUsersFromServer = async (): Promise<void> => {
        try {
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
            UsersUtils.saveLoginDetailsToLocalStorage(successfulLoginResponse.data);
            UsersUtils.changeUserLoggedStatus(true);
        }
        catch (error) {
            throw new Error(error.response.data.errorMessage);
        }
    }

    public static register = async (registrationData: UserCredentialsDetails): Promise<void> => {
        try {
            const successfulLoginResponse = await axios.post<SuccessfulLoginResponse>("http://localhost:3001/users/", registrationData);
            UsersUtils.saveLoginDetailsToLocalStorage(successfulLoginResponse.data);
            UsersUtils.changeUserLoggedStatus(true);
        }
        catch (error) {
            alert(error.response.data.errorMessage);
        }
    }

    public static filterUsersBasedOnSearchInput = (allUsers: User[], searchValue: string): User[] => {
        return allUsers.filter( user => user.username.includes(searchValue.trim()) && searchValue.trim() !== "");
    }

    public static saveLoginDetailsToLocalStorage = (successfulLoginResponse: SuccessfulLoginResponse): void => {
        localStorage.setItem('userInfo', JSON.stringify(successfulLoginResponse));
    }

    public static handleUserLoggedStatus = (): void => {
        if (UsersUtils.isUserLogged()) {
            UsersUtils.changeUserLoggedStatus(true);
        }
    }

    public static changeUserLoggedStatus = (loggedStatus: boolean): void => {
        Store.dispatch({type: ActionType.ChangeLoggedStatus, payload: loggedStatus});
    }

    public static isUserLogged = (): boolean => {
        if (!Store.getState().isLogged) {
            const userInfo = localStorage.getItem("userInfo");
            if (userInfo !== null && JSON.parse(userInfo!).token !== undefined) {
                return true;
            }
        }
        return false;
    }

    public static logout = (): void => {
        Interceptor.interceptRequest();
        localStorage.removeItem("userInfo");
        Store.dispatch({type: ActionType.ClearStore});
    }
}