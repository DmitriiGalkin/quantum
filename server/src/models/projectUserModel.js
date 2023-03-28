'use strict';
var dbConn = require('../db.config');

var ProjectUser = function(data){
    this.projectId = data.projectId;
    this.userId = data.userId;
    this.created_at = new Date();
};
ProjectUser.create = function (newEmp, result) {
    dbConn.query("INSERT INTO user_project set ?", newEmp, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
ProjectUser.delete = function(projectId, userId, result){
    dbConn.query(`DELETE FROM user_project WHERE projectId = ${projectId} AND userId = ${userId}`, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
module.exports = ProjectUser;