const express = require('express')
const router = express.Router()
const placeController =   require('../controllers/placeController');
const projectController =   require('../controllers/projectController');
const userController =   require('../controllers/userController');

router.get('/', placeController.findAll);
router.get('/:id', placeController.findById);
router.post('/', placeController.create);


router.get('/:id/user', userController.findByPlaceId); // Участники пространства
router.get('/:id/project', projectController.findByPlaceId);

router.post('/:placeId/user/:userId', placeController.createPlaceUser );
router.delete('/:placeId/user/:userId', placeController.deletePlaceUser );

module.exports = router