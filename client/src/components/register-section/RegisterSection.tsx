import { Button, TextField } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import UserCredentialsDetails from '../../models/UserCredentialsDetails';
import UsersUtils from '../../Utils/UsersUtils';
import { useHistory } from 'react-router-dom';
import './RegisterSection.css';

export default function RegisterSection() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const onRegisterClick = async (): Promise<void> => {
        const newLoginData = new UserCredentialsDetails(username, password);
        if (UsersUtils.validateCredentials(newLoginData)) {
            await UsersUtils.register(newLoginData);
            history.push("/myEmails");
        }
    }

    const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const usernameInput: HTMLInputElement = event.target;
        const usernameValue = usernameInput.value;
        setUsername(usernameValue);
    }

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const passwordInput: HTMLInputElement = event.target;
        const passwordValue = passwordInput.value;
        setPassword(passwordValue);
    }

    return (
        <div className="registerSection">

            <h1 className="sectionHeader">New account ?</h1>
            <form className="registerForm">
                <TextField margin="normal" label="Username" onChange={onUsernameChange} />
                <TextField type="password" margin="normal" label="Password" color="primary" onChange={onPasswordChange} />
                
                <Button id="registerButton" variant="outlined" size="medium" color="primary" onClick={onRegisterClick}>Register</Button>
            </form>
        </div>
    )
}
