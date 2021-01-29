import ReceivedMessage from "../../models/ReceivedMessage";
import './Email.css';

export default function Email(message: ReceivedMessage) {
    return (
        <div className="email">
            <h2>From: {message.senderUsername}</h2>
            <h2>{message.subject}</h2>
            <h3>{message.content}</h3>
            <h4>{message.creationDate}</h4>
        </div>
    )
}
