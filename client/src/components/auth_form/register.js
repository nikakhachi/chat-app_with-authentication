import { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import SourceCode from '../../components/source_code/sourceCode';

function Register(){

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    async function submitForm(e){
        e.preventDefault();
        if(password !== confirmPassword){
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => setError(''), 2500);
            return setError('Password do not match');
        }
        const newUser = {username, email, password};
        try {
            await axios.post(`/api/auth/register`, newUser)
            setMsg('User created. Redirecting to private page...');
            setTimeout(() => history.push('/'), 1000);
        } catch (error) {
            setEmail('');
            setTimeout(() => setError(''), 2500);
            setError(error.response.data.error);
        }
    }

    return (
        <>
        <SourceCode />
        <div className='form-div'>
            <h2 className='form-title' id='register-title'>Sign Up</h2>
            <form className='form' id='register-form' onSubmit={submitForm}>
                <label className='form-label form-element' htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} minLength='4'  
                    className='form-input form-element' id='username' type='text' placeholder='Enter Username' />
                <label className='form-label form-element' htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} 
                    className='form-input form-element' id='email' type='email' placeholder='Enter Email' />
                <label className='form-label form-element' htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} minLength='6'
                    className='form-input form-element' id='password' type='password' placeholder='Enter Password' />
                <label className='form-label form-element' htmlFor="password-confirm">Confirm Password</label>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  
                    className='form-input form-element' id='password-confirm' type='password' placeholder='Confirm Password' />
                <button className='form-submit-btn' id='register-btn' type='submit'>Sign Up</button>
                <p className='form-route-txt'>Already have an account ? <Link to='/login' className='form-route'>Sign in</Link></p>
                {error === '' ? <></> : <p className='form-error'>{error}</p>}
                {msg === '' ? <></> : <p className='form-msg'>{msg}</p>}
            </form>
        </div>
        </>
    )
}

export default Register;