'use strict';
var dbConn = require('../db');

var UserCommunity = function(data){
    this.userId = data.userId;
    this.communityId = data.communityId;
};
// Добавление участника в проект
UserCommunity.create = function (newEmp, result) {
    dbConn.query("INSERT INTO user_community set ?", newEmp, function (err, res) {
        result(null, res.insertId);
    });
};
// Удаление участника из проекта
UserCommunity.delete = function(communityId, userId, result){
    console.log(communityId, 'communityId', userId, 'userId')
    dbConn.query(`DELETE FROM user_community WHERE communityId = ${communityId} AND userId = ${userId}`, function (err, res) {
        result(null, res);
    });
};
module.exports = UserCommunity;