const express = require('express');
const router = express.Router();
const controller = require('../controllers/facility.controller');
const auth = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/',auth,roleMiddleware, controller.createFacility); 
router.get('/', controller.getFacilities);
router.get('/:id', controller.getFacilityById);
router.put('/:id',auth,roleMiddleware, controller.updateFacility);
router.delete('/:id',auth,roleMiddleware, controller.deleteFacility);

module.exports = router;
