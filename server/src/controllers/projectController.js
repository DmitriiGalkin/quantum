'use strict';
var async = require("async");

const Project = require('../models/projectModel');
const Meet = require('../models/meetModel');
const Place = require('../models/placeModel');
const User = require('../models/userModel');
const UserProject = require('../models/userProjectModel');

// Проект
exports.findById = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        User.findByProject(project, function(err, users) {
            Meet.findByProject(project, function(err, meets) {
                async.map(meets, User.findByMeet, function(err, meetsUsers) {
                    async.map(meets, Place.findByMeet, function(err, meetsPlace) {
                        res.send({ ...project, users, meets: meets.map((p, index) => ({ ...p, users: meetsUsers[index], place: meetsPlace[index], project})), active: users.find((u) => req.user.id === u.id) });
                    });
                });
            });
        });
    });
};
// Создание проекта
exports.create = function(req, res) {
    const project = new Project(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    } else {
        Project.create(project, function(err, projectId) {
            const userProject = new UserProject({projectId, userId: req.user.id});
            UserProject.create(userProject, function() {
                res.json(projectId);
            });
        });
    }
};

// Обновление проекта
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Project.update(req.params.id, new Project(req.body), function() {
            res.json({ error:false, message: 'Проект обновлен' });
        });
    }
};
// Добавление участника в проект
exports.createUserProject = function(req, res) {
    const data = new UserProject({...req.params, userId: req.user.id});
    if(req.body.constructor === Object && Object.keys(req.params).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        UserProject.create(data, function() {
            res.json({error:false,message:"Добавление участника в проект"});
        });
    }
};
// Удаление участника из проекта
exports.deleteUserProject = function(req, res) {
    UserProject.delete(req.params.projectId, req.user.id, function() {
        res.json({ error:false, message: 'Удаление участника из проекта' });
    });
};
// Проекты участника
exports.findByUser = function(req, res) {
    Project.findAllByUserId(req.user.id, function(err, projects) {
        async.map(projects, Meet.findByProject, function(err, projectsMeets) {
            async.map(projects, Place.findByProject, function(err, projectsPlaces) {
                async.map(projects, User.findByProject, function(err, projectsUsers) {
                    res.send(projects.map((p, index) => ({ ...p, meets: projectsMeets[index], places: projectsPlaces[index], users: projectsUsers[index]})));
                });
            });
        });
    });
};

