const { Router } = require('express');
const { login, signup } = require('../controllers/users');
const { validateToken } = require('../helpers/jwt');

const router = Router();

router.post('/users/login', login);
router.post('/users/signup', validateToken, signup);

module.exports = router;