'use strict';
const async = require("async");
var dbConn = require('../db');

var ProjectTime = function(data){
    this.id = data.id;
    this.projectId = data.projectId;
    this.dayOfWeek = data.dayOfWeek;
    this.time = data.time;
};

ProjectTime.create = function (data, result) {
    dbConn.query("INSERT INTO timing SET ?", data, function (err, res) {
        result(err, res.insertId);
    });
};
ProjectTime.updates = function(projectId, timing, result){
    dbConn.query(`DELETE FROM timing WHERE projectId = ?`, projectId, function (err, res) {
        const data = timing.map(row => ({ ...row, projectId }))
        async.map(data, ProjectTime.create, function(err, meetsUsers) {
            result(err, true);
        });
    });
};

ProjectTime.findById = function (id, result) {
    dbConn.query("SELECT * FROM timing WHERE id = ?", id, function (err, res) {
        result(null, res[0]);
    });
};
ProjectTime.findAll = function (projectId, result) {
    dbConn.query("SELECT * FROM timing WHERE projectId = ?", projectId, function (err, res) {
        result(res || []);
    });
};
ProjectTime.findAllAll = function (result) {
    dbConn.query("SELECT * FROM timing", function (err, res) {
        result(res || []);
    });
};

module.exports = ProjectTime;