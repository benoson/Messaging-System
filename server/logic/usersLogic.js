const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/ServerError');
const UsersUtils = require('../utils/UsersUtils');
const usersDao = require('../dao/usersDao');
const SuccesfulLoginServerResponse = require('../models/SuccesfulLoginServerResponse');
const ServerCacheDetails = require('../cache/ServerCacheDetails');

const addUser = async (registrationInfo) => {

    // validating that the username is not taken
    const isUsernameAlreadyExist = await usersDao.isUsernameAlreadyExist(registrationInfo);
    if (isUsernameAlreadyExist) {
        throw new ServerError(ErrorType.USERNAME_ALREADY_EXISTS);
    }

    try {
        // validating that the registration info is valid, if it fails, it will throw an error accordingly
        UsersUtils.validateRegistrationInfo(registrationInfo);

        // salting the user's password
        const saltedPassword = UsersUtils.generateSaltedPassword(registrationInfo.password);

        // hashing the salted password
        registrationInfo.password = UsersUtils.generateHashedPassword(saltedPassword);

        await usersDao.addUser(registrationInfo);

        // logging in after a succesfull registration
        return login(registrationInfo, true);
    }

    catch (serverError) {
        throw new ServerError(serverError);
    }
}

const login = async (registrationInfo, isFreshUser) => {

    // Checking if the user is fresh (sent here after a succesfull registration)
    if (!isFreshUser) {

        // salting and hashing the user's password
        const saltedPassword = UsersUtils.generateSaltedPassword(registrationInfo.password);
        registrationInfo.password = UsersUtils.generateHashedPassword(saltedPassword);
    }

    // sending the user's data to the DB
    const userLoginResponse = await usersDao.login(registrationInfo);

    // salting the user's username for a better token protection
    const saltedUsername = UsersUtils.generateSaltedUsername(registrationInfo.username);

    // generating a token based on the salted username, and a secret
    const token = UsersUtils.generateJWTtoken(saltedUsername);

    // creating a new instance of the ServerCacheDetails class, with the user's info
    const serverCacheDetails = new ServerCacheDetails(userLoginResponse.ID, userLoginResponse.username);

    // saving the user's info to the server's cache
    UsersUtils.saveUserInfoToServerCache(token, serverCacheDetails);

    // creating and returning an object with the login data response, to the client
    return new SuccesfulLoginServerResponse(token, userLoginResponse.username);
}


module.exports = {
    addUser,
    login
}