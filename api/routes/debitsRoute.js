const { Router } = require('express');
const DebitController = require('../controllers/DebitController');

const router = Router();

router.get('/debits', DebitController.getAll);
router.get('/debits/:id', DebitController.getById);
router.get('/debitsOnCreditCard/:id', DebitController.getByIdCreditCard);
router.post('/debits', DebitController.create);
router.put('/debits/:id', DebitController.update);
router.delete('/debits/:id', DebitController.delete);

module.exports = router;