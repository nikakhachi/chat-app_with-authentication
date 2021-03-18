const express = require('express');
const router = express.Router();
const User = require('../../../models/User');

router.get('/', async (req, res) => {
    try {
        const userData = await User.find({}).select('-email').select('-_id').select('-__v')
        res.json({users: userData, user: req.user})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
})

router.use('/chat', require('./chat'));
router.use('/user', require('./user'));

module.exports = router;