module.exports = (io) => io.on('connection', (socket) => {
    socket.on('join', (user, callback) => {
        console.log(`${user.username} Joined the chat`);
        socket.emit('message', { user: 'BOT', text: `🙋 Hello ${user.username}. Welcome to the room !`});
        socket.to('chatio').emit('message', { user: 'BOT', text: `${user.username} has joined the chat 😜`});
        socket.join('chatio');
    })
    socket.on('sendMessage', (message, callback) => {
        io.to('chatio').emit('message', { user: message.user, text: message.text});
    })
    socket.on('disconnect-from-server', (user) => {
        console.log(`${user.username} has left the chat`);
        socket.to('chatio').emit('message', { user: 'BOT', text: `${user.username} has left 😵`});
    })
})