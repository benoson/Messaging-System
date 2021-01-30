import { Button, TextField } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserCredentialsDetails from '../../models/UserCredentialsDetails';
import UsersUtils from '../../Utils/UsersUtils';
import Socket from '../../socket/socket';
import './LoginSection.css';


export default function LoginSection() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const socket = Socket.Instance;


    const onLoginClick = async (): Promise<void> => {
        const newLoginData = new UserCredentialsDetails(username, password);
        if (UsersUtils.validateCredentials(newLoginData)) {
            try {
                await UsersUtils.login(newLoginData);
                socket.initiateSocket();
                history.push("/myEmails");
            }
            catch (error) {
                alert(error);
            }
        }
    }

    const onUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const usernameInput: HTMLInputElement = event.target;
        const usernameValue = usernameInput.value;
        setUsername(usernameValue);
    }

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const passwordInput: HTMLInputElement = event.target;
        const passwordValue = passwordInput.value;
        setPassword(passwordValue);
    }


    return (
        <div className="loginSection">

            <h1 className="sectionHeader">Have an account ?</h1>
            <form className="loginForm">
                <TextField margin="normal" label="Username" onChange={onUsernameChange} />
                <TextField type="password" margin="normal" label="Password" color="primary" onChange={onPasswordChange} />
                
                <Button id="loginButton" variant="outlined" size="medium" color="primary" onClick={onLoginClick}>Login</Button>
            </form>
        </div>
    )
}
