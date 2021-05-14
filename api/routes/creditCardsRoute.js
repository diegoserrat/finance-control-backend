const { Router } = require('express');
const CreditCardController = require('../controllers/CreditCardController');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.get('/creditCards', authMiddleware, CreditCardController.getAll);
router.get('/creditCards/:id', authMiddleware, CreditCardController.getById);
router.post('/creditCards', authMiddleware, CreditCardController.create);
router.put('/creditCards/:id', authMiddleware, CreditCardController.update);
router.delete('/creditCards/:id', authMiddleware, CreditCardController.delete);

module.exports = router;