const express = require('express');
const cors = require('cors');
const loginFilter = require('./middleware/login-filter');
const errorHandler = require('./errors/errorHandler');
const registerSocketConnections = require('./socket/socket');

const usersController = require('./controllers/usersController');
const messagesController = require('./controllers/messagesController');


const server = express();
server.use(express.json());
server.use( cors({origin: 'http://localhost:3000'}) );
server.use(loginFilter());
server.use('/users', usersController);
server.use('/messages', messagesController);
server.use(errorHandler);
registerSocketConnections(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});