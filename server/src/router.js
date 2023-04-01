const express = require('express')
const router = express.Router()
const User = require('./models/userModel');

const userController =   require('./controllers/userController');
const projectController =   require('./controllers/projectController');
const meetController =   require('./controllers/meetController');
const placeController =   require('./controllers/placeController');
const taskController =   require('./controllers/taskController');
const uniqueController =   require('./controllers/uniqueController');


function useUser(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    User.findByToken(token, function(err, user) {
        if (err) res.send(err);
        req.user = user
        next()
    });
}

/**
 * Участники
 */
router.post('/user', userController.create);
router.post('/user/login', userController.islogin);
router.post('/logi', userController.logi);
router.get('/user/:id', userController.findById);
router.put('/user/:id', userController.update);

router.post('/userProject/:projectId', useUser, projectController.createUserProject );
router.delete('/userProject/:projectId', useUser, projectController.deleteUserProject );
router.post('/user/:meetId/meet', useUser, meetController.createUserMeet );
router.delete('/user/:meetId/meet', useUser, meetController.deleteUserMeet );

router.post('/userpoints', useUser, userController.userpoints);

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
router.get('/place/:id', placeController.findById);
router.post('/place', placeController.create);

/**
 * Встречи
 */
router.get('/meets', useUser, meetController.findByUser);
router.post('/meet', meetController.create);

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

module.exports = router
