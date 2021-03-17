const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Chat = require('../../../models/Chat');

router.get('/', async (req,res) => {   
    try {
        const chat = await Chat.find({}).sort('-date').select('-_id').select('-__v');
        res.status(200).json(chat)
    } catch (error) {
        
    }
})

router.post('/', async (req, res) => {
    const { text, user, time } = req.body;
    if( !text || !user || !time ) return res.status(400).json({error: 'Some data is missing'})
    const newChat = new Chat({text, user, time});
    try {
        await newChat.save();
        res.status(200).json({msg: "Saved to database"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.delete('/all', async (req, res) => {
    try {
        await Chat.deleteMany({});
        res.status(200).json({msg: "Chat cleared"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;