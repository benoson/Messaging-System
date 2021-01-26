import { Button, TextField } from '@material-ui/core';
import './RegisterSection.css';

export default function RegisterSection() {
    return (
        <div className="registerSection">

            <h1 className="sectionHeader">New account ?</h1>
            <form className="registerForm">
                <TextField margin="normal" label="Username" />
                <TextField type="password" margin="normal" label="Password" color="primary" />
                <TextField type="password" margin="normal" label="Verify Password" color="primary" />
                
                <Button id="registerButton" variant="outlined" size="medium" color="primary">Register</Button>
            </form>
        </div>
    )
}
