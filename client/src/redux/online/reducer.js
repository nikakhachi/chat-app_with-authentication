import { SET_MESSAGES, ONLINE_USERS } from './types';

const initialState = {
    messages: [],
    online_users: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_MESSAGES:
            return {...state, messages: action.payload}
        case ONLINE_USERS:
            return {...state, online_users: action.payload};
        default: return state
    }
}

export default reducer;