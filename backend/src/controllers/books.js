const pool = require('../database');

const getAllBooks = async (req, res, next) => {
    const { filter, word } = req.query;
    try {
        let query = `SELECT * FROM books WHERE ${filter} LIKE '%${word}%'`
        if(filter === 'published_year') {
            query = `SELECT * FROM books WHERE ${filter} = ${(word === "") ? 0 : word}`
        }

        const result = await pool.query(query);
        const allBooks = result.rows;
        res.status(200).json(allBooks);
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
        res.status(200).json(book);
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
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllBooks,
    getBook,
    createBook
}