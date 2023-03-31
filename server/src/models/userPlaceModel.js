'use strict';
var dbConn = require('../db.config');

var UserPlace = function(data){
    this.userId = data.userId;
    this.placeId = data.placeId;
};
UserPlace.create = function (newEmp, result) {
    dbConn.query("INSERT INTO user_place set ?", newEmp, function (err, res) {
        result(null, res.insertId);
    });
};
UserPlace.delete = function(placeId, userId, result){
    dbConn.query(`DELETE FROM user_place WHERE placeId = ${placeId} AND userId = ${userId}`, function (err, res) {
        result(null, res);
    });
};
module.exports = UserPlace;