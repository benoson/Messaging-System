import TextField from '@material-ui/core/TextField';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { ChangeEvent } from 'react';
import { ActionType } from '../../redux/ActionType';
import Store from '../../redux/Store';
import MessagesUtils from '../../Utils/MessagesUtils';
import CustomButton from '../custom-button/CustomButton';
import SearchUsersSection from '../search-users-section/SearchUsersSection';
import Socket from '../../socket/socket';
import { Redirect } from 'react-router-dom';
import UsersUtils from '../../Utils/UsersUtils';
import './ComposeEmailPage.css';


export default function ComposeEmailPage() {

    const [receiver, setReceiver] = useState("");
    const formRef = useRef<HTMLFormElement>(null);
    const socket = Socket.Instance;

    useEffect(() => {
        UsersUtils.handleUserLoggedStatus();
        if (Store.getState().isLogged) {
            
            if (!socket.isConnectedToSocket) {
                socket.initiateSocket();
            }
            const unsubscribe = Store.subscribe(() => {
                const messageReceiver = Store.getState().composedMessage.receiverUsername;
                setReceiver(messageReceiver);
            });
    
            return () => {
                unsubscribe();
            }
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

    const onSendMessageClick = async (): Promise<void> => {
        if (MessagesUtils.validateMessage()) {
            const composedMessageFromStore = Store.getState().composedMessage;
            try {
                const messageID = await MessagesUtils.sendMessageToSelectedUser(composedMessageFromStore);
                const convertedMessageForDisplay = MessagesUtils.convertMessageForDisplay(messageID, composedMessageFromStore);
                MessagesUtils.updateSentMessageInDisplay(convertedMessageForDisplay);
                socket.emitMessage(convertedMessageForDisplay, composedMessageFromStore.receiverID);
                Store.dispatch({type: ActionType.ClearMessage});
                formRef.current!.reset();
            }
            catch (error) {
                alert(error);
            }
        }
    }


    return (
        Store.getState().isLogged ?
        <div className="composeEmailPage">
            <h1 className="composeEmailHeader">Compose An Email</h1>

            <form className="composeEmailForm" ref={formRef}>
                <div className="composeEmailSectionLeft">
                    <TextField required className="inputField" label="Subject" onChange={handleSubjectValueChange} />

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
        :
        <Redirect to="/welcome" />
        
    )
}
