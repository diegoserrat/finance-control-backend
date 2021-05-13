const { Router } = require('express');
const CreditCardController = require('../controllers/CreditCardController');

const router = Router();

router.get('/creditCards', CreditCardController.getAll);
router.get('/creditCards/:id', CreditCardController.getById);
router.post('/creditCards', CreditCardController.create);
router.put('/creditCards/:id', CreditCardController.update);
router.delete('/creditCards/:id', CreditCardController.delete);

module.exports = router;