import { useState } from 'react';
import axios from 'axios';
import { Link, useParams, useHistory } from 'react-router-dom';
import SourceCode from '../../components/source_code/sourceCode';

function ResetPass(){

    const history = useHistory();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    const token = useParams().resetToken;

    async function submitForm(e){
        e.preventDefault();
        if(password !== confirmPassword){
            setTimeout(() => setError(''), 2500);
            setPassword('');
            setConfirmPassword('');
            return setError('Passwords do not match');
        }
        try {
            await axios.put(`/api/auth/resetPassword/${token}`, {password});
            setMsg('Password changed successfully. Redirecting to Log in Page..')
            setTimeout(() => history.push('/login'), 1000);
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    return (
        <>
        <SourceCode />
        <div className='form-div'>
            <h2 className='form-title' id='resetPass-title'>Reset Password</h2>
            <form className='form' id='resetPass-form' onSubmit={submitForm}>
                <label className='form-label form-element' htmlFor="password">New Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} minLength='6'
                    className='form-input form-element' id='password' type='password' placeholder='Enter Password' />
                <label className='form-label form-element' htmlFor="password-confirm">Confirm Password</label>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  
                    className='form-input form-element' id='password-confirm' type='password' placeholder='Confirm Password' />
                <button className='form-submit-btn' id='resetPass-btn' type='submit'>Reset Password</button>
                <p className='form-route-txt'>Back to <Link to='/login' className='form-route'>Log in</Link> Page</p>
                {error === '' ? <></> : <p className='form-error'>{error}</p>}
                {msg === '' ? <></> : <p className='form-msg'>{msg}</p>}
            </form>
        </div>
        </>
    )
}

export default ResetPass;