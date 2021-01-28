import TextField from '@material-ui/core/TextField';
import CustomButton from '../custom-button/CustomButton';
import SearchUsersSection from '../search-users-section/SearchUsersSection';
import './ComposeEmailPage.css';

export default function ComposeEmailPage() {

    return (
        <div className="composeEmailPage">
            <h1 className="composeEmailHeader">Compose Your Email</h1>

            <form className="composeEmailForm">
                <div className="composeEmailSectionLeft">
                    <TextField className="inputField" label="Subject" />

                    <TextField
                        required
                        id="messageInput"
                        margin="normal"
                        className="inputField"
                        label="Your message"
                        multiline
                        rows={12}
                        variant="outlined"
                    />

                    <CustomButton
                        buttonText="Send"
                        backgroundColor="transparent"
                        textColor="lightseagreen"
                        borderColor="lightseagreen"
                        hoverBgColor="lightseagreen"
                        hoverTextColor="white"
                    />
                </div>

                <SearchUsersSection />
            </form>

        </div>
    )
}
