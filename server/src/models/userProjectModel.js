'use strict';
var dbConn = require('../db');

var UserProject = function(data){
    this.userId = data.userId;
    this.projectId = data.projectId;
};
// Поиск участника встречи
UserProject.findById = function(userId, projectId, result){
    dbConn.query("SELECT * FROM user_project WHERE userId = ? AND projectId = ?", [userId, projectId], function (err, res) {
        result(null, res.length ? res[0] : undefined);
    });
};
// Добавление участника в проект
UserProject.create = function (newEmp, result) {
    dbConn.query("INSERT INTO user_project set ?", newEmp, function (err, res) {
        result(null, res.insertId);
    });
};
// Удаление участника из проекта
UserProject.delete = function(projectId, userId, result){
    dbConn.query(`DELETE FROM user_project WHERE projectId = ${projectId} AND userId = ${userId}`, function (err, res) {
        result(null, res);
    });
};
module.exports = UserProject;