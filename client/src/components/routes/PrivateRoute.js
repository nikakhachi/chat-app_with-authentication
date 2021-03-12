import { Route, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './loader.css';

function PrivateRoute({component: Component, ...rest}){

    const [loading, setLoading] = useState(true);
    const [validToken, setValidToken] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function authorize(){
            let token = localStorage.getItem("authToken");
            if(!token) return setLoading(false);
            try {
                const {data} = await axios.get('/api/private', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setValidToken(true);
                setData(data.users);
                setLoading(false);
            } catch (error) {
                setValidToken(false);
                setLoading(false);
            }
        }
        authorize();
    }, []);

    return <Route exact path='/' render={() => 
    loading
    ? <div className='loader'></div>
    : validToken ? <div className='loader'></div>
    : <Redirect to='/login' />} />
}

export default PrivateRoute;