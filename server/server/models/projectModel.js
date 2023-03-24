'use strict';
var dbConn = require('../db.config');

var Project = function(project){
    this.title = project.title;
    this.description = project.description;
    this.placeId = project.placeId;
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
    dbConn.query('Select * from project LEFT JOIN project_user ON project.id = project_user.projectId WHERE project_user.userId = ?', id, function (err, res) {
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
 * Проекты пространств на которые подписан участник
 */
Project.findAllByUserId = function (id, result) {
    dbConn.query('Select project.* from project LEFT JOIN place ON place.id = project.placeId LEFT JOIN place_user ON place_user.placeId = project.placeId WHERE place_user.userId = ?', id, function (err, res) {
        if(err) result(null, err);
            result(null, res);
    });
};

module.exports = Project;