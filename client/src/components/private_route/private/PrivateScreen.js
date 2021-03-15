import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './privateScreen.css'

function PrivateScreen(props){

    async function logOut(){
        try {
            await axios.post('/api/auth/logout');
            localStorage.removeItem("authToken");
        } catch (error) {
            
        }
    }

    return (
        <div id='private-screen'>
            <h1 id='private-title'>Welcome To Private Route</h1>
            <h2 id='private-description'>User Registration Log</h2>
            {props.data.map((item, index) => (
                <p className='private-log' key={index}>{item.username} Joined in {item.register_date.replace('T', ' ').slice(0, 16)} UTC Time</p>
            ))}
            <Link id='log-out-link' to='/login'><button id='log-out-btn' onClick={logOut}>Log Out</button></Link>
        </div>
    )
}

export default PrivateScreen;