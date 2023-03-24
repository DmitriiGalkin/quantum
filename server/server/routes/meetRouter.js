const express = require('express')
const router = express.Router()
const meetController =   require('../controllers/meetController');
const userController =   require('../controllers/userController');

router.get('/', meetController.findAll); // Встречи
router.get('/:id', meetController.findById); // Встреча
router.get('/:id/user', userController.findByMeetId); // Участники встречи

router.post('/', meetController.create); // Создание встречи

router.post('/:meetId/user/:userId', meetController.createMeetUser ); // Добавление участника
router.delete('/:meetId/user/:userId', meetController.deleteMeetUser ); // Удаление участника

module.exports = router