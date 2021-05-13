const { Router } = require('express');
const DebitTypeController = require('../controllers/DebitTypeController');

const router = Router();

router.get('/debitsType', DebitTypeController.getAll);
router.get('/debitsType/:id', DebitTypeController.getById);
router.post('/debitsType', DebitTypeController.create);
router.put('/debitsType/:id', DebitTypeController.update);
router.delete('/debitsType/:id', DebitTypeController.delete);

module.exports = router;