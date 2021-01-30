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

    public static validateMessageReceiver = (): boolean | void => {
        if (Store.getState().composedMessage.receiverID !== 0) {
            return true;
        }
        throw new Error("Invalid Message Receiver");
    }

    public static validateMessageSubject = (): boolean | void => {
        if (Store.getState().composedMessage.subject.trim().length > 0 && Store.getState().composedMessage.subject.trim().length < 46) {
            return true;
        }
        throw new Error("Subject Should 1 - 45 Characters Long");

    }

    public static validateMessageContent = (): boolean | void => {
        if (Store.getState().composedMessage.content.trim().length > 0 && Store.getState().composedMessage.content.trim().length < 1000) {
            return true;
        }
        throw new Error("Content Should 1 - 999 Characters Long");

    }

    public static sendMessageToSelectedUser = async (message: Message): Promise<number> => {
        Interceptor.interceptRequest();
        const newMessageID = await axios.post<number>("http://localhost:3001/messages/", message);
        return newMessageID.data;
    }

    public static updateSentMessageInDisplay = async (message: ReceivedMessage): Promise<void> => {
        Store.dispatch({type: ActionType.UpdateSingleSentMessage, payload: message});
    }

    public static getAllUserMessagesFromServer = async (): Promise<void> => {
        Interceptor.interceptRequest();
        const allUserMessages = await axios.get<ReceivedMessage[]>("http://localhost:3001/messages/");
        Store.dispatch({type: ActionType.UpdateAllUserMessages, payload: allUserMessages.data});
    }

    public static getAllSentMessagesFromServer = async (): Promise<void> => {
        Interceptor.interceptRequest();
        const allSentMessages = await axios.get<ReceivedMessage[]>("http://localhost:3001/messages/sent");
        Store.dispatch({type: ActionType.UpdateAllSentMessages, payload: allSentMessages.data});
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

    public static deleteMessage = async (messageIDtoDelete: number): Promise<void> => {
        await axios.delete<number>(`http://localhost:3001/messages/${messageIDtoDelete}`);
        const messageToDelete = Store.getState().allUserMessages.filter( message => message.ID === messageIDtoDelete);
        const indexOfMessageToDelete = Store.getState().allUserMessages.indexOf(messageToDelete[0]);
        Store.dispatch({type: ActionType.DeleteReceivedMessage, payload: indexOfMessageToDelete});
    }
}