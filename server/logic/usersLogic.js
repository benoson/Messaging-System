const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/ServerError');
const UsersUtils = require('../utils/UsersUtils');
const usersDao = require('../dao/usersDao');
const SuccesfulLoginServerResponse = require('../models/SuccesfulLoginServerResponse');
const ServerCacheDetails = require('../cache/ServerCacheDetails');


const getAllUsers = async () => {
    return await usersDao.getAllUsers();
}

const addUser = async (registrationInfo) => {

    const isUsernameAlreadyExist = await usersDao.isUsernameAlreadyExist(registrationInfo);
    if (isUsernameAlreadyExist) {
        throw new ServerError(ErrorType.USERNAME_ALREADY_EXISTS);
    }

    UsersUtils.validateRegistrationInfo(registrationInfo);
    const saltedPassword = UsersUtils.generateSaltedPassword(registrationInfo.password);
    registrationInfo.password = UsersUtils.generateHashedPassword(saltedPassword);
    await usersDao.addUser(registrationInfo);
    return login(registrationInfo, true);
}

const login = async (registrationInfo, isFreshUser) => {

    if (!isFreshUser) {
        const saltedPassword = UsersUtils.generateSaltedPassword(registrationInfo.password);
        registrationInfo.password = UsersUtils.generateHashedPassword(saltedPassword);
    }

    const userLoginResponse = await usersDao.login(registrationInfo);
    const saltedUsername = UsersUtils.generateSaltedUsername(registrationInfo.username);
    const token = UsersUtils.generateJWTtoken(saltedUsername);
    const serverCacheDetails = new ServerCacheDetails(userLoginResponse.ID, userLoginResponse.username);
    UsersUtils.saveUserInfoToServerCache(token, serverCacheDetails);
    return new SuccesfulLoginServerResponse(token, userLoginResponse.username);
}


module.exports = {
    addUser,
    login,
    getAllUsers
}