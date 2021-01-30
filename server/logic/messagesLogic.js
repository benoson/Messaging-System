const UsersUtils = require('../utils/UsersUtils');
const messagesDao = require('../dao/messagesDao');
const MessagesUtils = require('../utils/MessagesUtils');


const getAllUserEmails = async (request) => {
    const userID = UsersUtils.extractUserInfoFromCache(request).ID;
    return await messagesDao.getAllUserEmails(userID);
}

const saveMessage = async (request, message) => {
    MessagesUtils.validateMessage(message)
    const userID = UsersUtils.extractUserInfoFromCache(request).ID;
    message.creationDate = new Date();
    return await messagesDao.saveMessage(userID, message);
}

const deleteMessage = async (request, messageID) => {
    const userID = UsersUtils.extractUserInfoFromCache(request).ID;
    return await messagesDao.deleteMessage(userID, messageID);
}


module.exports = {
    getAllUserEmails,
    saveMessage,
    deleteMessage
}