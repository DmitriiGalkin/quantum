'use strict';
const async = require("async");
const Project = require('../models/project');
const User = require('../models/user');
const Passport = require('../models/passport');
const Visit = require('../models/visit');
const Meet = require('../models/meet');
const Place = require('../models/place');
const Participation = require('../models/participation');

exports.create = function(req, res) {
    const project = new Project({...req.body, passportId: req.passport?.id });
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
    Project.findById(req.params.id, function(err, project) {
        if (err) res.json({error: true, message: 'Проект с данным номером не существует'});
        if (project.passportId !== req.passport.id) res.json({error: true, message: "Вы не владелец проекта, чтобы принимать решение по удалению"});
        Project.delete(project.id, function () {
            Meet.deleteByProjectId(project.id, function () {
                res.json({error: false, message: 'Проект удален'});
            });
        });
    })
};

// Встречи для пользователя
exports.findAll = function(req, res) {
    Project.findAll(function(err, projects) {
        res.send(projects);
    });
};
exports.findById = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (!project) {
            res.status(400).send({ error:true, message: 'Проект с таким номером не найден' });
        } else {
            Place.findById(project.placeId, function(err, place) {
                Passport.findById(project.passportId, function (err, passport) {
                    Participation.findByProjectId(project.id, function (err, participations) {
                        Meet.findByProjectId(project.id, function (err, meets) {
                            async.map(participations.map(p=>p.userId), User.findById, function(err, users) {
                                async.map(meets, Visit.findByMeet, function(err, visits) {
                                    async.map(meets, User.findByMeet, function(err, visitUsers) {
                                        res.send({
                                            ...project,
                                            passport,
                                            place,
                                            meets: meets?.map((m, index) => ({ ...m, visits: visits[index].map((v, index2)=>({...v, user: visitUsers[index][index2] })) })),
                                            participations: participations.map((m, index) => ({...m, user: users[index]}))
                                        });
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
    });
};

