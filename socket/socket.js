const Chat = require('../models/Chat');

let onlineUsers = [];

module.exports = (io) => io.on('connection', (socket) => {
    socket.on('join', async ({user, room}, callback) => {
        onlineUsers.push(user);
        const chat = await Chat.find({}).sort('-date').select('-_id').select('-__v');
        socket.emit('loadChat', chat);
        io.emit('roomData', onlineUsers )
        socket.emit('message', { user: 'BOT', text: `🙋 Hello ${user.username}. Welcome to the room !`});
        socket.to(room).emit('message', { user: 'BOT', text: `${user.username} has joined the chat 😜`});
        socket.join(room);
    })
    socket.on('sendMessage', ({message, room}, callback) => {
        io.to(room).emit('message', { user: message.user, text: message.text});
    });
    socket.on('disconnect', () => {
        const user = socket.handshake.query.user;
        const room = socket.handshake.query.room;
        const usersLeft = onlineUsers.filter(item => item.username !== user);
        onlineUsers = usersLeft;
        io.emit('roomData', onlineUsers);
        socket.to(room).emit('message', { user: 'BOT', text: `${user} has left 😵`});
    }); 
})