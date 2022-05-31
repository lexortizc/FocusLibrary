const jwt = require('jsonwebtoken');
require('dotenv').config;

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '60m'})
}

const validateToken = (req, res, next) => {
    const accessToken = req.headers['authorization'];
    if(!accessToken) return res.send("Access denied!");

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            res.send('Access denied, token expired or incorrect')
        } else {
            req.user = user;
            next();
        }
    });
}

module.exports = {
    generateAccessToken,
    validateToken
}