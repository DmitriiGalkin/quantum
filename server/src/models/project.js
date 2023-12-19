'use strict';
var dbConn = require('../db');

var Project = function(data){
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.userId = data.userId; // Создатель проекта
    this.ageFrom = data.ageFrom;
    this.ageTo = data.ageTo;
};

Project.create = function (data, result) {
    dbConn.query("INSERT INTO project set ?", data, function (err, res) {
        result(err, res.insertId);
    });
};

Project.update = function(id, obj, result){
    dbConn.query("UPDATE project SET title=?, description=?, image=?, latitude=?, longitude=?, ageFrom=?, ageTo=? WHERE id = ?", [obj.title, obj.description, obj.image, obj.latitude, obj.longitude, obj.ageFrom, obj.ageTo, id], function (err, res) {
        result(null, res);
    });
};

Project.delete = function(id, result){
    dbConn.query(`DELETE FROM project WHERE id = ?`, id, function (err, res) {
        result(null, res);
    });
};
Project.findAll = () => function (result) {
    dbConn.query("SELECT * FROM project", function (err, res) {
        result(null, res || []);
    });
};
Project.findById = function (id, result) {
    console.log(id,'id')
    dbConn.query("SELECT * FROM project WHERE id = ?", id, function (err, res) {
        result(null, res[0]);
    });
};

module.exports = Project;