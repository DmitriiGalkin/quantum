'use strict';
var async = require("async");

const Task = require('../models/taskModel');
const UserTask = require('../models/userTaskModel');

// Задание участника
exports.findById = function(req, res) {
    UserTask.findById(req.params.id, function(err, userTask) {
        Task.findByUserTask(userTask, function(err, task) {
            res.json({...userTask, task});
        });
    });
};
// Обновление задания участника
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Конструктор сломался' });
    }else{
        UserTask.update(req.params.id, new UserTask(req.body), function() {
            res.json({ error:false, message: 'Обновление задания участника' });
        });
    }
};
// Задания участника
exports.findByUser = function(req, res) {
    UserTask.findAllByUserId(req.user.id, function(err, userTasks) {
        async.map(userTasks, Task.findByUserTask, function(err, tasks) {
            res.send(userTasks.map((userTask, index) => ({...userTask, task: tasks[index]})));
        });
    });
};
