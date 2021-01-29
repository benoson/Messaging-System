let connection = require("./connectionWrapper");
let ErrorType = require("../errors/errorType");
let ServerError = require("../errors/serverError");


const getAllUserEmails = async (userID) => {
    const SQL = "SELECT (SELECT USERNAME FROM users WHERE ID = messages.ID) as sender, MESSAGE as content, SUBJECT as subject, CREATION_DATE as creationDate FROM messages WHERE RECEIVER = ?";
    const parameters = [userID];
    
    try {
        const allUserEmails = await connection.executeWithParameters(SQL, parameters);
        return allUserEmails;
    }
    
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const saveMessage = async (userID, message) => {
    const SQL = "INSERT INTO messages (SENDER, RECEIVER, MESSAGE, SUBJECT, CREATION_DATE) VALUES(?, ?, ?, ?, ?)";
    const parameters = [userID, message.receiverID, message.content, message.subject, message.creationDate];
    
    try {
        await connection.executeWithParameters(SQL, parameters);
    }
    
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}


module.exports = {
    getAllUserEmails,
    saveMessage
};