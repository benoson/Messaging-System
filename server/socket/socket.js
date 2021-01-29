const registerSocketConnections = (server) => {

    const usersIDSocketMap = require('../models/UsersIDSocketMap');
    const usersDataCache = require('../cache/UsersDataCache');

    const http = require('http').createServer(server);
    const io = require('socket.io')(http);

    io.on('connection', (socket) => {

        const handshakeData = socket.request;

        const userToken = handshakeData._query['userToken'];
        const userCacheData = usersDataCache.get(userToken);

        if (userCacheData !== undefined) {
            
            const userID = userCacheData.userID;
    
            usersIDSocketMap.set(userID, socket);
    
            socket.on('add-vacation', (newlyAddedVacation) => {
                io.emit('add-vacation', newlyAddedVacation);
            });
        
            socket.on('update-vacation-info', (updatedVacationData) => {
                io.emit('update-vacation-info', updatedVacationData);
            });
        
            socket.on('delete-vacation', (clickedVacationID) => {
                io.emit('delete-vacation', clickedVacationID);
            });
        
            socket.on('increase-vacation-followers-count', (socketInfo) => {
                io.emit('increase-vacation-followers-count', socketInfo);
                io.emit('vacation-likes-update');
            });
        
            socket.on('decrease-vacation-followers-count', (socketInfo) => {
                io.emit('decrease-vacation-followers-count', socketInfo);
                io.emit('vacation-likes-update');
            });
        }

        socket.on('disconnect', () => {

            let handshakeData = socket.request;
            let userID = handshakeData._query['userID'];
    
            usersIDSocketMap.delete(userID);
        })
    });

    http.listen(3002, () => {
        console.log('socket listening on port 3002');
    })
}

module.exports = registerSocketConnections;