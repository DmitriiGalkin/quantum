'use strict';
var dbConn = require('../db');

var Place = function(place){
    this.title = place.title;
    this.description = place.description;
};
// Создание пространства
Place.create = function (place, result) {
    dbConn.query("INSERT INTO place set ?", place, function (err, res) {
        result(null, res.insertId);
    });
};

// Пространства
Place.findAll = function (result) {
    dbConn.query("Select * from place", function (err, res) {
        result(null, res);
    });
};
// Пространство
Place.findById = function (id, result) {
    dbConn.query("Select * from place where  id = ? ", id, function (err, res) {
        result(null, res.length ? res[0] : undefined);
    });
};
// Пространство встречи
Place.findByMeet = function (meet, result) {
    dbConn.query("Select * from place where  id = ? ", meet.placeId, function (err, res) {
        result(null, res.length ? res[0] : undefined);
    });
};


module.exports = Place;