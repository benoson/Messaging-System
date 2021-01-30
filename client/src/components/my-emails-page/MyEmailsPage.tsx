import { useEffect, useState } from "react"
import ReceivedMessage from "../../models/ReceivedMessage";
import Store from "../../redux/Store";
import MessagesUtils from "../../Utils/MessagesUtils";
import Email from "../email/Email";
import Socket from '../../socket/socket';
import UsersUtils from "../../Utils/UsersUtils";
import { Redirect } from "react-router-dom";
import NoEmails from "../../assets/No-Emails.svg";
import './MyEmailsPage.css';


export default function MyEmails() {

    const [myEmails, setMyEmails] = useState<ReceivedMessage[]>(new Array <ReceivedMessage>());
    const socket = Socket.Instance;

    useEffect(() => {
        UsersUtils.handleUserLoggedStatus();
        if (Store.getState().isLogged) {
    
            if (!socket.isConnectedToSocket) {
                socket.initiateSocket();
            }
            checkIfShuoldGetAllEmailsFromServer();
            
            const unsubscribe = Store.subscribe((): void => {
                const allUserMessagesFromStore = Store.getState().allUserMessages;
                setMyEmails(allUserMessagesFromStore);
            });
    
            return () => {
                unsubscribe();
            }
        }
    }, []);

    const checkIfShuoldGetAllEmailsFromServer = async (): Promise<void> => {
        const allUserMessagesFromStore = Store.getState().allUserMessages;
        if (allUserMessagesFromStore.length === 0) {
            await MessagesUtils.getAllUserMessagesFromServer();
        }
        else {
            setMyEmails(allUserMessagesFromStore);
        }
    }

    return (
        Store.getState().isLogged ?

            <div className="myEmailsContainer">
                {myEmails.length > 0 ?
    
                    <div>
                        <h1 className="myEmailsHeader">My Emails</h1>
                        {myEmails.map( (email, index) =>
                            <Email key={index} email={email} isShowDeleteButton={true} />
                        )}
                    </div>
                :
                    <div>
                        <h1>No Emails Yet</h1>
                        <img className="noEmailsSVG" src={NoEmails} alt="no-emails"/>
                    </div>}
            </div>

        :
        <Redirect to="/welcome" />
    )
}
