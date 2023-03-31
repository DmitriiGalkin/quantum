'use strict';
const Place = require('../models/placeModel');
const UserPlace = require('../models/userPlaceModel');
const Project = require('../models/projectModel');

exports.findAll = function(req, res) {
    Place.findAll(function(err, employee) {
        if (err) res.send(err);
        res.send(employee);
    });
};

/**
 * Информация по пространству,
 * а также проекты по которым запланированы здесь встречи
 */
exports.findById = function(req, res) {
    Place.findById(req.params.id, function(err, place) {
        Project.findByPlaceId(req.params.id, function(err, projects) {
            if (err) res.send(err);
            res.json({...place, projects});
        });
    });
};

exports.create = function(req, res) {
    const place = new Place(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Place.create(place, function(err, data) {
            if (err) res.send(err);
            res.send({ error: false, message: "place added successfully!", data });
        });
    }
};

exports.createPlaceUser = function(req, res) {
    const data = new UserPlace({...req.params, userId: req.user.id});
    if(req.body.constructor === Object && Object.keys(req.params).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        UserPlace.create(data, function(err, data) {
            if (err) res.send(err);
            res.json({error:false,message:"user_place added successfully!", data});
        });
    }
};
exports.deletePlaceUser = function(req, res) {
    UserPlace.delete(req.params.placeId, req.user.id, function(err, employee) {
        if (err) res.send(err);
        res.json({ error:false, message: 'Employee successfully deleted' });
    });
};