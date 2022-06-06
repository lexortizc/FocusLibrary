const pool = require('../database');
const { generateAccessToken } = require('../helpers/jwt');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Bad credentials",
            });
        }

        const user = result.rows[0];
        delete user.password;

        const accessToken = generateAccessToken(user);
        res.status(200).header('authorization', accessToken).json({
            message: `Welcome ${user.first_name} ${user.last_name}`,
            token: accessToken
        })
    } catch (error) {
        next(error);
    }
}

const signup = async (req, res) => {
    const { first_name, last_name, email, password, role_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users(first_name, last_name, email, password, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [first_name, last_name, email, password, role_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    signup
}