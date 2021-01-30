import Message from "../models/Message";
import ReceivedMessage from "../models/ReceivedMessage";
import User from "../models/User";
import Action from "./Action";
import { ActionType } from "./ActionType";


class InitialState {
  public constructor(
    public allUsers: User[],
    public allUserMessages: ReceivedMessage[],
    public composedMessage: Message,
    public isLogged: boolean
  ) { }
}

const initialState = new InitialState(
  new Array <User>(),
  new Array <ReceivedMessage>(),
  new Message(0, "", "", "", 0),
  false
);


export default function appReducer(state = initialState, action: Action) {

  const composedMessage = state.composedMessage;

  switch (action.type) {
    case ActionType.UpdateAllUsers:
      return new InitialState([...action.payload], [...state.allUserMessages], composedMessage, state.isLogged);

    case ActionType.UpdateMessageReceiver:
      composedMessage.receiverID = action.payload.ID;
      composedMessage.receiverUsername = action.payload.username;
      return new InitialState([...state.allUsers], [...state.allUserMessages], composedMessage, state.isLogged);

    case ActionType.UpdateMessageSubject:
      composedMessage.subject = action.payload;
      return new InitialState([...state.allUsers], [...state.allUserMessages], composedMessage, state.isLogged);

    case ActionType.UpdateMessageContent:
      composedMessage.content = action.payload;
      return new InitialState([...state.allUsers], [...state.allUserMessages], composedMessage, state.isLogged);

    case ActionType.UpdateAllUserMessages:
      return new InitialState([...state.allUsers], [...action.payload], composedMessage, state.isLogged);

    case ActionType.DeleteMessage:
      const allUserMessages = state.allUserMessages;
      allUserMessages.splice(action.payload, 1);
      return new InitialState([...state.allUsers], [...allUserMessages], composedMessage, state.isLogged);

    case ActionType.UpdateSingleMessage:
      const newMessages = state.allUserMessages;
      newMessages.push(action.payload);
      return new InitialState([...state.allUsers], [...newMessages], composedMessage, state.isLogged);

    case ActionType.ChangeLoggedStatus:
      return new InitialState([...state.allUsers], [...state.allUserMessages], composedMessage, action.payload);

    case ActionType.ClearStore:
      return new InitialState( new Array <User>(), new Array <ReceivedMessage>(), new Message(0, "", "", "", 0), false);

  default:
    return state;
  }
}