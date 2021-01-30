import User from '../../models/User';
import { ActionType } from '../../redux/ActionType';
import Store from '../../redux/Store';
import './UserItem.css';


interface userItem {
    user: User,
    clearSearchList: Function
}

export default function UserItem({user, clearSearchList}: userItem) {

    const handleSearchedUserClick = ():void  => {
        Store.dispatch({type: ActionType.UpdateMessageReceiver, payload: {ID: user.ID, username: user.username}});
        clearSearchList();
    }

    return (
        <div className="userItem" onClick={handleSearchedUserClick}>
            <p>{user.username}</p>
        </div>
    )
}
