import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login({history}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    async function submitForm(e){
        e.preventDefault();
        const newUser = { email, password };
        try {
            const {data} = await axios.post(`/api/auth/login`, newUser)
            setMsg('Logged in successfully. Redirecting to private page...');
            localStorage.setItem("authToken", data.token)
            setTimeout(() => history.push('/'), 1000);
        } catch (error) {
            if(/^User/.test(error.response.data.error)){
                setEmail('');
                setPassword('');
            }else{
                setPassword('');
            }
            setTimeout(() => setError(''), 2500);
            setError(error.response.data.error);
        }
    }

    return (
        <div className='form-div'>
            <h2 className='form-title' id='login-title'>Log In</h2>
            <form className='form' id='login-form' onSubmit={submitForm}>
                <label className='form-label form-element' htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} 
                    className='form-input form-element' id='email' type='email' placeholder='Enter Email' />
                <label className='form-label form-element' htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} minLength='6'
                    className='form-input form-element' id='password' type='password' placeholder='Enter Password' />
                <button className='form-submit-btn' id='login-btn' type='submit'>Log In</button>
                <p className='form-route-txt'>Don't have an account ? <Link to='/register' className='form-route'>Sign Up</Link></p>
                <p className='form-route-txt' id='forgot-pass-route'><Link to='/forgotPassword' className='form-route'>Forgot Password ? </Link></p>
                {error === '' ? <></> : <p className='form-error'>{error}</p>}
                {msg === '' ? <></> : <p className='form-msg'>{msg}</p>}
            </form>
        </div>
    )
}

export default Login;