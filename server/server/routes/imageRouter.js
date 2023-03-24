const express = require('express')
const router = express.Router()
const imageController =   require('../controllers/imageController');

router.post('/uploadfile', imageController.getImages); // Встречи пользователя

module.exports = router