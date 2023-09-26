'use strict';
const async = require("async");
const Project = require('../models/project');
const Meet = require('../models/meet');
const ProjectTime = require('../models/projectTime');

exports.create = function(req, res) {
    const project = new Project({...req.body, userId: req.user?.id });
    Project.create(project, function(err, projectId) {
        res.json(projectId);
    });
};

exports.update = function(req, res) {
    const obj = new Project(req.body)
    Project.update(req.params.id, obj, function() {
        ProjectTime.updates(req.params.id, req.body.timing, function() {
            res.json({ error:false, message: 'Проект обновлен' });
        })
    });
};
exports.delete = function(req, res) {
    Project.delete(req.params.id, function() {
        res.json({ error:false, message: 'Удаление проекта' });
    });
};

// Встречи для пользователя
exports.findAll = function(req, res) {
    Project.findAll()(function(err, projects) {
        res.send(projects);
    });
};
exports.findById = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (!project) {
            res.status(400).send({ error:true, message: 'Проект с таким номером не найден' });
        } else {
            ProjectTime.findAll(req.params.id, function(timing) {
                res.send({...project, editable: req.user?.id === project.userId, timing });
            })
        }
    });
};

// Таинство тайминга
exports.timing = function(req, res) {
    ProjectTime.findAllAll(function(projectTimes) {
        // Исключаем уже созданные встречи
        async.map(projectTimes, Meet.check, function(err, times) {
            const z = times.filter(f=>Boolean(f))
            console.log(z,'z')
            async.map(z, Meet.createByTimer, function(err, data) {
                console.log(data,'data')
                res.send(data);
            });
        });
    });
};
