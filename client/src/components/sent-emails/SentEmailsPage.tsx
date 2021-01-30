import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Store from "../../redux/Store";
import MessagesUtils from "../../Utils/MessagesUtils";
import UsersUtils from "../../Utils/UsersUtils";
import NoEmails from '../../assets/No-Emails.svg';
import ReceivedMessage from "../../models/ReceivedMessage";
import Email from "../email/Email";
import './SentEmailsPage.css';


export default function SentEmailsPage() {

    const [mySentEmails, setMySentEmails] = useState<ReceivedMessage[]>(new Array <ReceivedMessage>());

    useEffect(() => {
        UsersUtils.handleUserLoggedStatus();
        if (Store.getState().isLogged) {

            checkIfShuoldGetAllSentEmailsFromServer();
            
            const unsubscribe = Store.subscribe((): void => {
                const allSentEmailsFromServer = Store.getState().allMessagesSent;
                setMySentEmails(allSentEmailsFromServer);
            });
    
            return () => {
                unsubscribe();
            }
        }
    }, []);

    const checkIfShuoldGetAllSentEmailsFromServer = async (): Promise<void> => {
        const allSentEmailsFromServer = Store.getState().allMessagesSent;
        if (allSentEmailsFromServer.length === 0) {
            await MessagesUtils.getAllSentMessagesFromServer();
        }
        else {
            setMySentEmails(allSentEmailsFromServer);
        }
    }
    
    return (
        Store.getState().isLogged ?

            <div className="myEmailsContainer">
                {mySentEmails.length > 0 ?
    
                    <div>
                        <h1 className="myEmailsHeader">Sent Emails</h1>
                        {mySentEmails.map( (email, index) =>
                            <Email key={index} email={email} isShowDeleteButton={false} />
                        )}
                    </div>
                :
                    <div>
                        <h1>No Sent Emails Yet</h1>
                        <img className="noEmailsSVG" src={NoEmails} alt="no-emails"/>
                    </div>}
            </div>

        :
        <Redirect to="/welcome" />
    )
}
