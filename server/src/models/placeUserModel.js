'use strict';
var dbConn = require('../db.config');

var PlaceUser = function(data){
    this.placeId = data.placeId;
    this.userId = data.userId;
    this.created_at = new Date();
};
PlaceUser.create = function (newEmp, result) {
    dbConn.query("INSERT INTO place_user set ?", newEmp, function (err, res) {
        if(err) result(err, null);
        result(null, res.insertId);
    });
};
PlaceUser.delete = function(placeId, userId, result){
    dbConn.query(`DELETE FROM place_user WHERE placeId = ${placeId} AND userId = ${userId}`, function (err, res) {
        if(err) result(null, err);
        result(null, res);
    });
};
module.exports = PlaceUser;