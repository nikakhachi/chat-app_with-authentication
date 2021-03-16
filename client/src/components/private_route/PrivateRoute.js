import { Route, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './loader.css';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, authenticateFailure } from '../../redux/actions';

function PrivateRoute({component: Component, ...rest}){

    const [loading, setLoading] = useState(true);
    const authenticated = useSelector(state => state.authenticated);

    const dispatch = useDispatch();

    useEffect(() => {
        async function authorize(){
            try {
                let { data } = await axios.get('/api/private')
                dispatch(authenticate(data))
                setLoading(false);
            } catch (error) {
                dispatch(authenticateFailure());
                setLoading(false);
            }
        }
        authorize();
    }, [dispatch]);

    return <Route exact path='/' render={() => 
    loading
    ? <div className='loader'></div>
    : authenticated ? <Component {...rest}/>
    : <Redirect to='/login' />} />
}

export default PrivateRoute;