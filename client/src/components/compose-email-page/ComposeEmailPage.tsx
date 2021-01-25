import TextField from '@material-ui/core/TextField';
import './ComposeEmailPage.css';

export default function ComposeEmailPage() {
    return (
        <div className="composeEmailPage">
            <h1 className="composeEmailHeader">Compose Your Email</h1>
            <form className="composeEmailForm">
                <TextField className="inputField" margin="normal" label="Subject" variant="outlined" />

                <TextField
                    id="messageInput"
                    margin="normal"
                    className="inputField"
                    label="Compose your message"
                    multiline
                    rows={12}
                    variant="outlined"
                />
            </form>
        </div>
    )
}
