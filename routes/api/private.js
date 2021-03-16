const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User');

router.get('/', require('../../middleware/protect'), async (req, res) => {
    try {
        const userData = await User.find({}).select('-email').select('-_id').select('-__v')
        res.json({users: userData, user: req.user})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
})

module.exports = router;