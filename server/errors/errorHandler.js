const errorHandler = (error, request, response, next) => {

    // If No Authorization Token Was Found By The Login Filter
    if (error.status === 401){
        response.status(401).json({ error: 'Your token is not valid, try re-logging' });
    }

    // If the error received is defined, and we want to send it to the client
    else if (error.errorType !== undefined) {

        console.log(error.errorType.message);
        if (error.errorType.isShowStackTrace) {
            response.status(error.errorType.httpCode).json({ errorMessage: error.errorType.message });
        }
    }

    console.log(error);

    // Else, send the user a general error
    response.status(600).json({ error: 'A General Error Has Occurred' });
}


module.exports = errorHandler;