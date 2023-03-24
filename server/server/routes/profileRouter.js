const express = require('express')
const router = express.Router()
const placeController =   require('../controllers/placeController');

router.get('/:id/places', placeController.findByUserId);

module.exports = router