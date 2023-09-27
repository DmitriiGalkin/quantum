'use strict';
var dbConn = require('../db');

var UserMeet = function(data){
    this.userId = data.userId;
    this.meetId = data.meetId;
    this.started = data.started;
    this.stopped = data.stopped;
};

UserMeet.create = function (newEmp, result) {
    dbConn.query("INSERT INTO user_meet set ?", newEmp, function (err, res) {
        result(null, res.insertId);
    });
};
UserMeet.started = function(userId, meetId, result){
    dbConn.query("UPDATE user_meet SET started = CURRENT_TIMESTAMP() WHERE userId = ? AND meetId = ?", [userId, meetId], function (err, res) {
        result(null, res);
    });
};
UserMeet.stopped = function(userId, meetId, result){
    dbConn.query("UPDATE user_meet SET stopped = CURRENT_TIMESTAMP() WHERE userId = ? AND meetId = ?", [userId, meetId], function (err, res) {
        result(null, res);
    });
};
UserMeet.paided = function(userId, meetId, result){
    dbConn.query("UPDATE user_meet SET paided = CURRENT_TIMESTAMP() WHERE userId = ? AND meetId = ?", [userId, meetId], function (err, res) {
        result(null, res);
    });
};
UserMeet.delete = function(userId, meetId, result){
    dbConn.query(`DELETE FROM user_meet WHERE userId = ${userId} AND meetId = ${meetId}`, function (err, res) {
        result(null, res);
    });
};
UserMeet.findById = function(userId, meetId, result){
    dbConn.query("SELECT * FROM user_meet WHERE userId = ? AND meetId = ?", [userId, meetId], function (err, res) {
        result(null, res.length ? res[0] : undefined);
    });
};


module.exports = UserMeet;