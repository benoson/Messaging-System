import Message from "../models/Message";
import ReceivedMessage from "../models/ReceivedMessage";
import User from "../models/User";
import Action from "./Action";
import { ActionType } from "./ActionType";


class InitialState {
  public constructor(
    public allUsers: User[],
    public allUserMessages: ReceivedMessage[],
    public composedMessage: Message
  ) { }
}

const initialState = new InitialState(
  new Array <User>(),
  new Array <ReceivedMessage>(),
  new Message("", "", "", null)
);


export default function appReducer(state = initialState, action: Action) {

  const composedMessage = state.composedMessage;

  switch (action.type) {
    case ActionType.UpdateAllUsers:
      return new InitialState(action.payload, [...state.allUserMessages], composedMessage);

    case ActionType.UpdateMessageReceiver:
      composedMessage.receiverID = action.payload.ID;
      composedMessage.receiverUsername = action.payload.username;
      return new InitialState([...state.allUsers], [...state.allUserMessages], composedMessage);

    case ActionType.UpdateMessageSubject:
      composedMessage.subject = action.payload;
      return new InitialState([...state.allUsers], [...state.allUserMessages], composedMessage);

    case ActionType.UpdateMessageContent:
      composedMessage.content = action.payload;
      return new InitialState([...state.allUsers], [...state.allUserMessages], composedMessage);

    case ActionType.UpdateAllUserMessages:
      const allUserMessages = action.payload;
      return new InitialState([...state.allUsers], allUserMessages, composedMessage);


  default:
    return state;
  }
}