import ReceivedMessage from "../../models/ReceivedMessage";
import './Email.css';

export default function Email(message: ReceivedMessage) {
    return (
        <div className="email">
            <h2 className="sharp subjectText">{message.subject}</h2>
            <p className="sharp contentText">{message.content}</p>
            <div className="bottomEmailSection">
                <p className="sharp senderText">{message.senderUsername}</p>
                <p className="sharp creationDateText">{message.creationDate}</p>
            </div>
        </div>
    )
}
