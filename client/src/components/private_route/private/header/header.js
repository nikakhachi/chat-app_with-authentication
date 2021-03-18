import './header.css';
import { Link, useHistory } from 'react-router-dom';
import { authenticateFailure } from '../../../../redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { useState } from 'react';
function Header(){

    const history = useHistory();

    const user = useSelector(state => state.auth_data.user);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    const dispatch = useDispatch();

    async function logOut(){
        await axios.post('/api/auth/logout');
        dispatch(authenticateFailure());
    }

    async function handleChangeUsername(e, close){
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/private/user/usernameChange', { username, password, _id: user._id})
            setTimeout(() => {
                setMsg('');
                close();
                history.push('/login');
            }, 2000)
            return setMsg(data.msg);
            
        } catch (error) {
            setUsername('');
            setPassword('');
            setTimeout(() => setError(''), 2500);
            return setError(error.response.data.error);
        }
    }

    async function handleUserDelete(e){
        e.preventDefault();
        try {
            await axios.delete(`/api/private/user/delete/${user._id}`);
            setMsg('User deleted successfully. Redirecting to login page..');
            setTimeout(() => history.push('/login'), 2000);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <header id='private-header'>
            <a id='github-link' href='https://github.com/xnick7x/mern-authentication' 
            rel="noreferrer" target="_blank">
                <i className="fa fa-github" aria-hidden="true"></i> <span></span>
            </a>
            <p id='private-header-title' className='private-header-item'><i className="fa fa-commenting" aria-hidden="true"></i> Chat Room</p>
            <p id='account-settings' className='private-header-item'>Account Settings</p>
            <Popup nested className='settings-modal' trigger={<i className="private-header-item fa fa-cog" aria-hidden="true"></i>} >
                {close => (
                <ul id='account-settings-modal'>
                    <li className='settings-modal'>Account Settings</li>
                    <Popup modal className='username-change' trigger={<li className='settings-modal'>Change Username</li>} >
                        {close => (
                            <form id='username-change-form' onSubmit={(e) => handleChangeUsername(e, close)}>
                                <h3 className='modal-header'>Username Change</h3>
                                <label className='modal-label modal-element' htmlFor='modal-username'>New Username</label>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} 
                                    className='modal-input modal-element' id='modal-username' type='text' placeholder='Enter New Username' minLength='4' required/>
                                <label className='modal-label modal-element' htmlFor='modal-password'>Current Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} 
                                    className='modal-input modal-element' id='modal-password' type='password' placeholder='Enter Current Password'  minLength='6' required/>
                                {error !== '' ? <p id='modal-error'>{error}</p> : null}
                                {msg !== '' ? <p id='modal-msg'>{msg}</p> : null}
                                <button type='submit' className='modal-btn modal-element'>Submit</button>
                                <button className='modal-btn' id='username-change-return-btn' onClick={close}>Return</button>
                            </form>
                        )}
                    </Popup>
                    <Popup modal className='delete-account' trigger={<li className='settings-modal'>Delete Account</li>}>
                            {close => (
                                <div id='delete-account-container'>
                                    <h3 className='modal-header deletion-header'>Delete Account</h3>
                                    <p className='delete-account-text'>Are you sure ? Account will be removed permanently</p>
                                    {msg !== '' ? <p id='modal-msg' style={{color: 'red'}}>{msg}</p> : null}
                                    <button onClick={handleUserDelete} className='deletion-btn' id='delete-btn'>Delete</button>
                                    <button className='deletion-btn' id='return-btn' onClick={close}>Return</button>
                                </div>
                            )}
                    </Popup>
                    <li onClick={close} className='settings-modal'>Return</li>
                </ul>
                )}
            </Popup>
            <Link className='private-header-item' id='log-out-link' to='/login'><button id='log-out-btn' onClick={logOut}>Log Out</button></Link>
        </header>
    )
}

export default Header;