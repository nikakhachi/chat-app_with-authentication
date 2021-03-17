const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

module.exports = Chat = mongoose.model('chat', ChatSchema);