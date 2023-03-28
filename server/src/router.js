const express = require('express')
const router = express.Router()

const userController =   require('./controllers/userController');
const projectController =   require('./controllers/projectController');
const meetController =   require('./controllers/meetController');
const placeController =   require('./controllers/placeController');
const imageController =   require('./controllers/imageController');
const mainController =   require('./controllers/mainController');
const taskController =   require('./controllers/taskController');
const uniqueController =   require('./controllers/uniqueController');

// router.get('/callback', function(req, res) {
//     console.log(req.headers);
// });

/**
 * Участники
 */
router.get('/user/', userController.findAll);
router.post('/user/', userController.create);
router.post('/user/login', userController.islogin);
router.get('/user/:id', userController.findById);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.delete);

router.get('/user/:id/project', projectController.findByUserId);

router.get('/user/:id/meets', meetController.findAllByUserId);
router.get('/user/:id/projects', projectController.findAllByUserId);
router.get('/user/:id/tasks', taskController.findTasksByUserId);
router.get('/user/:id/uniques', userController.findUniquesById);

router.put('/unique/:id', uniqueController.update);
router.get('/profile/:id/places', placeController.findByUserId);


/**
 * Проекты
 */
router.get('/project/', projectController.findAll);
router.get('/project/:id', projectController.findById);
router.post('/project/', projectController.create);
router.put('/project/:id', projectController.update);

router.get('/project/:id/user', userController.findByProjectId); // Участники проекта
router.get('/project/:id/meet', meetController.findByProjectId); // Встречи проекта

router.post('/project/:projectId/user/:userId', projectController.createProjectUser );
router.delete('/project/:projectId/user/:userId', projectController.deleteProjectUser );

/**
 * Места
 */
router.get('/place/', placeController.findAll);
router.get('/place/:id', placeController.findById);
router.post('/place/', placeController.create);


router.get('/place/:id/user', userController.findByPlaceId); // Участники пространства
router.get('/place/:id/project', projectController.findByPlaceId);

router.post('/place/:placeId/user/:userId', placeController.createPlaceUser );
router.delete('/place/:placeId/user/:userId', placeController.deletePlaceUser );

/**
 * Встречи
 */
router.get('/meet/', meetController.findAll); // Встречи
router.get('/meet/:id', meetController.findById); // Встреча
router.get('/meet/:id/user', userController.findByMeetId); // Участники встречи

router.post('/meet/', meetController.create); // Создание встречи

router.post('/meet/:meetId/user/:userId', meetController.createMeetUser ); // Добавление участника
router.delete('/meet/:meetId/user/:userId', meetController.deleteMeetUser ); // Удаление участника

/**
 * Задания
 */
router.get('/task/', taskController.findAll);
router.get('/user-task/:id', taskController.findById);
router.put('/user-task/:id', taskController.update);


/**
 * Атавизмы
 */
router.get('/main/meet', mainController.getMeets); // Встречи пользователя
router.get('/main/project', mainController.getProjects); // Выгрузить все по пользователю
router.post('/image/uploadfile', imageController.getImages); // Встречи пользователя

module.exports = router