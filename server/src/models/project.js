'use strict';
var dbConn = require('../db');

var Project = function(data){
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
    this.passportId = data.passportId; // Создатель проекта
    this.ageFrom = data.ageFrom;
    this.ageTo = data.ageTo;
    this.placeId = data.placeId;
};

Project.create = function (data, result) {
    dbConn.query("INSERT INTO project set ?", data, function (err, res) {
        if (err) {console.log(err,'err')}
        result(err, res.insertId);
    });
};

Project.update = function(id, obj, result){
    dbConn.query("UPDATE project SET title=?, description=?, image=?, ageFrom=?, ageTo=?, placeId=? WHERE id = ?", [obj.title, obj.description, obj.image, obj.ageFrom, obj.ageTo, obj.placeId, id], function (err, res) {
        result(null, res);
    });
};

Project.delete = function(id, result){
    dbConn.query("UPDATE project SET deleted = CURRENT_TIMESTAMP() WHERE id = ?", [id], function (err, res) {
        result(null, res);
    });
};

Project.findAll = function (params, result) {
    console.log(params,'params')

    let where = 'WHERE '
    where = where + (params.deleted === 'true' ? 'deleted IS NOT NULL OR deleted IS NULL' : 'deleted IS NULL')
    where = where + ' AND passportId = ' + (params.self ? params.passportId : 'passportId')

    const l = `SELECT * FROM project ${where}`
    console.log(l,'l')
    dbConn.query(l, function (err, res) {
        console.log(res,'res')

        result(null, res || []);
    });
};
Project.findById = function (id, result) {
    dbConn.query("SELECT * FROM project WHERE id = ?", id, function (err, res) {
        result(null, res[0]);
    });
};

module.exports = Project;