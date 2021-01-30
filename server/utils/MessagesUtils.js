const ErrorType = require("../errors/errorType");
const ServerError = require("../errors/ServerError");

class MessagesUtils {

    static validateMessage = (message) => {
        try {
            MessagesUtils.validateMessageReceiver(message.receiverID);
            MessagesUtils.validateMessageSubject(message.subject);
            MessagesUtils.validateMessageContent(message.content);
            return true;
        }
        catch (error) {
            return error;
        }
    }

    static validateMessageReceiver = (receiverID) => {
        if (receiverID !== 0) {
            return true;
        }
        throw new ServerError(ErrorType.INVALID_MESSAGE_REVEICER);
    }
    
    static validateMessageSubject = (subject) => {
        if (subject.trim() !== "") {
            return true;
        }
        throw new ServerError(ErrorType.INVALID_MESSAGE_SUBJECT);
    }
    
    static validateMessageContent = (content) => {
        if (content.trim() !== "") {
            return true;
        }
        throw new ServerError(ErrorType.INVALID_MESSAGE_CONTENT);
    }
}

module.exports = MessagesUtils;