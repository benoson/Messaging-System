let connection = require("./connectionWrapper");
let ErrorType = require("../errors/errorType");
let ServerError = require("../errors/serverError");


/**
 * Adds a user to the DB
 * @param {{username: string, password: string | number}} registrationInfo 
 */
const isUsernameAlreadyExist = async (registrationInfo) => {
    // Creating an SQL query to check if a given username already exists
    const SQL = "SELECT USERNAME FROM users WHERE USERNAME = ?";
    const parameters = [registrationInfo.username];
    
    try {
        // sending the SQL query with the registration data
        const response = await connection.executeWithParameters(SQL, parameters);

        // determines what to send, based on the reponse from the DB
        if (response.length === 0) {
            return false;
        }

        return true;
    }
    
    catch (error) {
        // throwing a technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

/**
 * Adds a user to the DB
 * @param {{username: string, password: string | number}} registrationInfo 
 */
const addUser = async (registrationInfo) => {
    // Creating an SQL query for inserting a new user to the DB
    const SQL = "INSERT INTO users (USERNAME, PASSWORD) VALUES (?, ?)";
    const parameters = [registrationInfo.username, registrationInfo.password];
    
    try {
        // sending the SQL query with the registration data
        await connection.executeWithParameters(SQL, parameters);
    }
    
    catch (error) {
        // throwing a technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

/**
 * Attemps to log in a user
 * @param {{email: string, hashedPassword: string}} userLoginInfo 
 */
const login = async (userLoginInfo) => {
    // Creating the SQL query to get the user from the DB
    const SQL = "SELECT ID, USERNAME as username FROM users where USERNAME = ? and PASSWORD = ?";
    const parameters = [userLoginInfo.username, userLoginInfo.password];
    let userLoginResult;

    try {
        // Sending the SQL query with the user's info to the DB
        userLoginResult = await connection.executeWithParameters(SQL, parameters);
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }

    // In case the user was not found in the DB
    if (userLoginResult.length === 0) {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHENTICATED);
    }

    // Returning the user that was found
    return userLoginResult[0];
}

module.exports = {
    login,
    addUser,
    isUsernameAlreadyExist
};