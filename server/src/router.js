const express = require('express')
const router = express.Router()
const User = require('./models/userModel');

const userController =   require('./controllers/userController');
const projectController =   require('./controllers/projectController');
const meetController =   require('./controllers/meetController');
const placeController =   require('./controllers/placeController');
const taskController =   require('./controllers/taskController');
const uniqueController =   require('./controllers/uniqueController');
const communityController =   require('./controllers/сommunityController');
const profileController =   require('./controllers/profileController');
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
 * Профиль пользователя
 */
router.get('/profile', useUser, profileController.findByUser);

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

router.post('/userProject/:projectId', useUser, projectController.createUserProject );
router.delete('/userProject/:projectId', useUser, projectController.deleteUserProject );
router.post('/userCommunity/:communityId', useUser, communityController.createUserCommunity );
router.delete('/userCommunity/:communityId', useUser, communityController.deleteUserCommunity );
router.put('/userMeet/:meetId', useUser, meetController.toggleUserMeet );

router.post('/userpoints', useUser, userController.userpoints);

/**
 * Проекты
 */
router.get('/projects', useUser, projectController.findByUser);
router.get('/project/:id', useUser, projectController.findById);
router.post('/project', useUser, projectController.create);
router.put('/project/:id', projectController.update);

router.get('/recommendation_projects', useUser, projectController.findRecommendationByUser);

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

/**
 * Задания
 */
router.get('/tasks', useUser, taskController.findByUser);
router.get('/task/:id', taskController.findById);
router.put('/task/:id', taskController.update);

/**
 * Таланты
 */
router.get('/uniques', useUser, uniqueController.findByUser);
router.put('/unique/:id', uniqueController.update);

/**
 * Сообщества
 */
router.get('/communitys', communityController.findAll);
router.get('/community/:id', useUser, communityController.findById);

module.exports = router
