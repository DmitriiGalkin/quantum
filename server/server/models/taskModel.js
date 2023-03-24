'use strict';
var dbConn = require('../db.config');

var Task = function(task){
    this.title = task.title;
    this.result = task.result;
    this.points = task.points;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Task.findAll = function (result) {
    dbConn.query("Select * from task", function (err, res) {
        if (err) result(null, err);
        result(null, res);
    });
};
Task.findById = function (id, result) {
    dbConn.query("Select * from task where id = ? ", id, function (err, res) {
        if (err) result(err, null);
        result(null, res);
    });
};
Task.findAllByUserId = function (id, result) {
    dbConn.query("Select * from task where userId = ? ", id, function (err, res) {
        if (err) result(null, err);
        result(null, res);
    });
};


Task.update = function(id, task, result){
    dbConn.query("UPDATE task SET results=? WHERE id = ?", [task.result, id], function (err, res) {
        if(err) result(null, err);
        result(null, res);
    });
};

module.exports = Task;