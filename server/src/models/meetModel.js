'use strict';
var dbConn = require('../db');

var Meet = function(data){
    this.projectId = data.projectId;
    this.placeId = data.placeId;
    this.datetime = data.datetime;
};
// Создание встречи
Meet.create = function (data, result) {
    dbConn.query("INSERT INTO meet set ?", data, function (err, res) {
        result(null, res.insertId);
    });
};
// Встречи проекта
Meet.findByProject = function (project, result) {
    dbConn.query("Select * from meet where projectId = ? ", project.id, function (err, res) {
        result(null, res);
    });
};
// Встречи участника
Meet.findAllByUserId = function (id, result) {
    dbConn.query("Select meet.* from meet LEFT JOIN project ON project.id = meet.projectId LEFT JOIN user_project ON user_project.projectId = project.id WHERE userId = ? AND DATE(datetime) > CURDATE()", id, function (err, res) {
        result(null, res);
    });
};


module.exports = Meet;