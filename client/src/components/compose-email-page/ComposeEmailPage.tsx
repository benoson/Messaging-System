import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import StyledButton from '../custom-button/CustomButton';
import UserItem from '../user-item/UserItem';
import './ComposeEmailPage.css';

export default function ComposeEmailPage() {

    const [searchedUsers, setSearchedUsers] = useState(null);

    const x = [
        {username: "benoson"},
        {username: "benoson2"},
        {username: "benoson3"},
        {username: "benoson4"},
        {username: "benoson5"},
    ]

    return (
        <div className="composeEmailPage">
            <h1 className="composeEmailHeader">Compose Your Email</h1>

            <form className="composeEmailForm">
                <div className="composeEmailSectionLeft">
                    <TextField required className="inputField" margin="normal" label="Subject" variant="outlined" />

                    <TextField
                        required
                        id="messageInput"
                        margin="normal"
                        className="inputField"
                        label="Compose your message"
                        multiline
                        rows={12}
                        variant="outlined"
                    />

                    <StyledButton buttonText="Send" />
                </div>

                <div className="composeEmailSectionRight">
                    <TextField required id="standard-required" label="Search For a User" />
                    <div className="allUsersItemsSection">
                        {x.map( (value, index) => 
                            <UserItem key={index} username={value.username} />
                        )}
                    </div>
                </div>
            </form>

        </div>
    )
}
