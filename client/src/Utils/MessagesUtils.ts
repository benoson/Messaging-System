import axios from "axios"
import Message from "../models/Message";
import ReceivedMessage from "../models/ReceivedMessage";
import { ActionType } from "../redux/ActionType";
import Store from "../redux/Store";
import Interceptor from "./Interceptor";

export default class MessagesUtils {

    public static validateMessage = (): boolean => {
        try {
            MessagesUtils.validateMessageReceiver();
            MessagesUtils.validateMessageSubject();
            MessagesUtils.validateMessageContent();
            return true;
        }
        catch (error) {
            alert(error);
            return false;
        }
    }

    public static validateMessageReceiver = () => {
        if (Store.getState().composedMessage.receiverID !== 0) {
            return true;
        }
        throw new Error("Invalid Message Receiver");
    }

    public static validateMessageSubject = () => {
        if (Store.getState().composedMessage.subject.trim() !== "") {
            return true;
        }
        throw new Error("Invalid Message Subject");

    }

    public static validateMessageContent = () => {
        if (Store.getState().composedMessage.content.trim() !== "") {
            return true;
        }
        throw new Error("Invalid Message Content");

    }

    public static sendMessageToSelectedUser = async (message: Message): Promise<number> => {
        Interceptor.interceptRequest();
        const newMessageID = await axios.post<number>("http://localhost:3001/messages/", message);
        return newMessageID.data;
    }

    public static getAllUserMessagesFromServer = async (): Promise<void> => {
        Interceptor.interceptRequest();
        const allUserMessages = await axios.get<ReceivedMessage[]>("http://localhost:3001/messages/");
        Store.dispatch({type: ActionType.UpdateAllUserMessages, payload: allUserMessages.data});
    }

    public static convertMessageForDisplay = (messageID: number, composedMessageFromStore: Message): ReceivedMessage => {
        const username = JSON.parse(localStorage.getItem("userInfo")!).username;
        const messageDate = MessagesUtils.convertMessageDateForDisplay();
        return new ReceivedMessage(messageID, username, composedMessageFromStore.subject, composedMessageFromStore.content, messageDate);
    }

    public static convertMessageDateForDisplay = (): string => {
        const d = new Date();
        const month = '' + (d.getMonth() + 1);
        const day = '' + d.getDate();
        const year = d.getFullYear();

        return [day, month, year].join('/');
    }

    public static deleteImage = async (messageIDtoDelete: number): Promise<void> => {
        await axios.delete<number>(`http://localhost:3001/messages/${messageIDtoDelete}`);
        const messageToDelete = Store.getState().allUserMessages.filter( message => message.ID === messageIDtoDelete);
        const indexOfMessageToDelete = Store.getState().allUserMessages.indexOf(messageToDelete[0]);
        Store.dispatch({type: ActionType.DeleteMessage, payload: indexOfMessageToDelete});
    }
}