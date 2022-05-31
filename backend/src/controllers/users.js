const pool = require('../database');
const { generateAccessToken } = require('../helpers/jwt');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Bad credentials",
            });
        }
        
        const user = result.rows[0];
        delete user.password;

        const accessToken = generateAccessToken(user);
        res.header('authorization', accessToken).json({
            message: 'Welcome!',
            token: accessToken
        })
    } catch (error) {
        next(error);
    }
}

const home = async (req, res) => {
    res.json('Hello World!');
}

module.exports = {
    login,
    home
}