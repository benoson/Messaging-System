const ServerError = require('../errors/ServerError');
const ErrorType = require('../errors/errorType');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const usersCache = require('../cache/UsersDataCache');


class UsersUtils {
    constructor() {};

    
    // ----- Validations

    /**
     * Returns `true` if the username and password are valid
     * @param {{username: string, password: string | number}} registrationInfo 
     */
    static validateRegistrationInfo = registrationInfo => {

        // validating the username and password, if one of them fails, it will throw an error
        UsersUtils.validateUsername(registrationInfo.username);
        UsersUtils.validateUserPassword(registrationInfo.password);
        return true;
    }

    /**
     * Returns `true` if a password is valid
     * @param Password
     */
    static validateUserPassword = password => {
        const trimmedPassword = password.toString().trim();

        if (trimmedPassword.length >= 4 && trimmedPassword.length <= 10) {
            return true;
        }
        throw new ServerError(ErrorType.INVALID_PASSWORD_LENGTH);
    };
    
    /**
     * Returns `true` if a username is valid
     * @param {string} username
     */
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


    // ----- Hashing and Salting

    /**
     * Returns a salted password based on a string
     * @param {string} password
     */
    static generateSaltedPassword = password => {
        const leftPasswordSalt = '!@$g00gl3A$$i$t4nt$@!';
        const rightPasswordSalt = 'I-L0v3-Fu115t4ck';
        return leftPasswordSalt + password + rightPasswordSalt;
    };

    /**
     * Returns a hashed password based on an existing password
     * @param {string} saltedPassword
     */
    static generateHashedPassword = saltedPassword => {
        return crypto.createHash('md5').update(saltedPassword).digest('hex');
    };

    /**
     * Returning a salted username based on a string
     * @param {string} username
     */
    static generateSaltedUsername = username => {
        const leftSalt = `b12%e3&$n!`;
        const rightSalt = 'xHzG$!*^&!';
        return leftSalt + username + rightSalt;
    };

    /**
     * Generates and returns a JWT token based on a username and a secret of type `json`.
     * @param {string} saltedUsername
     */
    static generateJWTtoken = saltedUsername => {
        return jwt.sign( { sub: saltedUsername }, config.secret);
    }


    // ----- Account

    static isUserLoggedIn = (request) => {
        const authorizationString = request.headers['authorization'];
        const token = authorizationString.substring("Bearer ".length);
        const userCacheData = usersCache.get(token);
        if (userCacheData !== undefined) {
            return true;
        }
        return false;
    }


    // ----- Caching

    /**
     * Saves a succesfull login response from the DB into the users cache
     * @param {string} token
     * @param {succesfulLoginServerResponse} succesfulLoginServerResponse
     */
    static saveUserInfoToServerCache = (token, succesfulLoginServerResponse) => {
        usersCache.set(token, succesfulLoginServerResponse)
    }

    /**
     * Extracts the info of a user, from the server's cache
     * @param request 
     */
    static extractUserInfoFromCache = (request) => {

        // Attempting to get the user's info from the server's cache, based on the token received
        const authorizationString = request.headers['authorization'];
        const token = authorizationString.substring("Bearer ".length);
        const userCacheData = usersCache.get(token);

        // If the token that was sent was not found, alert the client that the user is no longer logged in
        if (userCacheData === undefined) {
            throw new ServerError(ErrorType.USER_IS_NOT_LOGGED_IN);
        }
        return userCacheData;
    }

    /**
     * Deletes a user from the server's cache
     * @param request
     */
    static deleteUserFromCache = (request) => {
        // attempting to get the user's info from the server's cache, based on the token received
        const authorizationString = request.headers['authorization'];
        const userToken = authorizationString.substring("Bearer ".length);
        const userCacheData = usersCache.get(userToken);

        // if the token that was sent was not found, alert the client that the user is no longer logged in
        if (userCacheData === undefined) {
            throw new ServerError(ErrorType.USER_IS_NOT_LOGGED_IN);
        }

        // deleting the user from the server's cache
        usersCache.delete(userToken);
    }
}


module.exports = UsersUtils;