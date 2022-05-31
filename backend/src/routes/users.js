const { Router } = require('express');
const { login, signup } = require('../controllers/users');
const { validateToken } = require('../helpers/jwt');

const router = Router();

router.get('/users/login', login);
router.get('/users/signup', validateToken, signup);

module.exports = router;