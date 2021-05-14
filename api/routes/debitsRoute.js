const { Router } = require('express');
const DebitController = require('../controllers/DebitController');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.get('/debits', authMiddleware, DebitController.getAll);
router.get('/debits/:id', authMiddleware, DebitController.getById);
router.get('/debitsOnCreditCard/:id', authMiddleware, DebitController.getByIdCreditCard);
router.post('/debits', authMiddleware, DebitController.create);
router.put('/debits/:id', authMiddleware, DebitController.update);
router.delete('/debits/:id', authMiddleware, DebitController.delete);

module.exports = router;