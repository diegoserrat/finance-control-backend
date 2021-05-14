const { Router } = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.get('/users', authMiddleware, UserController.getAll);
router.get('/users/:id', authMiddleware,  UserController.getById);
router.post('/users', authMiddleware, UserController.create);
router.put('/users/:id', authMiddleware,  UserController.update);
router.delete('/users/:id', authMiddleware, UserController.delete);

module.exports = router;