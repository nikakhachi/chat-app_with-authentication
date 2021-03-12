import './App.css';
import './components/screens/form/form.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute'; 
import PrivateScreen from './components/screens/private/PrivateScreen';
import Register from './components/screens/form/register';
import Login from './components/screens/form/login';
import ForgotPass from './components/screens/form/forgotPass';
import ResetPass from './components/screens/form/resetPass';

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
