import ReceivedMessage from "../../models/ReceivedMessage";
import DeleteEmailIcon from '../../assets/Delete-Email.svg';
import MessagesUtils from "../../Utils/MessagesUtils";
import './Email.css';

export default function Email(message: ReceivedMessage) {
    return (
        <div className="email">
            <div className="emailBodySection">
                <div className="leftEmailSection">
                    <h2 className="sharp subjectText">{message.subject}</h2>
                    <p className="sharp contentText">{message.content}</p>
                </div>
                <div className="rightEmailSection">
                    <img onClick={() => MessagesUtils.deleteImage(message.ID)} className="deleteEmailSVG" src={DeleteEmailIcon} alt="delete message"/>
                </div>
            </div>
            <div className="bottomEmailSection">
                <p className="sharp senderText">{message.senderUsername}</p>
                <p className="sharp creationDateText">{message.creationDate}</p>
            </div>
        </div>
    )
}
