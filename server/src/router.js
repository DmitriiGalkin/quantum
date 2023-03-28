const express = require('express')
const router = express.Router()
const User = require('./models/userModel');

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

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    // jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    //     console.log(err)
    //
    //     if (err) return res.sendStatus(403)
    //
    //     req.user = user
    //
    //     next()
    // })
    // console.log(token, 'token authenticateToken')

    User.findByToken(token, function(err, user) {
        if (err) res.send(err);
        req.user = user
        next()
    });
}

router.post('/logi', userController.logi);
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

router.get('/meets', authenticateToken, meetController.findAllByUserId);
router.get('/projects', authenticateToken, projectController.findAllByUserId);
router.get('/tasks', authenticateToken, taskController.findTasksByUserId);
router.get('/uniques', authenticateToken, userController.findUniquesById);

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

router.post('/project/:projectId/user', authenticateToken, projectController.createProjectUser );
router.delete('/project/:projectId/user', authenticateToken, projectController.deleteProjectUser );

/**
 * Места
 */
router.get('/place/', placeController.findAll);
router.get('/place/:id', placeController.findById);
router.post('/place/', placeController.create);


router.get('/place/:id/user', userController.findByPlaceId); // Участники пространства
router.get('/place/:id/project', projectController.findByPlaceId);

router.post('/place/:placeId/user', authenticateToken, placeController.createPlaceUser );
router.delete('/place/:placeId/user', authenticateToken, placeController.deletePlaceUser );

/**
 * Встречи
 */
router.get('/meet/', meetController.findAll); // Встречи
router.get('/meet/:id', meetController.findById); // Встреча
router.get('/meet/:id/user', userController.findByMeetId); // Участники встречи

router.post('/meet/', meetController.create); // Создание встречи

router.post('/meet/:meetId/user', authenticateToken, meetController.createMeetUser ); // Добавление участника
router.delete('/meet/:meetId/user', authenticateToken, meetController.deleteMeetUser ); // Удаление участника

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
