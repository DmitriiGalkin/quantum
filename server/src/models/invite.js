'use strict';
var dbConn = require('../db');

var Invite = function(data){
    this.userId = data.userId;
    this.projectId = data.projectId;
    this.ideaId = data.ideaId;
};

Invite.create = function (data, result) {
    dbConn.query("INSERT INTO invite set ?", data, function (err, res) {
        result(err, res.insertId);
    });
};

// Participation.delete = function(id, result){
//     dbConn.query(`DELETE FROM participation WHERE id = ?`, id, function (err, res) {
//         result(null, res);
//     });
// };
//
// Participation.findById = function(id, result){
//     dbConn.query("SELECT * FROM participation WHERE id = ?", [id], function (err, res) {
//         result(null, res.length ? res[0] : undefined);
//     });
// };

Invite.findByIdeaId = function(id, result){
    dbConn.query("SELECT * FROM invite WHERE ideaId = ?", [id], function (err, res) {
        result(null, res.length ? res : []);
    });
};
//
// Participation.findByUserAndProjectIds = function(userId, projectId, result){
//     dbConn.query("SELECT * FROM participation WHERE userId = ? AND projectId =?", [userId, projectId], function (err, res) {
//         result(null, res.length ? res[0] : undefined);
//     });
// };

module.exports = Invite;