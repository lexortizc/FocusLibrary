const { Router } = require('express');
const { getAllRequests, getAllRequestsByUser, requestBook, returnBook } = require('../controllers/requests');
const { validateToken } = require('../helpers/jwt');


const router = Router();

router.get('/requests', validateToken, getAllRequests);
router.get('/requests/:id', validateToken, getAllRequestsByUser);
router.post('/requests/:id', validateToken, requestBook);
router.post('/returns/:id', validateToken, returnBook);

module.exports = router;