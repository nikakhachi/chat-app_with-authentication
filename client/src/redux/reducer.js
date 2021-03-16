import { AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL } from './types';

const initialState = {
    authenticated: false,
    data: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case AUTHENTICATE_SUCCESS:
            return {...state, authenticated: true, data: action.payload};
        case AUTHENTICATE_FAIL:
            return {...state, authenticated: false, data: []}
        default : return state
    }
}

export default reducer;