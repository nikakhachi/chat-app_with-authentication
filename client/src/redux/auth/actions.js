import { AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL } from './types';

export const authenticate = data => {
    return {
        type: AUTHENTICATE_SUCCESS,
        payload: data
    }
}

export const authenticateFailure = () => {
    return {
        type: AUTHENTICATE_FAIL
    }
}