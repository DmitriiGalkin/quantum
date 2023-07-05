const express = require('express')
const router = express.Router()

const userController =   require('./controllers/userController');
const meetController =   require('./controllers/meetController');
const imageController =   require('./controllers/imageController');

/**
 * Встречи
 */
router.get('/meets', userController.useUser, meetController.findAll);
router.get('/meet/:id', userController.useUser, meetController.findById);
router.post('/meet', userController.useUser, meetController.create);
router.put('/meet/:id', userController.useUser, meetController.update);
router.delete('/meet/:id', userController.useUser, meetController.delete );

/**
 * Картинки
 */
router.post('/image', imageController.upload);

/**
 * Авторизация
 */
router.post('/user/login', userController.login);
router.post('/user/googleLogin', userController.googleLogin);

/**
 * Участники
 */
router.get('/user', userController.useUser, function(req, res) { res.send(req.user) });
router.put('/user', userController.useUser, userController.update);

router.put('/userMeet/:meetId', userController.useUser, meetController.toggleUserMeet );


module.exports = router
