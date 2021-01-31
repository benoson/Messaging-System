const registerSocketConnections = (server) => {

    const usersIDSocketMap = require('../models/UsersIDSocketMap');
    const usersDataCache = require('../cache/UsersDataCache');
    const http = require('http').createServer(server);
    const io = require('socket.io')(http, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        const handshakeData = socket.request;
        const userToken = handshakeData._query['userToken'];
        const userData = usersDataCache.get(userToken);

        if (userData !== undefined) {
            const userID = userData.ID;
            usersIDSocketMap.set(userID, socket);

            socket.on('send-message', (message, receiverID) => {
                const receiver = usersIDSocketMap.get(receiverID);
                if (receiver !== undefined) {
                    io.to(receiver.id).emit('receive-message', message);
                }
            });
        }

        socket.on('disconnect', () => {
            const handshakeData = socket.request;
            const userID = handshakeData._query['userID'];
            usersIDSocketMap.delete(userID);
        })
    });

    http.listen(3002, () => {
        console.log('socket listening on port 3002');
    })
}

module.exports = registerSocketConnections;