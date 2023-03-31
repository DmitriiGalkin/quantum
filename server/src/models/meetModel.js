'use strict';
var dbConn = require('../db.config');

var Meet = function(data){
    this.projectId = data.projectId;
    this.placeId = data.placeId;
    this.datetime = data.datetime;
};

Meet.findAll = function (result) {
    dbConn.query("Select * from meet", function (err, res) {
        result(null, res);
    });
};

Meet.findByProject = function (project, result) {
    dbConn.query("Select * from meet where projectId = ? ", project.id, function (err, res) {
        result(null, {...project, meets: res});
    });
};
Meet.findFirstByProject = function (project, result) {
    dbConn.query("Select * from meet where  projectId = ? LIMIT 1", project.id, function (err, res) {
        result(null, {...project, meet: res.length ? res[0] : undefined});
    });
};
Meet.findById = function (id, result) {
    dbConn.query("Select * from meet where  id = ? ", id, function (err, res) {
        result(null, res[0]);
    });
};

Meet.findByProjectId = function (id, result) {
    dbConn.query("Select * from meet where projectId = ? ", id, function (err, res) {
        result(null, res);
    });
};

Meet.create = function (data, result) {
    dbConn.query("INSERT INTO meet set ?", data, function (err, res) {
        result(null, res.insertId);
    });
};

Meet.findAllByUserId = function (id, result) {
    dbConn.query("Select meet.* from meet LEFT JOIN project ON project.id = meet.projectId LEFT JOIN user_project ON user_project.projectId = project.id WHERE userId = ? AND DATE(datetime) > CURDATE()", id, function (err, res) {
        result(null, res);
    });
};


module.exports = Meet;