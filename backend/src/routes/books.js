const { Router } = require('express');
const { getAllBooks, getBook, createBook } = require('../controllers/books');
const { validateToken } = require('../helpers/jwt');

const router = Router();

router.get('/books', validateToken, getAllBooks);
router.get('/books/:id', validateToken, getBook);
router.post('/books', validateToken, createBook);

module.exports = router;