const errorHandler = (error, request, response, next) => {

    if (error.status === 401){
        response.status(401).json({ error: 'Your token is not valid, try re-logging' });
        return;
    }

    else if (error.errorType !== undefined) {
        console.log(error.errorType.message);
        if (error.errorType.isShowStackTrace) {
            response.status(error.errorType.httpCode).json({ errorMessage: error.errorType.message });
            return;
        }
    }
    console.log(error);
    response.status(600).json({ error: 'A General Error Has Occurred' });
}


module.exports = errorHandler;