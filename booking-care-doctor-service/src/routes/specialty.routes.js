const express = require('express');
const router = express.Router();
const controller = require('../controllers/specialty.controller');

router.post('/', controller.createSpecialty);
router.get('/', controller.getSpecialties);
router.get('/:id', controller.getSpecialtyById);
router.put('/:id', controller.updateSpecialty);
router.delete('/:id', controller.deleteSpecialty);

module.exports = router;
