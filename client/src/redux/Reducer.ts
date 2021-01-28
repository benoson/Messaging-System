import Message from "../models/Message";
import User from "../models/User";
import Action from "./Action";
import { ActionType } from "./ActionType";


class InitialState {
  public constructor(
    public allUsers: User[],
    public allUserMessages: Message[],
    public composedMessage: Message
  ) { }
}

const initialState = new InitialState(
  new Array <User>(),
  new Array <Message>(),
  new Message("", "", "", undefined, undefined)
);


export default function appReducer(state = initialState, action: Action) {

  switch (action.type) {
    case ActionType.UpdateAllUsers:
      return new InitialState(action.payload, [...state.allUserMessages], state.composedMessage);

    case ActionType.UpdateMessageReceiver:
      const updatedComposedMessage = state.composedMessage;
      updatedComposedMessage.receiverID = action.payload;
      return new InitialState([...state.allUsers], [...state.allUserMessages], updatedComposedMessage);

  default:
    return state;
  }
}