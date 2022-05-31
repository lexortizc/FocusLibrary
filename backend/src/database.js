const { Pool } = require('pg');
const { config } = require('dotenv');
config();

const db = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
};

const pool = new Pool(db)

module.exports = pool;