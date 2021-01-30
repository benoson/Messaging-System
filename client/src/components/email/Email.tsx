import ReceivedMessage from "../../models/ReceivedMessage";
import DeleteEmailIcon from '../../assets/Delete-Email.svg';
import MessagesUtils from "../../Utils/MessagesUtils";
import swal from 'sweetalert';
import './Email.css';


interface emailBox {
    email: ReceivedMessage,
    isShowDeleteButton: boolean
}

export default function Email({email, isShowDeleteButton}: emailBox) {

    const onEmailDeleteClick = (): void => {
        swal(`Are you sure you want to delete this message from ${email.senderUsername} ?`)
        .then( async (value) => {
            if (value) {
                await MessagesUtils.deleteMessage(email.ID);
            }
        });
    }

    return (
        <div className="email">
            <div className="emailBodySection">
                <div className="leftEmailSection">
                    <h2 className="sharp subjectText">{email.subject}</h2>
                    <p className="sharp contentText">{email.content}</p>
                </div>
                {isShowDeleteButton && 
                    <div className="rightEmailSection">
                        <img onClick={onEmailDeleteClick} className="deleteEmailSVG" src={DeleteEmailIcon} alt="delete message" />
                    </div>
                }
            </div>
            <div className="bottomEmailSection">
                <p className="sharp senderText">{email.senderUsername}</p>
                <p className="sharp creationDateText">{email.creationDate}</p>
            </div>
        </div>
    )
}
