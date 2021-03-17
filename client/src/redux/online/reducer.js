import { SET_MESSAGES, ONLINE_USERS, SET_TYPING, REMOVE_TYPING } from './types';

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
        case SET_TYPING:
        case REMOVE_TYPING:
            return {...state, online_users: action.payload};
        default: return state
    }
}

export default reducer;