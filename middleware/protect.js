const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next){
    let token;
    if(req.cookies) token = req.cookies.jwt;
    if(!token) return res.status(401).json({error: 'Unauthorized. Invalid token. Log in to access the page'});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foundUser = await User.findById(decoded.id).select('-email').select('-_id').select('-__v');
        if(!foundUser) return res.status(404).json({error: 'Unauthorized. Invalid token. Log in to access the page'});
        req.user = foundUser;
        next();
    } catch (error) {
        return res.status(401).json({error: 'Unauthorized. Invalid token. Log in to access the page'});
    }
}

module.exports = protect;