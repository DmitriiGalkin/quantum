'use strict';
var async = require("async");

const Place = require('../models/placeModel');
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
                async.map(meets, Place.findByMeet, function(err, meetsPlace) {
                    res.send({
                        ...place,
                        meets: meets.map((p, index) => {
                            const active = meetsUsers[index]?.some((user) => user.userId === req.user.id)
                            return ({ ...p, place: meetsPlace[index], users: meetsUsers[index], active })
                        })
                    });
                });
            });
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
