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
// Пространства проекта
Place.findByProject = function (project, result) {
    dbConn.query("SELECT place.*, meet.projectId FROM place LEFT JOIN meet ON meet.placeId = place.id WHERE projectId = ? GROUP BY place.id", project.id, function (err, res) {
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
// Place.findByUserId = function (id, result) {
//     dbConn.query("Select * from place where userId = ? ", id, function (err, res) {
//         result(null, res);
//     });
// };


module.exports = Place;