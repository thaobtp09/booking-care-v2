const express = require('express');
const router = express.Router();
const controller = require('../controllers/facility.controller');
router.post('/', controller.createFacility); 
router.get('/', controller.getFacilities);
router.get('/:id', controller.getFacilityById);
router.put('/:id', controller.updateFacility);
router.delete('/:id', controller.deleteFacility);

module.exports = router;
