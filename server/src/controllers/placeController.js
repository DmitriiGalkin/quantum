'use strict';
var async = require("async");

const Place = require('../models/placeModel');
const Project = require('../models/projectModel');
const Meet = require('../models/meetModel');
const User = require('../models/userModel');

// Все пространства
exports.findAll = function(req, res) {
    Place.findAll(function(err, places) {
        res.send(places);
    });
};
// Пространство со встречами
exports.findById = function(req, res) {
    Place.findById(req.params.id, function(err, place) {
        Meet.findByPlace(place, function(err, meets) {
            async.map(meets, User.findByMeet, function(err, meetsUsers) {
                async.map(meets, Project.findByMeet, function(err, meetsProject) {
                    async.map(meets, Place.findByMeet, function(err, meetsPlace) {
                        res.send({
                            ...place,
                            meets: meets.map((p, index) => {
                                const active = meetsUsers[index]?.some((user) => user.userId === req.user.id)
                                return ({ ...p, project: meetsProject[index], place: meetsPlace[index], users: meetsUsers[index], active })
                            })
                        });
                    });
                });
            });
        });
    });
};
// Пространство с проектами
// exports.findById = function(req, res) {
//     Place.findById(req.params.id, function(err, place) {
//         Meet.findByPlace(place, function(err, meets) {
//             Project.findByPlace(place, function(err, projects) {
//                 async.map(projects, Meet.findByProject, function(err, projectsMeets) {
//                     async.map(projects, Place.findByProject, function(err, projectsPlaces) {
//                         async.map(projects, User.findByProject, function(err, projectsUsers) {
//                             res.send({
//                                 ...place,
//                                 projects: projects.map((p, index) => {
//                                     const active = projectsUsers[index]?.some((user) => user.userId === req.user.id)
//                                     return ({ ...p, meets: projectsMeets[index], places: projectsPlaces[index], users: projectsUsers[index], active})
//                                 }),
//                                 meets
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     });
// };
// Создание пространства
exports.create = function(req, res) {
    const place = new Place(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Place.create(place, function() {
            res.send({ error: false, message: "Создание пространства" });
        });
    }
};
