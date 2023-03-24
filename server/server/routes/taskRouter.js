const express = require('express')
const router = express.Router()
const taskController =   require('../controllers/taskController');

router.get('/', taskController.findAll);
router.get('/:id', taskController.findById);
router.put('/:id', taskController.update);


module.exports = router