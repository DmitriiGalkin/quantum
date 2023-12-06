'use strict';
const async = require("async");
const Meet = require('../models/meet');
const User = require('../models/user');
const UserMeet = require('../models/visit');
const Place = require('../models/place');
const Project = require('../models/project');

exports.create = function(req, res) {
    const meet = new Meet({...req.body, userId: req.user?.id });
    Meet.create(meet, function(err, meetId) {
        const userMeet = new UserMeet({meetId, userId: req.user.id});
        UserMeet.create(userMeet, function() {
            res.json(meetId);
        });
    });
};

exports.update = function(req, res) {
    const obj = new Meet(req.body)
    Meet.update(req.params.id, obj, function() {
        res.json({ error:false, message: 'Встреча обновлен' });
    });
};

exports.delete = function(req, res) {
    Meet.delete(req.params.id, function() {
        res.json({ error:false, message: 'Удаление встречи' });
    });
};

// Добавление или удаление участника встречи
exports.toggleUserMeet = function(req, res) {
    UserMeet.findById(req.user.id, req.params.meetId, function(err, userMeet) {
        if (userMeet) {
            UserMeet.delete( req.user.id, req.params.meetId, function() {
                res.json({ error:false, message: 'Удаление участника из встречи' });
            });
        } else {
            const userMeet = new UserMeet({...req.params, userId: req.user.id});
            UserMeet.create(userMeet, function() {
                res.json({error:false,message:"Добавление участника на встречу"});
            });
        }
    })
};

exports.findUserMeets = function(req, res) {
    Meet.findUserMeet(req.user.id, function(err, meets) {
        async.map(meets, Place.findByMeet, function(err, meetsPlaces) {
            async.map(meets, User.findByMeet, function(err, userMeets) {
                res.send(meets.map((p, index) => ({
                    ...p,
                    userMeets: userMeets[index],
                    active: userMeets[index]?.some((user) => user.userId === req.user?.id),
                    place: meetsPlaces[index] })));
            });
        });
    });
};

exports.findAll = function(req, res) {
    Meet.findAll(req.query.latitude, req.query.longitude)(function(err, meets) {
        async.map(meets, Place.findByMeet, function(err, meetsPlaces) {
            async.map(meets, User.findByMeet, function(err, meetsUsers) {
                res.send(meets.map((p, index) => ({
                    ...p,
                    userMeets: meetsUsers[index],
                    userMeet: meetsUsers[index]?.find((user) => user.userId === req.user?.id),
                    place: meetsPlaces[index]
                })));
            });
        });
    });
};

exports.findById = function(req, res) {
    Meet.findById(req.params.id, function(err, meet) {
        if (!meet) {
            res.status(400).send({ error:true, message: 'Встреча с таким номером не найдена' });
        } else {
            Place.findByMeet(meet, function(err, place) {
                User.findById(meet.userId, function (err, user) {
                    User.findByMeet(meet, function (err, userMeets) {
                        const exMeet = {
                            ...meet,
                            user,
                            editable: req.user?.id === meet.userId,
                            // userMeet: userMeets.find((user) => user.userId === req.user?.id),
                            visits: userMeets,
                            place
                        }
                        if (meet.projectId) {
                            Project.findById(meet.projectId, function (err, project) {
                                res.send({...exMeet, project });
                            });
                        } else {
                            res.send(exMeet);
                        }
                    });
                });
            })
        }
    });
};
