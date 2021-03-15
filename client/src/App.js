import './App.css';
import './components/auth_form/form.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/private_route/PrivateRoute'; 
import PrivateScreen from './components/private_route/private/PrivateScreen';
import Register from './components/auth_form/register';
import Login from './components/auth_form/login';
import ForgotPass from './components/auth_form/forgotPass';
import ResetPass from './components/auth_form/resetPass';

function App() {
  return (
    <Router>
        <Switch>
          <PrivateRoute exact path='/' component={PrivateScreen}/>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/forgotPassword' component={ForgotPass} />
          <Route exact path='/resetPassword/:resetToken' component={ResetPass} />
        </Switch>
    </Router>
  );
}

export default App;
