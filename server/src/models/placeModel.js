'use strict';
var dbConn = require('../db.config');

var Place = function(place){
    this.title = place.title;
    this.description = place.description;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};

Place.findAll = function (result) {
    dbConn.query("Select * from place", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Place.findByProject = function (project, result) {
    dbConn.query("SELECT place.*, meet.projectId FROM place LEFT JOIN meet ON meet.placeId = place.id WHERE projectId = ? GROUP BY place.id", project.id, function (err, res) {
        if(err) result(err, null);
        result(null, {...project, places: res });
    });
};

Place.findById = function (id, result) {
    dbConn.query("Select * from place where  id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res[0]);
        }
    });
};
Place.findByUserId = function (id, result) {
    console.log(id, 'id')
    dbConn.query("Select * from place where userId = ? ", id, function (err, res) {
        console.log(res, 'res')

        result(null, res);
    });
};

Place.create = function (place, result) {
    dbConn.query("INSERT INTO place set ?", place, function (err, res) {
        if (err) result(err, null);
        result(null, res.insertId);
    });
};

module.exports = Place;