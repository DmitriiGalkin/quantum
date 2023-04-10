'use strict';
var dbConn = require('../db');

var UserTask = function(data){
    this.userId = data.userId;
    this.taskId = data.taskId;
    this.results = data.results;
};
// Задание участника
UserTask.findById = function (id, result) {
    dbConn.query("Select * from user_task where id = ? ", id, function (err, res) {
        result(null, res.length ? res[0] : undefined);
    });
};
// Задания участника
UserTask.findAllByUserId = function (id, result) {
    dbConn.query("Select * from user_task where results IS NULL AND userId = ? ", id, function (err, res) {
        result(null, res);
    });
};
// Обновление задания участника
UserTask.update = function(id, task, result){
    dbConn.query("UPDATE user_task SET results=? WHERE id = ?", [task.result, id], function (err, res) {
        result(null, res);
    });
};
module.exports = UserTask;