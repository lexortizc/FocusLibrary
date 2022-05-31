const pool = require('../database');

const getAllBooks = async (req, res, next) => {
    const { filter, word } = req.body;
    try {
        const result = await pool.query(`SELECT * FROM books WHERE ${filter} LIKE '%${word}%'`);
        const allBooks = result.rows;
        res.json(allBooks);
    } catch (error) {
        next(error);
    }
}

const getBook = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        const book = result.rows[0];
        res.json(book);
    } catch (error) {
        next(error);
    }
}

const createBook = async (req, res, next) => {
    const { title, author, published_year, genre, copies, stock } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO books(title, author, published_year, genre, copies, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, author, published_year, genre, copies, stock]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

module.exports = {
    getAllBooks,
    getBook,
    createBook
}