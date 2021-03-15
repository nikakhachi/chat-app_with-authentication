import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ForgotPass(){

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [mailSent, setMailSent] = useState(false);

    async function submitForm(e){
        e.preventDefault();
        if(mailSent){
            return null;
        }
        try {
            await axios.post(`/api/auth/forgotPassword`, {email});
            setMailSent(true);
            setMsg('Email Sent..');
        } catch (error) {
            setEmail('');
            setTimeout(() => setError(''), 2500);
            setError(error.response.data.error);
        }
    }

    return (
        <div className='form-div'>
            <h2 className='form-title' id='forgotPass-title'>Forgot Password ?</h2>
            <form className='form' id='forgotPass-form' onSubmit={submitForm}>
                <label className='form-label form-element' htmlFor="email">Email <span>(Link will be sent on the email)</span></label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} 
                    className='form-input form-element' id='email' type='email' placeholder='Enter Valid Email' />
                <button className='form-submit-btn' id='forgotPass-btn' type='submit'>Send Email</button>
                <p className='form-route-txt'>Back to <Link to='/login' className='form-route'>Log in</Link> Page</p>
                {error === '' ? <></> : <p className='form-error'>{error}</p>}
                {msg === '' ? <></> : <p className='form-msg'>{msg}</p>}
            </form>
        </div>
    )
}

export default ForgotPass;