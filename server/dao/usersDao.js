let connection = require("./connectionWrapper");
let ErrorType = require("../errors/errorType");
let ServerError = require("../errors/serverError");

/**
 * Adds a user to the DB
 * @param {{username: string, password: string | number}} userInfo 
 */
const addUser = async (userInfo) => {
    // Creating an SQL query for inserting a new user to the DB
    const SQL = "INSERT INTO users (User_ID, First_Name, Last_Name, User_Name, Password, City, Street, User_Type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const parameters = [userInfo.ID, userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.hashedPassword, userInfo.city, userInfo.street, "CUSTOMER"];
    
    try {
        // sending the SQL query with the registration data
        await connection.executeWithParameters(SQL, parameters);
    }
    
    catch (error) {
        // throwing a technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const login = async (user) => {
    // Creating the SQL query to get the user from the DB
    const SQL = "SELECT User_ID as ID, User_Type as userType, First_Name as firstName FROM users where User_Name =? and Password =?";
    const parameters = [user.email, user.hashedPassword];
    let userLoginResult;

    try {
        // Sending the SQL query and the user's login data to the 'connection wrapper' preset
        userLoginResult = await connection.executeWithParameters(SQL, parameters);
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }

    // If the user was not found in the DB
    if (userLoginResult === null || userLoginResult.length === 0) {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHENTICATED);
    }

    // In case the procedure went well, and we found the user in the DB
    return userLoginResult[0];
}

module.exports = {
    login,
    addUser
};