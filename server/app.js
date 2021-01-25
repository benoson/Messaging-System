const express = require('express');
const cors = require('cors');
const loginFilter = require('./middleware/login-filter');
const errorHandler = require('./errors/errorHandler');

// defining the controllers
const usersController = require('./controllers/usersController');


// creating an Express application
const server = express();
server.use(express.json());

server.use('/users', usersController)

// assigning cors
server.use( cors({origin: 'http://localhost:3000'}) );

// assigning a login filter
server.use(loginFilter());

// assigning an error handler
server.use(errorHandler);

// running the server on the enviroment port / port 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});