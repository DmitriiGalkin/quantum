'use strict';
var dbConn = require('../db');

var Idea = function(data){
    this.title = data.title;
    this.description = data.description;
    this.userId = data.userId; // Создатель идеи
    this.latitude = data.latitude;
    this.longitude = data.longitude;
};

Idea.create = function (data, result) {
    dbConn.query("INSERT INTO idea set ?", data, function (err, res) {
        if (err) {console.log(err,'err')}
        result(err, res.insertId);
    });
};

Idea.update = function(id, data, result){
    dbConn.query("UPDATE idea SET title=?, description=? WHERE id = ?", [data.title, data.description, id], function (err, res) {
        result(null, res);
    });
};

// Project.delete = function(id, result){
//     dbConn.query("UPDATE project SET deleted = CURRENT_TIMESTAMP() WHERE id = ?", [id], function (err, res) {
//         result(null, res);
//     });
// };

Idea.findAll = function (result) {
    dbConn.query("SELECT * FROM idea", function (err, res) {
        result(null, res || []);
    });
};
Idea.findById = function (id, result) {
    dbConn.query("SELECT * FROM idea WHERE id = ?", id, function (err, res) {
        result(null, res[0]);
    });
};

module.exports = Idea;