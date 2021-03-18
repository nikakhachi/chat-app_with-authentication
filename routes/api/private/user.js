const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../../../models/User');

router.post('/usernameChange', async (req,res) => {   
    const { username, password, _id } = req.body;
    if( !username || !password || !_id ) return res.status(400).json({error: 'Please fill all fields'});
    try {
        const modifiedUsername = username.trim().toLowerCase();
        const user = await User.findById(_id).select('+password');
        if(!user) return res.status(404).json({error: 'No user was found by this id'});
        const isMatch = await user.comparePasswords(password);
        if(!isMatch) return res.status(400).json({error: 'Incorrect Password'});
        if(modifiedUsername === user.username) return res.status(400).json({error: 'You are already using this username'});
        user.username = modifiedUsername;
        await user.save();
        res.status(200).json({msg: 'Username updated successfully'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: 'User deleted successfuly'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;