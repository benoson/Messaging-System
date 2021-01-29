import socketIOClient from "socket.io-client";

export default class Socket {
    public constructor() {}

    private socket: any;

    private initiateSocket = () => {

        const userInfo = sessionStorage.getItem('userInfo');
        socketIOClient('http://localhost:3002', { query: "userToken=" + JSON.parse(userInfo!).token});
        this.registerAllSocketListeners();
    }

    private registerAllSocketListeners = () => {

        // Registering all Socket.io Listeners

        // Registering an 'add vacation' listener, which updates the UI for all the clients
        this.socket.on('add-vacation', (newlyAddedVacation: Vacation) => {
            this.addVacationViaSocketIO(newlyAddedVacation);
        });

        // Registering an 'update vacation' listener, which updates the UI for all the clients
        this.socket.on('update-vacation-info', (convertedValidDataForUIDisplay: Vacation) => {
            this.updateVacationInfoViaSocketIO(convertedValidDataForUIDisplay);
        });

        // Registering a 'delete vacation' listener, which updates the UI for all the clients
        this.socket.on('delete-vacation', (clickedVacationID: number) => {
            this.deleteVacationViaSocketIO(clickedVacationID);
        });

        // Registering an 'increase vacation followers count' listener, which updates the UI for all the clients
        this.socket.on('increase-vacation-followers-count', (socketInfo: {clickedVacationID: number, userName: string}) => {
            this.increaseVacationFollowersCountViaSocketIO(socketInfo);
        });

        // Registering a 'decrease vacation followers count' listener, which updates the UI for all the clients
        this.socket.on('decrease-vacation-followers-count', (socketInfo: {clickedVacationID: number, userName: string}) => {
            this.decreaseVacationFollowersCountViaSocketIO(socketInfo);
        });
    }
}