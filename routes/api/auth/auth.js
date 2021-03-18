const express = require('express');
const router = express.Router();
const sendMail = require('../../../services/mailing');
const crypto = require('crypto');

const User = require('../../../models/User');

function addCookie(res, token){
    res.cookie('jwt', token, {
        secure: true,
        httpOnly: true
    })
}

router.post('/register', async (req,res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) return res.status(400).json({error: 'Please fill all fields'})
    try {
        const foundUser = await User.findOne({email});
        if(foundUser) return res.status(400).json({error: 'The email is already in use'})
        const foundUserbyName = await User.findOne({username});
        if(foundUserbyName) return res.status(400).json({error: 'Username is taken'})
        const modifiedUsername = username.trim().toLowerCase();
        const user = new User({username: modifiedUsername, email, password})
        const savedUser = await user.save();
        const token = await savedUser.generateToken();
        addCookie(res, token);
        res.status(201).json({
            msg: 'User saved successfully',
            token,
            user: {
                username: savedUser.username,
                email: savedUser.email,
                register_date: savedUser.register_date
            }
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

router.post('/login', async (req,res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({error: 'Please fill all fields'});
    try {
        const foundUser = await User.findOne({email}).select('+password');
        if(!foundUser) return res.status(404).json({error: 'User doesn\'t exist'});
        const isMatch = await foundUser.comparePasswords(password);
        if(!isMatch) return res.status(400).json({error: 'Invalid Credentials'});
        const token = await foundUser.generateToken();
        addCookie(res, token);
        res.status(200).json({
            msg: 'Logged in Successfully',
            token,
            user: {
                username: foundUser.username,
                email: foundUser.email,
                register_date: foundUser.register_date
            }
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error: error.message})
    }
});

router.post('/forgotPassword', async (req,res) => {
    const { email } = req.body;
    if(!email) return res.status(400).json({error: 'Please fill all fields'});
    try {
        const foundUser = await User.findOne({email});
        if(!foundUser) return res.status(404).json({error: 'Invalid Email'});
        const resetToken = await foundUser.generateResetToken();
        await foundUser.save();
        const resetURL = `https://chatapp-authentication-bynick.herokuapp.com/resetPassword/${resetToken}`
        const message = `
        <p>You have requested password reset<p>
        <p>Go to the following link to reset you password</p>
        <a href=${resetURL} clicktracking=off>${resetURL}</a>
        `
        await sendMail(email, message);
        res.json({ msg: 'Mail Sent'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

router.put('/resetPassword/:resetToken', async (req,res) => {
    const resetToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    try {
        const foundUser = await User.findOne({
            resetToken,
            resetExpire: { $gt: Date.now()}
        })
        if(!foundUser) return res.status(400).json({error: 'Invalid Reset Token'});
        if(!req.body.password) return res.status(400).json({error: 'Please fill all fields'});
        foundUser.password = req.body.password;
        foundUser.resetToken = undefined;
        foundUser.resetExpire = undefined;
        await foundUser.save();
        res.json({ msg: 'Password reset successfull'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

router.post('/logout', (req, res) => {
    res.cookie('jwt', 'expiredtoken', {
        expires: new Date(Date.now() + 10000),
        secure: true,
        httpOnly: true
    });
    res.status(200).json({msg: "Logged out successfuly"})
})

module.exports = router;