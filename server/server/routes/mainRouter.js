const express = require('express')
const router = express.Router()
const mainController =   require('../controllers/mainController');

router.get('/meet', mainController.getMeets); // Встречи пользователя
router.get('/project', mainController.getProjects); // Выгрузить все по пользователю

module.exports = router