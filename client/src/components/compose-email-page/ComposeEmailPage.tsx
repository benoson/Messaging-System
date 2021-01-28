import TextField from '@material-ui/core/TextField';
import { ChangeEvent, useEffect, useState } from 'react';
import { ActionType } from '../../redux/ActionType';
import Store from '../../redux/Store';
import CustomButton from '../custom-button/CustomButton';
import SearchUsersSection from '../search-users-section/SearchUsersSection';
import './ComposeEmailPage.css';


export default function ComposeEmailPage() {

    const [messageSubject, setMessageSubject] = useState("");
    const [messageContent, setMessageContent] = useState("");
    
    useEffect(() => {

        const unsubscribe = Store.subscribe(() => {
            const composedMessageFromStore = Store.getState().composedMessage;
            setMessageSubject(composedMessageFromStore.subject);
            setMessageContent(composedMessageFromStore.content);
        });

        return () => {
            unsubscribe();
        }
    }, []);


    const handleSubjectValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const subjectInput: HTMLInputElement = event.target;
        const subjectValue = subjectInput.value.trim();
        Store.dispatch({type: ActionType.UpdateMessageSubject, payload: subjectValue});
    }

    const handleMessageContentValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const contentInput: HTMLInputElement = event.target;
        const contentValue = contentInput.value.trim();
        Store.dispatch({type: ActionType.UpdateMessageContent, payload: contentValue});
    }

    return (
        <div className="composeEmailPage">
            <h1 className="composeEmailHeader">Compose Your Email</h1>

            <form className="composeEmailForm">
                <div className="composeEmailSectionLeft">
                    <TextField value={messageSubject} className="inputField" label="Subject" onChange={handleSubjectValueChange} />

                    <TextField
                        value={messageContent}
                        required
                        id="messageInput"
                        margin="normal"
                        className="inputField"
                        label="Your message"
                        multiline
                        rows={12}
                        variant="outlined"
                        onChange={handleMessageContentValueChange}
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
