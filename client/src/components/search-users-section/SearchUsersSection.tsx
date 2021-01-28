import { Divider, TextField } from '@material-ui/core'
import { ChangeEvent, useEffect, useState } from 'react';
import Message from '../../models/Message';
import User from '../../models/User';
import Store from '../../redux/Store';
import UsersUtils from '../../Utils/UsersUtils';
import UserItem from '../user-item/UserItem';
import './SearchUsersSection.css';


export default function SearchUsersSection() {

    const [message, setMessage] = useState(new Message("", "", "", undefined, undefined));
    const [searchValue, setSearchValue] = useState("");
    const [allUsers, setAllUsers] = useState<User[]>(new Array<User>());
    const [filteredUsers, setFilteredUsers] = useState<User[]>(new Array<User>());

    useEffect(() => {
        checkIfShouldGetAllUsersFromServer();
    }, []);


    const checkIfShouldGetAllUsersFromServer = async (): Promise<void> => {
        const allUsersFromStore = Store.getState().allUsers;
        if (allUsersFromStore.length === 0) {
            const allUsersFormServer = await UsersUtils.getAllUsersFromServer();
            setAllUsers(allUsersFormServer);
        }
        else {
            setAllUsers(allUsersFromStore);
        }
    }

    const onSearchUserInputChange = (event: ChangeEvent <HTMLInputElement>): void => {
        const searchInput: HTMLInputElement = event.target;
        const searchValue = searchInput.value;
        const filteredUsers = UsersUtils.filterUsersBasedOnSearchInput(allUsers, searchValue);
        setFilteredUsers(filteredUsers);
        setSearchValue(searchValue);
    }

    return (
        <div className="composeEmailSectionRight">
            <TextField onChange={onSearchUserInputChange} value={searchValue} required id="standard-required" label="Search For a User" />
            <h3 className="sharpText">{message.receiverUsername}</h3>
            <Divider />
            <div className="allUsersItemsSection">
                {filteredUsers.map( (user, index) => 
                    <UserItem key={index} {...user} />
                )}
            </div>
        </div>
    )
}
