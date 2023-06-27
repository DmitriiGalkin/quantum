const express = require('express')
const router = express.Router()
const User = require('./models/userModel');

const userController =   require('./controllers/userController');
const projectController =   require('./controllers/projectController');
const meetController =   require('./controllers/meetController');
const placeController =   require('./controllers/placeController');
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

router.put('/userProject/:projectId', useUser, projectController.toggleUserProject );
router.put('/userMeet/:meetId', useUser, meetController.toggleUserMeet );

/**
 * Проекты
 */
router.get('/projects', useUser, projectController.findByUser);
router.get('/project/:id', useUser, projectController.findById);
router.post('/project', useUser, projectController.create);
router.put('/project/:id', projectController.update);

/**
 * Места
 */
router.get('/places', placeController.findAll);
router.get('/place/:id', useUser, placeController.findById);
router.post('/place', placeController.create);

/**
 * Встречи
 */
router.get('/meets', useUser, meetController.findByUser);
router.get('/meet/:id', useUser, meetController.findById);
router.post('/meet', useUser, meetController.create);
router.put('/meet/:id', meetController.update);
router.delete('/meet/:id', useUser, meetController.delete );

module.exports = router
