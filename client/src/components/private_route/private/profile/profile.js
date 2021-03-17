import './profile.css';
import { useSelector } from 'react-redux';


function Profile(){

    const users = useSelector(state => state.auth_data.users).map(item => item.username);
    const user = useSelector(state => state.auth_data.user);
    
    const onlineUsers = useSelector(state => state.online.online_users).map(item => item.username).filter(item => item !== user.username);
    const offlineUsers = users.filter(item => !onlineUsers.includes(item)).filter(item => item !== user.username);


    return (
        <div id='people-section'>
            <ul id='people-list'>
            <li className='people-list-item'><i className="fa fa-circle fa-circle-online" aria-hidden="true"></i> {user.username}</li>
            {onlineUsers.map((item, index) => (<li className='people-list-item' key={index}><i className="fa fa-circle fa-circle-online" aria-hidden="true"></i> {item}</li>))}
            {offlineUsers.map((item, index) => (<li className='people-list-item' key={index}><i className="fa fa-circle" aria-hidden="true"></i> {item}</li>))}
            </ul>
        </div>
    )
}

export default Profile;