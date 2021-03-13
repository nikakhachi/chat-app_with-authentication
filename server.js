const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: "./config.env"})
const app = express();

app.use(express.json());

mongoose.connect(
    process.env.MONGO_URI, 
    {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true}, 
    () => console.log('MongoDB Connected')
);

app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/private', require('./routes/api/private'));


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`))