import { SET_MESSAGES, ONLINE_USERS, SET_TYPING, REMOVE_TYPING } from './types';
import store from '../store';

export function setMessages(data){
    return {
        type: SET_MESSAGES,
        payload: data
    }
}

export function setOnlineUsers(data){
    return {
        type: ONLINE_USERS,
        payload: data
    }
}

export function setTyping(data){
    let newArray = [...store.getState().online.online_users].map(item => {
        if(item.username === data){
            item.typing = true;
            return item;
        };
        return item
    })
    return {
        type: SET_TYPING,
        payload: newArray
    }
}

export function removeTyping(data){
    let newArray = [...store.getState().online.online_users].map(item => {
        if(item.username === data){
            item.typing = false;
            return item;
        };
        return item
    })
    return {
        type: REMOVE_TYPING,
        payload: newArray
    }
}