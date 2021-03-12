import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({component: Component, ...rest}){
    return <Route exact path='/' render={() => 
    localStorage.getItem('authToken')
    ? <Component {...rest}/>
    : <Redirect to='/login' />} />
}

export default PrivateRoute;