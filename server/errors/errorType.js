// Defining an ENUM-like list, for specific errors definitions and the data about the errors

const ErrorType = {

    GENERAL_ERROR: {
        id: 1,
        httpCode: 600,
        message: "A General Error Has Occurred",
        isShowStackTrace: true,
    },

    USER_IS_NOT_AUTHENTICATED: {
        id: 2,
        httpCode: 401,
        message: "Login Failed, Invalid Username or Password",
        isShowStackTrace: true,
    },
    
    USER_IS_NOT_AUTHORIZED: {
        id: 3,
        httpCode: 403,
        message: "You Are Not Authorized To Do That",
        isShowStackTrace: true,
    },
  
    USER_IS_NOT_LOGGED_IN: {
        id: 4,
        httpCode: 401,
        message: "You Are Not Logged In, Please Try Re-Logging",
        isShowStackTrace: true,
    },

    INVALID_PASSWORD_LENGTH: {
        id: 5,
        httpCode: 422,
        message: "Password Length Should Be between 4-10",
        isShowStackTrace: true,
    },

    INVALID_USERNAME: {
        id: 6,
        httpCode: 422,
        message: "Unacceptable username, please try a different one",
        isShowStackTrace: true,
    },

    INVALID_FIRST_NAME_LENGTH: {
        id: 7,
        httpCode: 422,
        message: "Username Length Should Be between 3-10",
        isShowStackTrace: true,
    },
};
  
  module.exports = ErrorType;