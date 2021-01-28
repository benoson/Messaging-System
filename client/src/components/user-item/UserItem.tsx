import User from '../../models/User';
import { ActionType } from '../../redux/ActionType';
import Store from '../../redux/Store';
import './UserItem.css';


export default function UserItem(user: User) {

    const handleSearchedUserClick = ():void  => {
        Store.dispatch({type: ActionType.UpdateMessageReceiver, payload: {ID: user.ID, username: user.username}});
    }

    return (
        <div className="userItem" onClick={handleSearchedUserClick}>
            <p>{user.username}</p>
        </div>
    )
}
