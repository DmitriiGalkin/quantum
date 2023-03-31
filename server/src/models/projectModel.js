'use strict';
var dbConn = require('../db.config');

var Project = function(project){
    this.title = project.title;
    this.description = project.description;
};

Project.findAll = function (result) {
    dbConn.query(`Select * from project`, function (err, res) {
        result(null, res);
    });
};

Project.findByMeet = function (meet, result) {
    dbConn.query("Select * from project where  id = ? ", meet.projectId, function (err, res) {
        result(null, { ...meet, project: res[0] });
    });
};
Project.findById = function (id, result) {
    dbConn.query("Select * from project where  id = ? ", id, function (err, res) {
        result(null, res[0]);
    });
};
Project.findByPlaceId = function (id, result) {
    dbConn.query('Select project.* from project LEFT JOIN meet ON meet.projectId = project.id LEFT JOIN place ON place.id = meet.placeId WHERE placeId = ? GROUP BY project.id', id, function (err, res) {
        result(null, res);
    });
};
Project.findByUserId = function (id, result) {
    dbConn.query('Select * from project LEFT JOIN user_project ON project.id = user_project.projectId WHERE user_project.userId = ?', id, function (err, res) {
        result(null, res);
    });
};
Project.create = function (project, result) {
    dbConn.query("INSERT INTO project set ?", project, function (err, res) {
        result(null, res.insertId);
    });
};
Project.update = function(id, project, result){
    dbConn.query("UPDATE project SET title=?,description=?,placeId=? WHERE id = ?", [project.title,project.description, project.placeId, id], function (err, res) {
        result(null, res);
    });
};

/**
 * Проекты в которых участвует пользователь
 */
Project.findAllByUserId = function (id, result) {
    dbConn.query('SELECT * FROM project LEFT JOIN user_project ON user_project.projectId = project.id WHERE userId = 1', id, function (err, res) {
        result(null, res);
    });
};

module.exports = Project;