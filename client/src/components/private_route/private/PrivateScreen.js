import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './privateScreen.css'
import { useDispatch, useSelector } from 'react-redux';
import { authenticateFailure } from '../../../redux/actions';
import Chatbox from './chatbox/chatbox';

function PrivateScreen(){



    const data = useSelector(state => state.data);
    const dispatch = useDispatch();


    async function logOut(){
        await axios.post('/api/auth/logout');
        dispatch(authenticateFailure());
    }

    return (
        <div id='private-screen'>
            <h1 id='private-title'>Welcome {data.user.username}</h1>
            <Chatbox />
            <Link id='log-out-link' to='/login'><button id='log-out-btn' onClick={logOut}>Log Out</button></Link>
        </div>
    )
}

export default PrivateScreen;