'use strict';
var dbConn = require('../db.config');

var UserTask = function(data){
    this.userId = data.userId;
    this.taskId = data.taskId;
    this.results = data.results;
};

UserTask.findAll = function (result) {
    dbConn.query("Select * from task", function (err, res) {
        result(null, res);
    });
};
UserTask.findById = function (id, result) {
    dbConn.query("Select * from user_task where id = ? ", id, function (err, res) {
        result(null, res);
    });
};
UserTask.findAllByUserId = function (id, result) {
    dbConn.query("Select * from user_task where results IS NULL AND userId = ? ", id, function (err, res) {
        result(null, res);
    });
};
UserTask.findByUserTask = function (userTask, result) {
    dbConn.query("Select * from task where id = ? ", userTask.taskId, function (err, res) {
        result(null, { ...userTask, task: res[0] });
    });
};
UserTask.update = function(id, task, result){
    dbConn.query("UPDATE user_task SET results=? WHERE id = ?", [task.result, id], function (err, res) {
        result(null, res);
    });
};
module.exports = UserTask;