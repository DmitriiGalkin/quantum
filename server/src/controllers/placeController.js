'use strict';
const Place = require('../models/placeModel');
const UserPlace = require('../models/userPlaceModel');
const Project = require('../models/projectModel');

// Все пространства
exports.findAll = function(req, res) {
    Place.findAll(function(err, places) {
        res.send(places);
    });
};
// Пространство
exports.findById = function(req, res) {
    Place.findById(req.params.id, function(err, place) {
        Project.findByPlace(place, function(err, projects) {
            res.json({...place, projects});
        });
    });
};
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
// Добавление участника в пространство
exports.createUserPlace = function(req, res) {
    const data = new UserPlace({...req.params, userId: req.user.id});
    if(req.body.constructor === Object && Object.keys(req.params).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        UserPlace.create(data, function() {
            res.json({error:false,message:"Добавление участника в пространство"});
        });
    }
};
// Удаление участника из пространства
exports.deleteUserPlace = function(req, res) {
    UserPlace.delete(req.params.placeId, req.user.id, function() {
        res.json({ error:false, message: 'Удаление участника из пространства' });
    });
};