const { Router } = require('express');
const DebitTypeController = require('../controllers/DebitTypeController');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.get('/debitsType', authMiddleware, DebitTypeController.getAll);
router.get('/debitsType/:id', authMiddleware, DebitTypeController.getById);
router.post('/debitsType', authMiddleware, DebitTypeController.create);
router.put('/debitsType/:id', authMiddleware, DebitTypeController.update);
router.delete('/debitsType/:id', authMiddleware, DebitTypeController.delete);

module.exports = router;