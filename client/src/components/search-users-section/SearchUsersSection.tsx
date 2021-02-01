import { TextField } from '@material-ui/core'
import { ChangeEvent, useEffect, useState } from 'react';
import User from '../../models/User';
import Store from '../../redux/Store';
import UsersUtils from '../../Utils/UsersUtils';
import UserItem from '../user-item/UserItem';
import './SearchUsersSection.css';


export default function SearchUsersSection() {

    const [searchValue, setSearchValue] = useState("");
    const [allUsers, setAllUsers] = useState<User[]>(new Array<User>());
    const [filteredUsers, setFilteredUsers] = useState<User[]>(new Array<User>());


    useEffect(() => {
        getAllUsersFromServer();
        
        const unsubscribe = Store.subscribe(() => {
            const allUsersFromStore = Store.getState().allUsers;
            setAllUsers(allUsersFromStore);
        });

        return () => {
            unsubscribe();
        }
    }, []);


    const getAllUsersFromServer = async (): Promise<void> => {
        await UsersUtils.getAllUsersFromServer();
    }

    const onSearchUserInputChange = (event: ChangeEvent <HTMLInputElement>): void => {
        const searchInput: HTMLInputElement = event.target;
        const searchValue = searchInput.value;
        const filteredUsers = UsersUtils.filterUsersBasedOnSearchInput(allUsers, searchValue);
        setFilteredUsers(filteredUsers);
        setSearchValue(searchValue);
    }

    const clearSearchList = (): void => {
        setSearchValue("");
        setFilteredUsers(new Array <User> ());
    }

    return (
        <div className="composeEmailSectionRight">
            <TextField onChange={onSearchUserInputChange} value={searchValue} required label="Search For a User" />

            <div className="allUsersItemsSection">
                {filteredUsers.map( (user, index) => 
                    <UserItem key={index} user={user} clearSearchList={clearSearchList} />
                )}
            </div>
        </div>
    )
}
