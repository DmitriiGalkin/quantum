'use strict';
var dbConn = require('../db.config');

var UserMeet = function(data){
    this.userId = data.userId;
    this.meetId = data.meetId;
};
// Добавление участника на встречу
UserMeet.create = function (newEmp, result) {
    dbConn.query("INSERT INTO user_meet set ?", newEmp, function (err, res) {
        result(null, res.insertId);
    });
};
// Удаление участника со встречи
UserMeet.delete = function(userId, meetId, result){
    dbConn.query(`DELETE FROM user_meet WHERE userId = ${userId} AND meetId = ${meetId}`, function (err, res) {
        result(null, res);
    });
};
module.exports = UserMeet;