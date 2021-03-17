import { AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL } from './types';

const initialState = {
    authenticated: false,
    user: [],
    users: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case AUTHENTICATE_SUCCESS:
            return {...state, authenticated: true, user: action.payload.user, users: action.payload.users};
        case AUTHENTICATE_FAIL:
            return {...state, authenticated: false, user: [], users: []};
        default : return state
    }
}

export default reducer;