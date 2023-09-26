'use strict';
const async = require("async");
const Meet = require('../models/meet');
const User = require('../models/user');
const UserMeet = require('../models/userMeet');
const Place = require('../models/place');

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
            async.map(meets, User.findByMeet, function(err, meetsUsers) {
                res.send(meets.map((p, index) => {
                    const active = meetsUsers[index]?.some((user) => user.userId === req.user?.id)
                    const users = meetsUsers[index]
                    const place = meetsPlaces[index]

                    return ({ ...p, users, active, place })
                }));
            });
        });
    });
};

exports.findAll = function(req, res) {
    Meet.findAll(req.query.latitude, req.query.longitude)(function(err, meets) {
        async.map(meets, Place.findByMeet, function(err, meetsPlaces) {
            async.map(meets, User.findByMeet, function(err, meetsUsers) {
                res.send(meets.map((p, index) => {
                    const active = meetsUsers[index]?.some((user) => user.userId === req.user?.id)
                    const users = meetsUsers[index]
                    const place = meetsPlaces[index]

                    return ({ ...p, users, active, place })
                }));
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
                User.findByMeet(meet, function (err, users) {
                    const active = users.some((user) => user.userId === req.user?.id)
                    res.send({...meet, editable: req.user?.id === meet.userId, active, users, place });
                });
            })
        }
    });
};
