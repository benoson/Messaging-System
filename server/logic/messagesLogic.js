const UsersUtils = require('../utils/UsersUtils');
const messagesDao = require('../dao/messagesDao');
const MessagesUtils = require('../utils/MessagesUtils');


const getAllUserEmails = async (request) => {
    const userID = UsersUtils.extractUserInfoFromCache(request).ID;
    return await messagesDao.getAllUserEmails(userID);
}

const getAllSentEmails = async (request) => {
    const userID = UsersUtils.extractUserInfoFromCache(request).ID;
    return await messagesDao.getAllSentEmails(userID);
}

const saveMessage = async (request, message) => {
    MessagesUtils.validateMessage(message)
    const userID = UsersUtils.extractUserInfoFromCache(request).ID;
    message.creationDate = new Date();
    return await messagesDao.saveMessage(userID, message);
}

const deleteMessage = async (messageID) => {
    return await messagesDao.deleteMessage(messageID);
}



module.exports = {
    getAllUserEmails,
    getAllSentEmails,
    saveMessage,
    deleteMessage
}