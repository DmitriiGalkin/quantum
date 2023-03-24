'use strict';
const Task = require('../models/taskModel');
exports.findAll = function(req, res) {
    Task.findAll(function(err, employee) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', employee);
        res.send(employee);
    });
};
exports.findById = function(req, res) {
    Task.findById(req.params.id, function(err, tasks) {
        if (err) res.send(err);
        res.json(tasks[0]);
    });
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Конструктор сломался' });
    }else{
        Task.update(req.params.id, new Task(req.body), function(err, data) {
            if (err) res.send(err);
            res.json({ error:false, message: 'task successfully updated' });
        });
    }
};

exports.findTasksByUserId = function(req, res) {
    Task.findAllByUserId(req.params.id, function(err, tasks) {
        if (err) res.send(err);
        res.send(tasks);
    });
};
