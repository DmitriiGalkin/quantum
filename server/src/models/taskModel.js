'use strict';
var dbConn = require('../db');

var Task = function(data){
    this.title = data.title;
    this.points = data.points;
};
// Задание
Task.findByUserTask = function (userTask, result) {
    dbConn.query("Select * from task where id = ? ", userTask.taskId, function (err, res) {
        result(null, res.length ? res[0] : undefined);
    });
};
module.exports = Task;