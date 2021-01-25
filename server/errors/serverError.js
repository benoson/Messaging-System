class ServerError extends Error {

    constructor (errorType, message, innerError) {
        super(message);
        
        this.errorType = errorType;
        this.innerError = innerError;
    }
}

module.exports = ServerError;