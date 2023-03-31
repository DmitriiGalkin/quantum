'use strict';
var async = require("async");
const Meet = require('../models/meetModel');
const User = require('../models/userModel');
const Project = require('../models/projectModel');
const UserMeet = require('../models/userMeetModel');

// Создание встречи
exports.create = function(req, res) {
    const meet = new Meet(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Meet.create(meet, function() {
            res.json({ error: false, message: "Встреча создана!" });
        });
    }
};
// Добавление участника на встречу
exports.createUserMeet = function(req, res) {
    const userMeet = new UserMeet({...req.params, userId: req.user.id});
    if(req.body.constructor === Object && Object.keys(req.params).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        UserMeet.create(userMeet, function() {
            res.json({error:false,message:"Добавление участника на встречу"});
        });
    }
};
// Удаление участника из встречи
exports.deleteUserMeet = function(req, res) {
    UserMeet.delete( req.user.id, req.params.meetId, function() {
        res.json({ error:false, message: 'Удаление участника из встречи' });
    });
};
// Встречи участника
exports.findByUser = function(req, res) {
    Meet.findAllByUserId(req.user.id, function(err, meets) {
        async.map(meets, User.findByMeet, function(err, meetsUsers) {
            async.map(meets, Project.findByMeet, function(err, meetsProject) {
                res.send(meets.map((p, index) => ({ ...p, project: meetsProject[index], users: meetsUsers[index], active: meetsUsers[index]?.find((user) => user.id === req.user.id) })));
            });
        });
    });
};
