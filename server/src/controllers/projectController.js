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
                async.map(meets, User.findByMeet, function(err, meetsWithUsers) {
                    res.send({ ...project, users, meets: meetsWithUsers, active: users.some((u) => req.user.id === u.id) });
                });
            });
        });
    });
};
// Создание проекта
exports.create = function(req, res) {
    const project = new Project(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Project.create(project, function(err, data) {
            res.json({ error: false, message: "project added successfully!", data });
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
        res.json({ error:false, message: 'Employee successfully deleted' });
    });
};
// Проекты участника
exports.findByUser = function(req, res) {
    Project.findAllByUserId(req.user.id, function(err, projects) {
        async.map(projects, Meet.findFirstByProject, function(err, projectsWithMeet) {
            async.map(projectsWithMeet, Place.findByProject, function(err, projectsWithMeetWithPlaces) {
                async.map(projectsWithMeetWithPlaces, User.findByProject, function(err, projectsWithMeetWithPlaceWithUsers) {
                    const projectsWithMeetWithPlaceWithUsersA = projectsWithMeetWithPlaceWithUsers.map((p) => ({ ...p, active: p.users?.find((user) => user.id === req.user.id) }))
                    res.send(projectsWithMeetWithPlaceWithUsersA);
                });
            });
        });
    });
};

