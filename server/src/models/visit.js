'use strict';
var dbConn = require('../db');

var Visit = function(data){
    this.userId = data.userId;
    this.meetId = data.meetId;
    this.started = data.started;
    this.stopped = data.stopped;
};

Visit.create = function (newEmp, result) {
    dbConn.query("INSERT INTO visit set ?", newEmp, function (err, res) {
        result(null, res.insertId);
    });
};
Visit.started = function(userId, meetId, result){
    dbConn.query("UPDATE visit SET started = CURRENT_TIMESTAMP() WHERE userId = ? AND meetId = ?", [userId, meetId], function (err, res) {
        result(null, res);
    });
};
Visit.stopped = function(userId, meetId, result){
    dbConn.query("UPDATE visit SET stopped = CURRENT_TIMESTAMP() WHERE userId = ? AND meetId = ?", [userId, meetId], function (err, res) {
        result(null, res);
    });
};
Visit.paided = function(userId, meetId, result){
    dbConn.query("UPDATE visit SET paided = CURRENT_TIMESTAMP() WHERE userId = ? AND meetId = ?", [userId, meetId], function (err, res) {
        result(null, res);
    });
};
Visit.delete = function(userId, meetId, result){
    dbConn.query(`DELETE FROM visit WHERE userId = ${userId} AND meetId = ${meetId}`, function (err, res) {
        result(null, res);
    });
};
Visit.findById = function(userId, meetId, result){
    dbConn.query("SELECT * FROM visit WHERE userId = ? AND meetId = ?", [userId, meetId], function (err, res) {
        result(null, res.length ? res[0] : undefined);
    });
};
Visit.findByMeet = function(meet, result){
    dbConn.query("SELECT user.*, visit.* FROM visit LEFT JOIN user ON visit.userId = user.id WHERE meetId = ?", [meet.id], function (err, res) {
        result(null, res.length ? res : undefined);
    });
};

module.exports = Visit;