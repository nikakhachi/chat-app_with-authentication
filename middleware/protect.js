const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next){
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) return res.status(401).json({error: 'Unauthorized. Invalid token. Log in to access the page'});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foundUser = User.findById(decoded.id);
        if(!foundUser) return res.status(404).json({error: 'Unauthorized. Invalid token. Log in to access the page'});
        req.user = foundUser;
        next();
    } catch (error) {
        return res.status(401).json({error: 'Unauthorized. Invalid token. Log in to access the page'});
    }
}

module.exports = protect;