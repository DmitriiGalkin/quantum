const express = require('express')
const router = express.Router()
const uniqueController =   require('../controllers/uniqueController');

router.put('/:id', uniqueController.update);


module.exports = router