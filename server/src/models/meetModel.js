'use strict';
var dbConn = require('../db');

var Meet = function(data){
    this.projectId = data.projectId;
    this.placeId = data.placeId;
    this.title = data.title;
    this.datetime = data.datetime;
};
// Создание встречи
Meet.create = function (data, result) {
    dbConn.query("INSERT INTO meet set ?", data, function (err, res) {
        result(null, res.insertId);
    });
};
// Обновление встречи
Meet.update = function(id, meet, result){
    dbConn.query("UPDATE meet SET title=?, projectId=?, placeId=?, datetime=? WHERE id = ?", [meet.title,meet.projectId,meet.placeId,meet.datetime, id], function (err, res) {
        result(null, res);
    });
};
// Удаление встречи
Meet.delete = function(id, result){
    dbConn.query(`DELETE FROM meet WHERE id = ?`, id, function (err, res) {
        result(null, res);
    });
};

// Встреча по номеру
Meet.findById = function (id, result) {
    dbConn.query("Select * from meet WHERE id = ?", id, function (err, res) {
        result(null, res[0]);
    });
};
// Встречи проекта
Meet.findByProject = function (project, result) {
    dbConn.query("Select * from meet where projectId = ? AND DATE(datetime) >= CURDATE()", project.id, function (err, res) {
        result(null, res);
    });
};
// Встречи пространства
Meet.findByPlace = function (place, result) {
    dbConn.query('Select * from meet where placeId = ? AND DATE(datetime) >= CURDATE() ORDER BY datetime', place.id, function (err, res) {
        result(null, res);
    });
};
// Встречи участника
Meet.findAllByUserId2 = (id) => function (result) {
    dbConn.query("SELECT * FROM user_meet WHERE userId = ?", id, function (err, res) {
        result(null, res);
    });
};
// Встречи участника
Meet.findAllByUserId = (id) => function (result) {
    dbConn.query("Select meet.* from meet LEFT JOIN project ON project.id = meet.projectId LEFT JOIN user_project ON user_project.projectId = project.id WHERE user_project.userId = ? AND DATE(datetime) >= CURDATE()", id, function (err, res) {
        result(null, res || []);
    });
};


module.exports = Meet;