const UsersUtils = require('../utils/UsersUtils');
const messagesDao = require('../dao/messagesDao');


const getAllUserEmails = async (request) => {
    const userID = UsersUtils.extractUserInfoFromCache(request).ID;
    return await messagesDao.getAllUserEmails(userID);
}

const saveMessage = async (request, message) => {
    const userID = UsersUtils.extractUserInfoFromCache(request).ID;
    message.creationDate = new Date();
    return await messagesDao.saveMessage(userID, message);
}




module.exports = {
    getAllUserEmails,
    saveMessage
}