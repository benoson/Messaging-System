import socketIOClient from "socket.io-client";
import ReceivedMessage from "../models/ReceivedMessage";
import { ActionType } from "../redux/ActionType";
import Store from "../redux/Store";

export default class Socket {
    private static _instance: Socket;
    public socketConnection: any;
    public isConnectedToSocket: boolean;
    
    private constructor() {
        this.isConnectedToSocket = false;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public initiateSocket = (): void => {
        const userInfo = localStorage.getItem('userInfo');
        const userToken = JSON.parse(userInfo!).token;
        this.socketConnection = socketIOClient('http://localhost:3002', { query: "userToken=" + userToken});
        this.registerSocketListeners();
        this.isConnectedToSocket = true;
    }
    
    private registerSocketListeners = (): void => {
    
        this.socketConnection.on('receive-message', (receivedMessage: ReceivedMessage) => {
            
            Store.dispatch({type: ActionType.UpdateSingleMessage, payload: receivedMessage});
        });
    }

    public emitMessage = (composedMessage: ReceivedMessage): void => {
        this.socketConnection.emit('send-message', composedMessage);
    }
}