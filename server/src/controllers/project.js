'use strict';
const async = require("async");
const Project = require('../models/project');
const User = require('../models/user');
const UserMeet = require('../models/visit');
const Meet = require('../models/meet');
const Place = require('../models/place');

exports.create = function(req, res) {
    const project = new Project({...req.body, userId: req.user?.id });
    Project.create(project, function(err, projectId) {
        res.json(projectId);
    });
};

exports.update = function(req, res) {
    const obj = new Project(req.body)
    Project.update(req.params.id, obj, function() {
        res.json({ error:false, message: 'Проект обновлен' });
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
            Place.findByMeet(project, function(err, place) {
                User.findById(project.userId, function (err, user) {
                    User.findParticipationUsersByProjectId(project.id, function (err, participationUsers) {
                        Meet.findByProjectId(project.id, function (err, meets) {
                            async.map(meets, UserMeet.findByMeet, function(err, meetsUsers) {
                                res.send({
                                    ...project,
                                    editable: req.user?.id === project.userId,
                                    user,
                                    place,
                                    meets: meets.map((m, index) => ({ ...m, visits: meetsUsers[index] })),
                                    participationUsers,
                                });
                            })
                        })
                    })
                })
            })
        }
    });
};

