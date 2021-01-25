const express = require('express');
const router = express.Router();
const usersLogic = require('../logic/usersLogic');


router.post('/', async (request, response, next) => {

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

router.post('/login', async (request, response, next) => {

    // extraction the registration data that was sent
    const loginInfo = request.body;
    
    try {
        const succesfullLoginResponse = await usersLogic.login(loginInfo);
        response.json(succesfullLoginResponse);
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;