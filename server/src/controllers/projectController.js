'use strict';
const Project = require('../models/projectModel');

// Создание проекта
exports.create = function(req, res) {
    const project = new Project({...req.body, userId: req.user?.id });
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Ошибка конструктора модели при создании проекта' });
    }else{
        Project.create(project, function(err, projectId) {
            res.json(projectId);
        });
    }
};

// Обновление встречи
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Ошибка конструктора модели при обновлении проекта' });
    }else{
        const obj = new Project(req.body)
        Project.update(req.params.id, obj, function() {
            res.json({ error:false, message: 'Проект обновлен' });
        });
    }
};
// Удаление встречи
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
// Встреча
exports.findById = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (!project) {
            res.status(400).send({ error:true, message: 'Проект с таким номером не найден' });
        } else {
            res.send({...project, editable: req.user?.id === project.userId });
        }
    });
};
