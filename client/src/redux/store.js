import authReducer from './auth/reducer';
import onlineReducer from './online/reducer';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth_data: authReducer,
    online: onlineReducer
})

const store = createStore(rootReducer);

export default store;