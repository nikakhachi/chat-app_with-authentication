import './users.css';
import { useSelector } from 'react-redux';


function Users(){

    const users = useSelector(state => state.auth_data.users);
    const user = useSelector(state => state.auth_data.user);
    
    const onlineUsers = useSelector(state => state.online.online_users).filter(item => item.username !== user.username );
    const userStatus = useSelector(state => state.online.online_users).filter(item => item.username === user.username );

    const onlineUsernames = onlineUsers.filter(item => item.username !== user.username ).map(item => item.username);
    const offlineUsers = users.map(item => item.username).filter(item => !onlineUsernames.includes(item)).filter(item => item !== user.username );

    return (
        <div id='user-section'>
            <ul id='user-list'>
            <li className='user-list-item'><i className="fa fa-circle fa-circle-online" aria-hidden="true"></i> {user.username} <span id='you'>(you)</span> <em><span id='user-typing'>{userStatus.length === 1 && userStatus[0].typing ? 'Typing...' : null}</span></em></li>
            {onlineUsers.map((item, index) => (
                <li className='user-list-item' key={index}><i className="fa fa-circle fa-circle-online" aria-hidden="true"></i> {item.username} <em><span id='user-typing'>{item.typing ? 'Typing...' : null}</span></em></li>
                )
            )}
            {offlineUsers.map((item, index) => (
                <li className='user-list-item' key={index}><i className="fa fa-circle" aria-hidden="true"></i> {item} </li>
                )
            )}
            </ul>
        </div>
    )
}

export default Users;