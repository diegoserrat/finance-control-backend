const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const router = Router();

router.post('/signin', AuthController.signIn);
router.post('/signup', AuthController.signUp);

module.exports = router;