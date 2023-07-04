const express = require('express')
const router = express.Router()
const User = require('./models/userModel');

const userController =   require('./controllers/userController');
const meetController =   require('./controllers/meetController');
const imageController =   require('./controllers/imageController');

/**
 * Подхватываем токен и авторизуем пользователя
 */
function useUser(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    User.findByToken(token, function(err, user) {
        if (!user || user === null) {
            res.sendStatus(401)
        } else {
            req.user = user
            next()
        }
    });
}

/**
 * Картинки
 */
router.post('/image', imageController.upload);

/**
 * Участники
 */
router.get('/user', useUser, userController.findByUser);
router.post('/user/login', userController.islogin);
router.post('/logi', userController.logi);
router.get('/user/:id', userController.findById);
router.put('/user', useUser, userController.update);

router.put('/userMeet/:meetId', useUser, meetController.toggleUserMeet );

/**
 * Встречи
 */
router.get('/meets', useUser, meetController.findByUser);
router.get('/meet/:id', useUser, meetController.findById);
router.post('/meet', useUser, meetController.create);
router.put('/meet/:id', meetController.update);
router.delete('/meet/:id', useUser, meetController.delete );

module.exports = router
