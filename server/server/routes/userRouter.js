const express = require('express')
const router = express.Router()
const userController =   require('../controllers/userController');
const projectController =   require('../controllers/projectController');
const taskController =   require('../controllers/taskController');
const meetController =   require('../controllers/meetController');


router.get('/', userController.findAll);
router.post('/', userController.create);
router.post('/login', userController.islogin);
router.get('/:id', userController.findById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

router.get('/:id/project', projectController.findByUserId);

router.get('/:id/meets', meetController.findAllByUserId);
router.get('/:id/projects', projectController.findAllByUserId);
router.get('/:id/tasks', taskController.findTasksByUserId);
router.get('/:id/uniques', userController.findUniquesById);

module.exports = router