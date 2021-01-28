import axios from 'axios';
import User from '../models/User';

export default class UsersUtils {

    public static getAllUsersFromServer = async (): Promise<User[]> => {
        const allUsersFromServer = await axios.get<User[]>("http://localhost:3001/users/");
        return allUsersFromServer.data;
    }

    public static filterUsersBasedOnSearchInput = (allUsers: User[], searchValue: string): User[] => {
        return allUsers.filter( user => user.username.includes(searchValue.trim()) && searchValue.trim() !== "");
    }
}