import { SET_MESSAGES, ONLINE_USERS } from './types';

export function setMessages(data){
    return {
        type: SET_MESSAGES,
        payload: data
    }
}

export function setOnlineUsers(data){
    console.log('adding user');
    console.log(data);
    return {
        type: ONLINE_USERS,
        payload: data
    }
}