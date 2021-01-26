import Message from "../models/Message";
import User from "../models/User";
import Action from "./Action";
import { ActionType } from "./ActionType";

class InitialState {
  public constructor(
    public allUsers: User[],
    public allUserMessages: Message[]
  ) { }
}
const initialState = new InitialState(new Array <User>(), new Array <Message>())


export default function appReducer(state = initialState, action: Action) {

  switch (action.type) {
    case ActionType.UpdateAllUsers:
      return new InitialState(action.payload, [...state.allUserMessages]);

  default:
    return state;
  }
}