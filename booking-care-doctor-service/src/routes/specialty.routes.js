const express = require('express');
const router = express.Router();
const controller = require('../controllers/specialty.controller');
const auth = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/',auth, roleMiddleware,controller.createSpecialty);
router.get('/', controller.getSpecialties);
router.get('/:id', controller.getSpecialtyById);
router.put('/:id',auth,roleMiddleware,controller.updateSpecialty);
router.delete('/:id',auth,roleMiddleware,controller.deleteSpecialty);

module.exports = router;
