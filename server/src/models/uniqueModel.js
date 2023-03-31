'use strict';
var dbConn = require('../db.config');

var Unique = function(unique){
    this.title = unique.title;
    this.points = unique.points;
};
// Обновление таланта участника
Unique.update = function(id, unique, result){
    dbConn.query("UPDATE unique SET points=? WHERE id = ?", [unique.points, id], function (err, res) {
        result(null, res);
    });
};

// Таланты участника
Unique.findUniquesById = function (id, result) {
    dbConn.query("Select * from `user_unique` where userId = ? ", id, function (err, res) {
        result(null, res);
    });
};

module.exports = Unique;