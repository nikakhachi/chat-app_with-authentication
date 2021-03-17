import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import './chatbox.css'
import ReactEmoji from 'react-emoji';
import axios from 'axios';
import ReactScrollableFeed from 'react-scrollable-feed';
import { setMessages, setOnlineUsers } from '../../../../redux/online/actions';

let socket;

function Chatbox(){

    const user = useSelector(state => state.auth_data.user);

    const [message, setMessage] = useState('');

    const messages = useSelector(state => state.online.messages);
    const onlineUsers = useSelector(state => state.online.online_users)

    const dispatch = useDispatch();

    // Connection to Socket.io
    useEffect(() => {
        socket = io.connect('/', {query:`user=${user.username}&room=general`});
        socket.emit('join', { user, room: 'general'}, () => {
        });
        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [user]);

    // Get Chat Data from DataBase and Online Users
    useEffect(() => {
        socket.on('loadChat', data => {
            dispatch(setMessages(data));
        })
        return () => socket.off('loadChat');
    }, [onlineUsers, messages, dispatch]);

    // Update Chat for Every Text
    useEffect(() => {
        socket.on('message', (message) => {
            const date = new Date(Date.now()).toString().split(' ');
            let timestamp = `${date[2]} ${date[1]}, ${date[4].slice(0,5)}`;
            dispatch(setMessages([...messages, {...message, time: timestamp}]));
        })
        socket.on("roomData", users => {
            dispatch(setOnlineUsers(users));
          });
        return () => {
            socket.off('roomData');
            socket.off('message')};
    }, [messages, dispatch]);

    // Send Message or Clear Chat
    const sendMessage = e => {
        e.preventDefault();
        if(message === '/clear' && user.email === 'o.sicknick@gmail.com'){
            axios.delete('/api/private/chat/all');
            setMessage('');
            return dispatch(setMessages([]));
        }
        if(message){
            socket.emit('sendMessage', {message:{text: message, user: user.username}, room: 'general'}, () => setMessage(''));
            const date = new Date(Date.now()).toString().split(' ');
            let timestamp = `${date[2]} ${date[1]}, ${date[4].slice(0,5)}`;
            axios.post('/api/private/chat', {text: message, user: user.username, time: timestamp})
        }
        setMessage('');
    }

    return(
        <div id='chatbox-container'>
            <div id='chatbox-chat-container'>
            <ReactScrollableFeed>
                {messages.map((item, index) => {
                    if(item.user === user.username){
                        return <p className='chatbox-chat-line chatbox-chat-line-right' key={index}><span className='text-time'>{item.time}</span> <span className='text-author'><strong>you</strong></span> : {ReactEmoji.emojify(item.text)}</p>
                    }
                    if(item.user === 'BOT'){
                        return  <p className='chatbox-chat-line chatbox-chat-line-bot' key={index}><span className='text-time'>{item.time}</span> <span className='text-author'><strong>{item.user}</strong></span> : {ReactEmoji.emojify(item.text)}</p>
                    }
                    return <p className='chatbox-chat-line chatbox-chat-line-left' key={index}><span className='text-time'>{item.time}</span> <span className='text-author'><strong>{item.user}</strong></span> : {ReactEmoji.emojify(item.text)}</p>
                })}
            </ReactScrollableFeed>
            </div>
            <div id='chatbox-input-container'>
                <input value={message} onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} onChange={(e) => setMessage(e.target.value)} type='text' placeholder='Send Message' />
                <button onClick={sendMessage}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
            </div>        
        </div>
    )
}

export default Chatbox;