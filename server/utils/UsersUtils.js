const ServerError = require('../errors/ServerError');
const ErrorType = require('../errors/errorType');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const usersCache = require('../cache/UsersDataCache');


class UsersUtils {
    constructor() {};

    static validateRegistrationInfo = registrationInfo => {
        UsersUtils.validateUsername(registrationInfo.username);
        UsersUtils.validateUserPassword(registrationInfo.password);
        return true;
    }

    static validateUserPassword = password => {
        const trimmedPassword = password.toString().trim();

        if (trimmedPassword.length >= 4 && trimmedPassword.length <= 10) {
            return true;
        }
        throw new ServerError(ErrorType.INVALID_PASSWORD_LENGTH);
    };
    
    static validateUsername = username => {
        if (typeof username === "string") {
            const trimmedUsername = username.trim();
    
            if (trimmedUsername.length >= 3 && trimmedUsername.length <= 10) {
                return true;
            }
            throw new ServerError(ErrorType.INVALID_FIRST_NAME_LENGTH);
        }
        throw new ServerError(ErrorType.INVALID_USERNAME);
    };

    static generateSaltedPassword = password => {
        const leftPasswordSalt = '!@$g00gl3A$$i$t4nt$@!';
        const rightPasswordSalt = 'I-L0v3-Fu115t4ck';
        return leftPasswordSalt + password + rightPasswordSalt;
    };

    static generateHashedPassword = saltedPassword => {
        return crypto.createHash('md5').update(saltedPassword).digest('hex');
    };

    static generateSaltedUsername = username => {
        const leftSalt = `b12%e3&$n!`;
        const rightSalt = 'xHzG$!*^&!';
        return leftSalt + username + rightSalt;
    };

    static generateJWTtoken = saltedUsername => {
        return jwt.sign( { sub: saltedUsername }, config.secret);
    }


    static isUserLoggedIn = (request) => {
        const authorizationString = request.headers['authorization'];
        const token = authorizationString.substring("Bearer ".length);
        const userCacheData = usersCache.get(token);
        if (userCacheData !== undefined) {
            return true;
        }
        return false;
    }

    static saveUserInfoToServerCache = (token, succesfulLoginServerResponse) => {
        usersCache.set(token, succesfulLoginServerResponse)
    }

    static extractUserInfoFromCache = (request) => {
        const authorizationString = request.headers['authorization'];
        const token = authorizationString.substring("Bearer ".length);
        const userCacheData = usersCache.get(token);

        if (userCacheData === undefined) {
            throw new ServerError(ErrorType.USER_IS_NOT_LOGGED_IN);
        }
        return userCacheData;
    }

    static deleteUserFromCache = (request) => {
        const authorizationString = request.headers['authorization'];
        const userToken = authorizationString.substring("Bearer ".length);
        const userCacheData = usersCache.get(userToken);

        if (userCacheData === undefined) {
            throw new ServerError(ErrorType.USER_IS_NOT_LOGGED_IN);
        }

        usersCache.delete(userToken);
    }
}


module.exports = UsersUtils;