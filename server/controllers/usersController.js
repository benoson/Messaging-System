const express = require('express');
const router = express.Router();
const usersLogic = require('../logic/usersLogic');


router.get('/', async (request, response, next) => {

    try {
        const allUsers = await usersLogic.getAllUsers();
        response.json(allUsers);
    }
    catch (error) {
        return next(error);
    }
});

router.post('/', async (request, response, next) => {

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