import authReducer from './auth/reducer';
import onlineReducer from './online/reducer';
import { createStore, compose, combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth_data: authReducer,
    online: onlineReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers());

export default store;