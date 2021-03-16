import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import './chatbox.css'
import ReactEmoji from 'react-emoji';

let socket;

function Chatbox(){

    const data = useSelector(state => state.data);

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const ENDPOINT = `/`;

    useEffect(() => {
        const connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };
        socket = io(ENDPOINT, connectionOptions);
        socket.emit('join', data.user, () => {
        });
        return () => {
            socket.emit('disconnect-from-server', data.user)
            socket.off();
        }
    }, [ENDPOINT, data]);

    useEffect(() => {
        
        socket.on('message', (message) => {
            const date = new Date(Date.now()).toString().split(' ');
            let timestamp = `${date[2]},${date[1]} ${date[4].slice(0,5)}`;
            setMessages([...messages, {...message, time: timestamp}]);
        })
    }, [messages]);

    const sendMessage = e => {
        e.preventDefault();
        if(message){
            socket.emit('sendMessage', {text: message, user: data.user.username}, () => setMessage(''))
            setMessage('');
        }
    }

    return(
        <div id='chatbox-container'>
            <div id='chatbox-chat-container'>
                {messages.map((item, index) => {
                    if(item.user === data.user.username){
                        return <p className='chatbox-chat-line chatbox-chat-line-right' key={index}><span className='text-time'>{item.time}</span> <span className='text-author'><strong>{item.user}</strong></span> : {ReactEmoji.emojify(item.text)}</p>
                    }
                    if(item.user === 'BOT'){
                        return  <p className='chatbox-chat-line chatbox-chat-line-bot' key={index}><span className='text-time'>{item.time}</span> <span className='text-author'><strong>{item.user}</strong></span> : {ReactEmoji.emojify(item.text)}</p>
                    }
                    return <p className='chatbox-chat-line chatbox-chat-line-left' key={index}><span className='text-time'>{item.time}</span> <span className='text-author'><strong>{item.user}</strong></span> : {ReactEmoji.emojify(item.text)}</p>
                })}
            </div>
            <div id='chatbox-input-container'>
                <input value={message} onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} onChange={(e) => setMessage(e.target.value)} type='text' placeholder='Send Message' />
                <button onClick={sendMessage}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
            </div>        
        </div>
    )
}

export default Chatbox;