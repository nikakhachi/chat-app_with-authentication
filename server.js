const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: "./config.env"})
const app = express();

app.use(express.json());

mongoose.connect(
    process.env.MONGO_URI, 
    {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true}, 
    () => console.log('MongoDB Connected')
);

app.use('/api/auth', require('./routes/api/auth/auth'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`))