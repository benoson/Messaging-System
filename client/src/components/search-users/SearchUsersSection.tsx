import { TextField } from '@material-ui/core'
import { useState } from 'react';
import UserItem from '../user-item/UserItem';

export default function SearchUsersSection() {

    const [searchedUsers, setSearchedUsers] = useState(null);

    const x = [
        {username: "benoson"},
        {username: "benoson2"},
        {username: "benoson3"},
        {username: "benoson4"},
        {username: "benoson5"},
    ]

    return (
        <div className="composeEmailSectionRight">
            <TextField required id="standard-required" label="Search For a User" />
            <div className="allUsersItemsSection">
                {x.map( (value, index) => 
                    <UserItem key={index} username={value.username} />
                )}
            </div>
        </div>
    )
}
