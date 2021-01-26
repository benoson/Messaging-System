import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import './LoginSection.css';

export default function LoginSection() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onLoginClick = async (): Promise<void> => {

    }

    const onInputValueChange = () => {

    }


    return (
        <div className="loginSection">

            <h1 className="sectionHeader">Have an account ?</h1>
            <form className="loginForm">
                <TextField margin="normal" label="Username" />
                <TextField type="password" margin="normal" label="Password" color="primary" onChange={onInputValueChange} />
                
                <Button id="loginButton" variant="outlined" size="medium" color="primary" onClick={onLoginClick}>Login</Button>
            </form>
        </div>
    )
}
