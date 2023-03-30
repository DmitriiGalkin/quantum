'use strict';
var dbConn = require('../db.config');

var Project = function(project){
    this.title = project.title;
    this.description = project.description;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Project.findAll = function (result) {
    dbConn.query(`Select * from project`, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Project.findByMeet = function (meet, result) {
    dbConn.query("Select * from project where  id = ? ", meet.projectId, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, { ...meet, project: res[0] });
        }
    });
};
Project.findById = function (id, result) {
    dbConn.query("Select * from project where  id = ? ", id, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res[0]);
        }
    });
};
Project.findByPlaceId = function (id, result) {
    dbConn.query('Select * from project WHERE placeId = ?', id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
Project.findByUserId = function (id, result) {
    dbConn.query('Select * from project LEFT JOIN user_project ON project.id = user_project.projectId WHERE user_project.userId = ?', id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Project.create = function (project, result) {
    dbConn.query("INSERT INTO project set ?", project, function (err, res) {
        if (err) result(err, null);
        result(null, res.insertId);
    });
};
Project.update = function(id, project, result){
    dbConn.query("UPDATE project SET title=?,description=?,placeId=? WHERE id = ?", [project.title,project.description, project.placeId, id], function (err, res) {
        if(err) result(null, err);
        result(null, res);
    });
};

/**
 * Проекты в которых участвует пользователь
 */
Project.findAllByUserId = function (id, result) {
    dbConn.query('SELECT * FROM project LEFT JOIN user_project ON user_project.projectId = project.id WHERE userId = 1', id, function (err, res) {
        if(err) result(null, err);
            result(null, res);
    });
};

module.exports = Project;