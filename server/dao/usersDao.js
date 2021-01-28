let connection = require("./connectionWrapper");
let ErrorType = require("../errors/errorType");
let ServerError = require("../errors/serverError");


const getAllUsers = async () => {
    const SQL = "SELECT ID, USERNAME as username FROM users";
    
    try {
        return await connection.execute(SQL);
    }
    
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const isUsernameAlreadyExist = async (registrationInfo) => {
    const SQL = "SELECT USERNAME FROM users WHERE USERNAME = ?";
    const parameters = [registrationInfo.username];
    
    try {
        const response = await connection.executeWithParameters(SQL, parameters);
        if (response.length === 0) {
            return false;
        }
        return true;
    }
    
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const addUser = async (registrationInfo) => {
    const SQL = "INSERT INTO users (USERNAME, PASSWORD) VALUES (?, ?)";
    const parameters = [registrationInfo.username, registrationInfo.password];
    
    try {
        await connection.executeWithParameters(SQL, parameters);
    }
    
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

/**
 * 
 * @param {{username: string, password: string | number}} userLoginInfo 
 */
const login = async (userLoginInfo) => {
    const SQL = "SELECT ID, USERNAME as username FROM users where USERNAME = ? and PASSWORD = ?";
    const parameters = [userLoginInfo.username, userLoginInfo.password];
    let userLoginResult;

    try {
        userLoginResult = await connection.executeWithParameters(SQL, parameters);
    }

    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }

    if (userLoginResult.length === 0) {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHENTICATED);
    }

    return userLoginResult[0];
}

module.exports = {
    login,
    addUser,
    isUsernameAlreadyExist,
    getAllUsers
};