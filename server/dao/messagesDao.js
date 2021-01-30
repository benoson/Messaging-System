let connection = require("./connectionWrapper");
let ErrorType = require("../errors/errorType");
let ServerError = require("../errors/serverError");


const getAllUserEmails = async (userID) => {
    const SQL = "SELECT ID, (SELECT USERNAME FROM users WHERE ID = messages.SENDER) as senderUsername, MESSAGE as content, SUBJECT as subject, DATE_FORMAT(CREATION_DATE, '%d/%m/%Y') as creationDate FROM messages WHERE RECEIVER = ?";
    const parameters = [userID];
    
    try {
        const allUserEmails = await connection.executeWithParameters(SQL, parameters);
        return allUserEmails;
    }
    
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const getAllSentEmails = async (userID) => {
    const SQL = "SELECT ID, (SELECT USERNAME FROM users WHERE ID = messages.RECEIVER) as senderUsername, MESSAGE as content, SUBJECT as subject, DATE_FORMAT(CREATION_DATE, '%d/%m/%Y') as creationDate FROM messages WHERE SENDER = ?";
    const parameters = [userID];
    
    try {
        const allSentEmails = await connection.executeWithParameters(SQL, parameters);
        return allSentEmails;
    }
    
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const saveMessage = async (userID, message) => {
    const SQL = "INSERT INTO messages (SENDER, RECEIVER, MESSAGE, SUBJECT, CREATION_DATE) VALUES(?, ?, ?, ?, ?)";
    const parameters = [userID, message.receiverID, message.content, message.subject, message.creationDate];
    
    try {
        const queryInfo = await connection.executeWithParameters(SQL, parameters);
        return queryInfo.insertId;
    }
    
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const deleteMessage = async (messageID) => {
    const SQL = "UPDATE messages SET RECEIVER = ? WHERE ID = ?";
    const parameters = [null, messageID];
    
    try {
        await connection.executeWithParameters(SQL, parameters);
    }
    
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}


module.exports = {
    getAllUserEmails,
    getAllSentEmails,
    saveMessage,
    deleteMessage
};