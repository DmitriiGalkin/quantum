'use strict';
var dbConn = require('../db.config');

var Place = function(place){
    this.title = place.title;
    this.description = place.description;
};

Place.findAll = function (result) {
    dbConn.query("Select * from place", function (err, res) {
        result(null, res);
    });
};

Place.findByProject = function (project, result) {
    dbConn.query("SELECT place.*, meet.projectId FROM place LEFT JOIN meet ON meet.placeId = place.id WHERE projectId = ? GROUP BY place.id", project.id, function (err, res) {
        result(null, {...project, places: res });
    });
};

Place.findById = function (id, result) {
    dbConn.query("Select * from place where  id = ? ", id, function (err, res) {
        result(null, res[0]);
    });
};
Place.findByUserId = function (id, result) {
    dbConn.query("Select * from place where userId = ? ", id, function (err, res) {
        result(null, res);
    });
};

Place.create = function (place, result) {
    dbConn.query("INSERT INTO place set ?", place, function (err, res) {
        result(null, res.insertId);
    });
};

module.exports = Place;