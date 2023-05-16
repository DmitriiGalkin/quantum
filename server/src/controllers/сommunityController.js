'use strict';
var async = require("async");

const Place = require('../models/placeModel');
const Project = require('../models/projectModel');
const Meet = require('../models/meetModel');
const User = require('../models/userModel');
const UserCommunity = require('../models/userCommunityModel');
const Community = require('../models/communityModel');

// Сообщества
exports.findAll = function(req, res) {
    Community.findAll(function(err, places) {
        res.send(places);
    });
};

// Сообщество
exports.findById = function(req, res) {
    Community.findById(req.params.id, function(err, community) {
        User.findByCommunity(community, function(err, users) {
            Project.findByCommunity(community, function(err, projects) {
                async.map(projects, Meet.findByProject, function(err, projectsMeets) {
                    async.map(projects, Place.findByProject, function(err, projectsPlaces) {
                        async.map(projects, User.findByProject, function(err, projectsUsers) {
                            const active = users.some((u) => req.user.id === u.id)
                            res.send({
                                ...community,
                                projects: projects.map((p, index) => {
                                    const active = projectsUsers[index]?.some((user) => user.userId === req.user.id)
                                    return ({ ...p, meets: projectsMeets[index], places: projectsPlaces[index], users: projectsUsers[index], active})
                                }),
                                active
                            });
                        });
                    });
                });
            });
        });
    });
};

// Добавление участника в сообщество
exports.createUserCommunity = function(req, res) {
    const data = new UserCommunity({...req.params, userId: req.user.id});
    if(req.body.constructor === Object && Object.keys(req.params).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        UserCommunity.create(data, function() {
            res.json({error:false,message:"Добавление участника в проект"});
        });
    }
};
// Удаление участника из сообщества
exports.deleteUserCommunity = function(req, res) {
    UserCommunity.delete(req.params.communityId, req.user.id, function() {
        res.json({ error:false, message: 'Удаление участника из проекта' });
    });
};