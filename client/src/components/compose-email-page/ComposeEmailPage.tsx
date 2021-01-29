import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
import { ChangeEvent } from 'react';
import { ActionType } from '../../redux/ActionType';
import Store from '../../redux/Store';
import MessagesUtils from '../../Utils/MessagesUtils';
import CustomButton from '../custom-button/CustomButton';
import SearchUsersSection from '../search-users-section/SearchUsersSection';
import './ComposeEmailPage.css';


export default function ComposeEmailPage() {

    const [receiver, setReceiver] = useState("");

    useEffect(() => {
        const unsubscribe = Store.subscribe(() => {
            const messageReceiver = Store.getState().composedMessage.receiverUsername;
            setReceiver(messageReceiver);
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

    const onSendMessageClick = (): void => {
        const composedMessageFromStore = Store.getState().composedMessage;
        MessagesUtils.sendMessageToSelectedUser(composedMessageFromStore);
    }


    return (
        <div className="composeEmailPage">
            <h1 className="composeEmailHeader">Compose An Email</h1>

            <form className="composeEmailForm">
                <div className="composeEmailSectionLeft">
                    <TextField className="inputField" label="Subject" onChange={handleSubjectValueChange} />

                    <TextField
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

                    {receiver.trim() !== "" && <h2 className="receiverText">Sending To: <span className="receiverName">{receiver}</span></h2>}

                    <CustomButton
                        buttonText="Send"
                        backgroundColor="transparent"
                        textColor="lightseagreen"
                        borderColor="lightseagreen"
                        hoverBgColor="lightseagreen"
                        hoverTextColor="white"
                        toggleFunction={onSendMessageClick}
                    />
                </div>

                <SearchUsersSection />
            </form>
        </div>
    )
}
