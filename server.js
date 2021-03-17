const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
require('dotenv').config({ path: "./config.env"})
const app = express();
const cookieParser = require('cookie-parser')
const socketio = require('socket.io');
const socket = require('./socket/socket');

app.use(express.json());
app.use(cookieParser())
const server = http.createServer(app)
const io = socketio(server);

socket(io);

mongoose.connect(
    process.env.MONGO_URI, 
    {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true}, 
    () => console.log('MongoDB Connected')
);

app.use('/api/auth', require('./routes/api/auth/auth'))
app.use('/api/private' , require('./middleware/protect') ,require('./routes/api/private/private'));


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`))