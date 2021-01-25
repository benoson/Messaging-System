const express = require('express');
const router = express.Router();
const usersLogic = require('../logic/usersLogic');


router.post('/register', async (request, response, next) => {

    // extraction the registration data that was sent
    const registrationInfo = request.body;
    
    try {
        const succesfullLoginResponse = await usersLogic.addUser(registrationInfo);
        response.json(succesfullLoginResponse);
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;