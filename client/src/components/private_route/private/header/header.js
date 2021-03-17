import './header.css';
import { Link } from 'react-router-dom';
import { authenticateFailure } from '../../../../redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Popup from 'reactjs-popup';

function Header(){

    const user = useSelector(state => state.auth_data.user);

    const dispatch = useDispatch();

    async function logOut(){
        await axios.post('/api/auth/logout');
        dispatch(authenticateFailure());
    }

    return (
        <header id='private-header'>
            <p id='private-header-title' className='private-header-item'><i className="fa fa-commenting" aria-hidden="true"></i> Chat Room</p>
            <p id='account-settings' className='private-header-item'>Account Settings</p>
            <Popup modal trigger={<i className="private-header-item fa fa-cog" aria-hidden="true"></i>} position="right center">
                <>
                </>
            </Popup>
            <Link className='private-header-item' id='log-out-link' to='/login'><button id='log-out-btn' onClick={logOut}>Log Out</button></Link>
        </header>
    )
}

export default Header;