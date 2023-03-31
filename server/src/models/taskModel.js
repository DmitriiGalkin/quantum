'use strict';
var dbConn = require('../db');

var Task = function(data){
    this.title = data.title;
    this.points = data.points;
};
// Задание
Task.findByUserTask = function (userTask, result) {
    dbConn.query("Select * from task where id = ? ", userTask.taskId, function (err, res) {
        result(null, { ...userTask, task: res[0] });
    });
};
module.exports = Task;