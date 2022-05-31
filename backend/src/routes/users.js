const { Router } = require('express');
const { login, home } = require('../controllers/users');
const { validateToken } = require('../helpers/jwt');

const router = Router();

router.get('/login', login);
router.get('/', validateToken, home);

module.exports = router;