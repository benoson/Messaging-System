import { useEffect, useState } from "react"
import ReceivedMessage from "../../models/ReceivedMessage";
import Store from "../../redux/Store";
import MessagesUtils from "../../Utils/MessagesUtils";
import Email from "../email/Email";

export default function MyEmails() {

    const [myEmails, setMyEmails] = useState<ReceivedMessage[]>(new Array <ReceivedMessage>());

    useEffect(() => {
        checkIfShuoldGetAllEmailsFromServer();
        
        const unsubscribe = Store.subscribe(() => {
            const allUserMessagesFromStore = Store.getState().allUserMessages;
            setMyEmails(allUserMessagesFromStore);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const checkIfShuoldGetAllEmailsFromServer = async (): Promise<void> => {
        const allUserMessagesFromStore = Store.getState().allUserMessages;
        if (allUserMessagesFromStore.length === 0) {
            MessagesUtils.getAllUserMessagesFromServer();
        }
    }

    return (
        <div className="myEmailsContainer">
            {myEmails.map( (email, index) => {
                <Email key={index} {...email} />
            })}
        </div>
    )
}
