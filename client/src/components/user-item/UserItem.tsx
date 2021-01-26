import './UserItem.css';

interface UserItemType {
    username: string;
}

export default function UserItem({username}: UserItemType) {

    return (
        <div className="userItem">
            <p>{username}</p>
        </div>
    )
}
