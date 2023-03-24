'use strict';
var dbConn = require('../db.config');

var UserMeet = function(employee){
    this.userId     = employee.userId;
    this.meetId      = employee.meetId;
    this.created_at     = new Date();
};
UserMeet.create = function (newEmp, result) {
    dbConn.query("INSERT INTO meet_user set ?", newEmp, function (err, res) {
        if(err) result(err, null);
        result(null, res.insertId);
    });
};
UserMeet.delete = function(userId, meetId, result){
    dbConn.query(`DELETE FROM meet_user WHERE userId = ${userId} AND meetId = ${meetId}`, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
module.exports = UserMeet;