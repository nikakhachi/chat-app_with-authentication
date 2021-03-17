import './header.css';
import { Link } from 'react-router-dom';
import { authenticateFailure } from '../../../../redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Header(){

    const dispatch = useDispatch();

    async function logOut(){
        await axios.post('/api/auth/logout');
        dispatch(authenticateFailure());
    }

    return (
        <header id='private-header'>
            <Link id='log-out-link' to='/login'><button id='log-out-btn' onClick={logOut}>Log Out</button></Link>
        </header>
    )
}

export default Header;