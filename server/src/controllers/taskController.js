'use strict';
var async = require("async");

const UserTask = require('../models/userTaskModel');

exports.findById = function(req, res) {
    UserTask.findById(req.params.id, function(err, tasks) {
        if (err) res.send(err);
        res.json(tasks[0]);
    });
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Конструктор сломался' });
    }else{
        UserTask.update(req.params.id, new UserTask(req.body), function(err, data) {
            if (err) res.send(err);
            res.json({ error:false, message: 'task successfully updated' });
        });
    }
};

exports.findByUser = function(req, res) {
    UserTask.findAllByUserId(req.user.id, function(err, userTasks) {
        if (err) res.send(err);
        async.map(userTasks, UserTask.findByUserTask, function(err, userTasksWithTask) {
            if (err) console.log(err);
            res.send(userTasksWithTask);
        });
    });
};
