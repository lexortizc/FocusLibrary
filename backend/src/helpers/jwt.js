const jwt = require('jsonwebtoken');
require('dotenv').config;

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '60m'})
}

const validateToken = (req, res, next) => {
    const accessToken = req.headers['authorization'];
    if(!accessToken) {
        return res.status(401).json({
            message: "Access denied",
        });
    }

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            res.status(401).json({
                message: "Access denied",
            });
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