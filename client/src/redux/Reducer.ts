import Message from "../models/Message";
import ReceivedMessage from "../models/ReceivedMessage";
import User from "../models/User";
import Action from "./Action";
import { ActionType } from "./ActionType";


class InitialState {
  public constructor(
    public allUsers: User[],
    public allUserMessages: ReceivedMessage[],
    public allMessagesSent: ReceivedMessage[],
    public composedMessage: Message,
    public isLogged: boolean
  ) { }
}

const initialState = new InitialState(
  new Array <User>(),
  new Array <ReceivedMessage>(),
  new Array <ReceivedMessage>(),
  new Message(0, "", "", "", 0),
  false
);


export default function appReducer(state = initialState, action: Action) {

  const composedMessage = state.composedMessage;

  switch (action.type) {
    case ActionType.UpdateAllUsers:
      return new InitialState([...action.payload], [...state.allUserMessages], state.allMessagesSent, composedMessage, state.isLogged);

    case ActionType.UpdateMessageReceiver:
      composedMessage.receiverID = action.payload.ID;
      composedMessage.receiverUsername = action.payload.username;
      return new InitialState([...state.allUsers], [...state.allUserMessages], state.allMessagesSent, composedMessage, state.isLogged);

    case ActionType.UpdateMessageSubject:
      composedMessage.subject = action.payload;
      return new InitialState([...state.allUsers], [...state.allUserMessages], state.allMessagesSent, composedMessage, state.isLogged);

    case ActionType.UpdateMessageContent:
      composedMessage.content = action.payload;
      return new InitialState([...state.allUsers], [...state.allUserMessages], state.allMessagesSent, composedMessage, state.isLogged);

    case ActionType.UpdateAllUserMessages:
      return new InitialState([...state.allUsers], [...action.payload], state.allMessagesSent, composedMessage, state.isLogged);

    case ActionType.UpdateAllSentMessages:
      return new InitialState([...state.allUsers], state.allUserMessages, [...action.payload], composedMessage, state.isLogged);

    case ActionType.DeleteReceivedMessage:
      const allUserMessages = state.allUserMessages;
      allUserMessages.splice(action.payload, 1);
      return new InitialState([...state.allUsers], [...allUserMessages], state.allMessagesSent, composedMessage, state.isLogged);

    case ActionType.UpdateSingleMessage:
      const newMessages = state.allUserMessages;
      newMessages.push(action.payload);
      return new InitialState([...state.allUsers], [...newMessages], state.allMessagesSent, composedMessage, state.isLogged);

    case ActionType.UpdateSingleSentMessage:
        const sentMessages = state.allMessagesSent;
        sentMessages.push(action.payload);
        return new InitialState([...state.allUsers], state.allUserMessages, [...sentMessages], composedMessage, state.isLogged);

    case ActionType.ChangeLoggedStatus:
      return new InitialState([...state.allUsers], [...state.allUserMessages], state.allMessagesSent, composedMessage, action.payload);

    case ActionType.ClearMessage:
      return new InitialState([...state.allUsers], [...state.allUserMessages], state.allMessagesSent, new Message(0, "", "", "", 0), state.isLogged);

    case ActionType.ClearStore:
      return new InitialState(new Array <User>(), new Array <ReceivedMessage>(), new Array <ReceivedMessage>(), new Message(0, "", "", "", 0), false);

  default:
    return state;
  }
}