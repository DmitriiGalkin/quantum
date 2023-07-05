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
    if (token == null) {
        req.user = null
        next()
    } else {
        User.findByToken(token, function(err, user) {
            if (user) {
                req.user = user
                next()
            } else {
                req.user = null
                next()
            }
        });
    }
}

/**
 * Встречи
 */
router.get('/meets', useUser, meetController.findAll);
router.get('/meet/:id', useUser, meetController.findById);
router.post('/meet', useUser, meetController.create);
router.put('/meet/:id', meetController.update);
router.delete('/meet/:id', useUser, meetController.delete );

/**
 * Картинки
 */
router.post('/image', imageController.upload);

/**
 * Авториазция
 */
router.post('/user/login', userController.login);
router.post('/user/googleLogin', userController.googleLogin);

/**
 * Участники
 */
router.get('/user', useUser, function(req, res) { res.send(req.user) });
router.put('/user', useUser, userController.update);

router.put('/userMeet/:meetId', useUser, meetController.toggleUserMeet );


module.exports = router
