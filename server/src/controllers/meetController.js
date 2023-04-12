'use strict';
const async = require("async");
const Meet = require('../models/meetModel');
const User = require('../models/userModel');
const Project = require('../models/projectModel');
const Place = require('../models/placeModel');
const UserMeet = require('../models/userMeetModel');

// Создание встречи
exports.create = function(req, res) {
    const meet = new Meet(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Meet.create(meet, function(err, meetId) {
            const userMeet = new UserMeet({meetId, userId: req.user.id});
            UserMeet.create(userMeet, function() {
                res.json(meetId);
            });
        });
    }
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
            if(req.body.constructor === Object && Object.keys(req.params).length === 0){
                res.status(400).send({ error:true, message: 'Ошибка конструктора создания регистрации на встречу' });
            }else{
                UserMeet.create(userMeet, function() {
                    res.json({error:false,message:"Добавление участника на встречу"});
                });
            }
        }
    })

};

// Встречи участника
exports.findByUser = function(req, res) {
    Meet.findAllByUserId(req.user.id)(function(err, meets) {
        async.map(meets, User.findByMeet, function(err, meetsUsers) {
            async.map(meets, Project.findByMeet, function(err, meetsProject) {
                async.map(meets, Place.findByMeet, function(err, meetsPlace) {
                    res.send(meets.map((p, index) => {
                        const active = meetsUsers[index]?.some((user) => user.userId === req.user.id)
                        return ({ ...p, project: meetsProject[index], place: meetsPlace[index], users: meetsUsers[index], active })
                    }));
                });
            });
        });
    });
};
