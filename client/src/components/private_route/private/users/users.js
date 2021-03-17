import './users.css';
import { useSelector } from 'react-redux';


function Users(){

    const users = useSelector(state => state.auth_data.users).map(item => item.username);
    const user = useSelector(state => state.auth_data.user);
    
    const onlineUsers = useSelector(state => state.online.online_users).map(item => item.username).filter(item => item !== user.username);
    const offlineUsers = users.filter(item => !onlineUsers.includes(item)).filter(item => item !== user.username);


    return (
        <div id='user-section'>
            <ul id='user-list'>
            <li className='user-list-item'><i className="fa fa-circle fa-circle-online" aria-hidden="true"></i> {user.username}</li>
            {onlineUsers.map((item, index) => (<li className='user-list-item' key={index}><i className="fa fa-circle fa-circle-online" aria-hidden="true"></i> {item}</li>))}
            {offlineUsers.map((item, index) => (<li className='user-list-item' key={index}><i className="fa fa-circle" aria-hidden="true"></i> {item}</li>))}
            </ul>
        </div>
    )
}

export default Users;