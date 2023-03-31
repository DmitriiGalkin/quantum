'use strict';
var async = require("async");

const Project = require('../models/projectModel');
const Meet = require('../models/meetModel');
const Place = require('../models/placeModel');
const User = require('../models/userModel');
const UserProject = require('../models/userProjectModel');

exports.findById = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        User.findByProjectId(project.id, function(err, users) {
            Meet.findByProjectId(req.params.id, function(err, meets) {
                if (err) res.send(err);
                async.map(meets, User.findByMeet, function(err, meetsWithUsers) {
                    if (err) console.log(err);

                    res.send({ ...project, users, meets: meetsWithUsers, active: users.some((u) => req.user.id === u.id) });
                });
            });
        });
    });
};
exports.findByPlaceId = function(req, res) {
    Project.findByPlaceId(req.params.id, function(err, employee) {
        if (err)
            res.send(err);
        res.json(employee);
    });
};

exports.create = function(req, res) {
    const project = new Project(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Project.create(project, function(err, data) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "project added successfully!", data });
        });
    }
};
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Project.update(req.params.id, new Project(req.body), function(err, user) {
            if (err) { res.send(err);}
            res.json({ error:false, message: 'Проект обновлен' });
        });
    }
};

exports.createProjectUser = function(req, res) {
    const data = new UserProject({...req.params, userId: req.user.id});

    if(req.body.constructor === Object && Object.keys(req.params).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        UserProject.create(data, function(err, employee) {
            if (err)
                res.send(err);
            res.json({error:false,message:"Employee added successfully!",data:employee});
        });
    }
};
exports.deleteProjectUser = function(req, res) {
    UserProject.delete(req.params.projectId, req.user.id, function(err, employee) {
        if (err)
            res.send(err);
        res.json({ error:false, message: 'Employee successfully deleted' });
    });
};

/**
 * Проекты пользователя
 */
exports.findByUser = function(req, res) {
    Project.findAllByUserId(req.user.id, function(err, projects) {
        if (err) res.send(err);
        if (projects) {
            async.map(projects || [], Meet.findFirstByProject, function(err, projectsWithMeet) {
                if (err) console.log(err);
                async.map(projectsWithMeet, Place.findByProject, function(err, projectsWithMeetWithPlaces) {
                    if (err) console.log(err);
                    async.map(projectsWithMeetWithPlaces, User.findByProject, function(err, projectsWithMeetWithPlaceWithUsers) {
                        if (err) console.log(err);
                        const projectsWithMeetWithPlaceWithUsersA = projectsWithMeetWithPlaceWithUsers.map((p) => ({ ...p, active: p.users?.find((user) => user.id === req.user.id) }))
                        res.send(projectsWithMeetWithPlaceWithUsersA);
                    });
                });
            });
        } else {
            res.send([])
        }
    });
};

