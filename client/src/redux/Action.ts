import { ActionType } from "./ActionType";

export default interface Action {
    type: ActionType,
    payload ?: any
}