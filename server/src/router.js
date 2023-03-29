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
router.delete('/user/:id', userController.delete);


router.post('/user/:projectId/project', useUser, projectController.createProjectUser );
router.delete('/user/:projectId/project', useUser, projectController.deleteProjectUser );

router.post('/user/:meetId/meet', useUser, meetController.createMeetUser ); // Добавление участника
router.delete('/user/:meetId/meet', useUser, meetController.deleteMeetUser ); // Удаление участника

router.post('/user/:placeId/place', useUser, placeController.createPlaceUser );
router.delete('/user/:placeId/place', useUser, placeController.deletePlaceUser );

/**
 * Проекты
 */
router.get('/projects', useUser, projectController.findByUser);
router.post('/project', projectController.create);
router.get('/project/:id', projectController.findById);
router.put('/project/:id', projectController.update);

/**
 * Места
 */
router.get('/places', placeController.findAll);
router.post('/place', placeController.create);
router.get('/place/:id', placeController.findById);

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
router.get('/uniques', useUser, userController.findByUser);
router.put('/unique/:id', uniqueController.update);

module.exports = router
