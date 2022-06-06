const pool = require('../database');

const getAllRequests = async (req, res, next) => {
    try {
        const result = await pool.query(
            'SELECT r.id, r.request_date, r.user_id, u.first_name, u.last_name, r.book_id, b.title, b.author, b.published_year, b.genre, b.copies, b.stock  FROM requests as r INNER JOIN books as b ON r.book_id = b.id INNER JOIN users as u ON r.user_id = u.id'
        );
        const allRequests = result.rows;
        res.status(200).json(allRequests);
    } catch (error) {
        next(error);
    }
}

const getAllRequestsByUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT r.id, r.request_date, r.user_id, u.first_name, u.last_name, r.book_id, b.title, b.author, b.published_year, b.genre, b.copies, b.stock  FROM requests as r INNER JOIN books as b ON r.book_id = b.id INNER JOIN users as u ON r.user_id = u.id WHERE r.user_id = $1',
            [id]
        );
        const allRequests = result.rows;
        res.status(200).json(allRequests);
    } catch (error) {
        next(error);
    }
}

const requestBook = async (req, res, next) => {
    const { id } = req.params;
    const { userID } = req.body;
    try {
        const result = await pool.query(
            'UPDATE books SET stock = ((SELECT stock FROM books WHERE id = $1) - 1) WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "Error requesting the book",
            });
        }

        const request = await pool.query(
            'INSERT INTO requests(user_id, book_id, request_date) VALUES ($1, $2, current_timestamp) RETURNING *',
            [userID, id]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "Error creating request",
            });
        }

        res.status(201).json(request.rows[0]);
    } catch (error) {
        next(error);
    }
}

const returnBook = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM requests WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "Error returning the book",
            });
        }

        const bookID = result.rows[0].book_id;
        const request = await pool.query(
            'UPDATE books SET stock = ((SELECT stock FROM books WHERE id = $1) + 1) WHERE id = $1 RETURNING *',
            [bookID]
        );

        if (request.rows.length === 0) {
            return res.status(400).json({
                message: "Error creating return",
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllRequests,
    getAllRequestsByUser,
    requestBook,
    returnBook
}