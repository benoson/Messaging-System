import axios from "axios"
import Message from "../models/Message";
import ReceivedMessage from "../models/ReceivedMessage";
import { ActionType } from "../redux/ActionType";
import Store from "../redux/Store";
import Interceptor from "./Interceptor";

export default class MessagesUtils {
    public constructor() {}

    static sendMessageToSelectedUser = async (message: Message): Promise<number> => {
        Interceptor.interceptRequest();
        const newMessageID = await axios.post<number>("http://localhost:3001/messages/", message);
        return newMessageID.data;
    }

    static getAllUserMessagesFromServer = async (): Promise<void> => {
        Interceptor.interceptRequest();
        const allUserMessages = await axios.get<ReceivedMessage[]>("http://localhost:3001/messages/");
        Store.dispatch({type: ActionType.UpdateAllUserMessages, payload: allUserMessages.data});
    }
}